"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, LoaderCircle, MessageCircle, RefreshCcw, Sparkles } from "lucide-react";
import type { Learner, SessionAttempt } from "@/lib/types";
import type {
  ReasoningEvaluationResult,
  ResponseEvaluationResult,
  SessionSummaryResult,
  ValidatedLearningMission,
} from "@/lib/ai/schemas";
import { fallbackAdaptedMission, fallbackMarketMission, fallbackReasoningEvaluation, fallbackResponseEvaluation, fallbackSessionSummary } from "@/lib/learning/fallback";
import { evaluateMissionAnswer } from "@/lib/learning/deterministic";

type MissionSource = "qwen" | "gemini" | "fallback";
type Phase = "start" | "answer" | "explain" | "adaptedAnswer" | "summary";

const missionRequest = {
  academicObjective: "addition and subtraction with money",
  capabilityObjectives: ["reasoning", "decision-making", "communication"],
  difficulty: 1,
};

export function MissionDemo({ learner }: { learner: Learner }) {
  const [phase, setPhase] = useState<Phase>("start");
  const [mission, setMission] = useState<ValidatedLearningMission | null>(null);
  const [answer, setAnswer] = useState("");
  const [explanation, setExplanation] = useState("");
  const [responseEvaluation, setResponseEvaluation] = useState<ResponseEvaluationResult | null>(null);
  const [reasoningEvaluation, setReasoningEvaluation] = useState<ReasoningEvaluationResult | null>(null);
  const [summary, setSummary] = useState<SessionSummaryResult | null>(null);
  const [attempts, setAttempts] = useState<SessionAttempt[]>([]);
  const [source, setSource] = useState<MissionSource>("qwen");
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const progress = phase === "start" ? 0 : phase === "answer" ? 1 : phase === "explain" ? 2 : phase === "adaptedAnswer" ? 3 : 4;

  function resetSession() {
    setPhase("start");
    setMission(null);
    setAnswer("");
    setExplanation("");
    setResponseEvaluation(null);
    setReasoningEvaluation(null);
    setSummary(null);
    setAttempts([]);
    setSource("qwen");
    setNotice(null);
    setError(null);
  }

  async function requestJson<T>(url: string, body: unknown): Promise<T & { source?: MissionSource; notice?: string }> {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const payload = await response.json();
    if (!response.ok) throw new Error("The learning guide could not respond.");
    return payload;
  }

  async function startMission() {
    setIsLoading(true);
    setError(null);
    setNotice(null);
    try {
      const payload = await requestJson<{ mission: ValidatedLearningMission }>("/api/ai/mission", { learnerId: learner.id, ...missionRequest });
      setMission(payload.mission);
      setSource(payload.source ?? "qwen");
      setNotice(payload.notice ?? null);
      setPhase("answer");
    } catch {
      setMission(fallbackMarketMission);
      setSource("fallback");
      setNotice("A safe local demo mission is keeping the journey moving.");
      setPhase("answer");
    } finally {
      setIsLoading(false);
    }
  }

  async function submitAnswer() {
    if (!mission || !answer.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const payload = await requestJson<{ evaluation: ResponseEvaluationResult }>("/api/ai/evaluate", { learnerId: learner.id, mission, answer });
      setResponseEvaluation(payload.evaluation);
      if (payload.source === "fallback") setSource("fallback");
      setNotice(payload.notice ?? null);
      setPhase("explain");
    } catch {
      const deterministic = evaluateMissionAnswer(mission, answer);
      setResponseEvaluation(fallbackResponseEvaluation(deterministic));
      setSource("fallback");
      setNotice("A safe local guide response is keeping the journey moving.");
      setPhase("explain");
    } finally {
      setIsLoading(false);
    }
  }

  async function submitReasoning() {
    if (!mission || !responseEvaluation || !explanation.trim()) return;
    setIsLoading(true);
    setError(null);
    const firstEvaluation = evaluateMissionAnswer(mission, answer);
    const firstAttempt: SessionAttempt = {
      missionTitle: mission.title,
      answer,
      explanation,
      correctness: firstEvaluation.correctness,
    };

    try {
      const payload = await requestJson<{
        evaluation: ReasoningEvaluationResult;
        adaptedMission: ValidatedLearningMission;
      }>("/api/ai/reasoning", { learnerId: learner.id, mission, answer, explanation, responseEvaluation });
      setAttempts([firstAttempt]);
      setReasoningEvaluation(payload.evaluation);
      setMission(payload.adaptedMission);
      setAnswer("");
      setExplanation("");
      if (payload.source === "fallback") setSource("fallback");
      setNotice(payload.notice ?? null);
      setPhase("adaptedAnswer");
    } catch {
      const fallbackEvaluation = fallbackReasoningEvaluation(firstEvaluation, explanation);
      setAttempts([firstAttempt]);
      setReasoningEvaluation(fallbackEvaluation);
      setMission(fallbackAdaptedMission(fallbackEvaluation.difficultyAction));
      setAnswer("");
      setExplanation("");
      setSource("fallback");
      setNotice("A safe local adaptation is keeping the journey moving.");
      setPhase("adaptedAnswer");
    } finally {
      setIsLoading(false);
    }
  }

  async function finishSession() {
    if (!mission || !answer.trim()) return;
    setIsLoading(true);
    setError(null);
    const secondEvaluation = evaluateMissionAnswer(mission, answer);
    const completedAttempts: SessionAttempt[] = [
      ...attempts,
      { missionTitle: mission.title, answer, explanation: "", correctness: secondEvaluation.correctness },
    ];

    try {
      const payload = await requestJson<{ summary: SessionSummaryResult }>("/api/ai/session-summary", {
        learnerId: learner.id,
        missionTitle: "Zara's Market Adventure",
        attempts: completedAttempts,
      });
      setAttempts(completedAttempts);
      setSummary(payload.summary);
      if (payload.source === "fallback") setSource("fallback");
      setNotice(payload.notice ?? null);
      setPhase("summary");
    } catch {
      setAttempts(completedAttempts);
      setSummary(fallbackSessionSummary(learner.id, "Zara's Market Adventure", completedAttempts));
      setSource("fallback");
      setNotice("A safe local evidence summary is keeping the journey moving.");
      setPhase("summary");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="rounded-3xl border border-ink/10 bg-white p-5 shadow-soft sm:p-7" aria-labelledby="mission-heading">
      <div className="flex items-start gap-4">
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-leaf"><Sparkles aria-hidden="true" size={24} /></span>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-berry">Zara&apos;s learning mission</p>
          <h2 id="mission-heading" className="mt-1 font-display text-2xl font-bold">Market Adventure</h2>
          <p className="mt-2 max-w-2xl leading-7 text-ink/70">Solve a market problem, explain your thinking, and use what you showed to shape the next challenge.</p>
        </div>
      </div>

      {phase !== "start" && <div className="mt-6" aria-label={"Mission progress: step " + progress + " of 4"}>
        <div className="flex items-center justify-between text-sm font-bold text-ink/60"><span>Mission progress</span><span>{progress} / 4</span></div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-sky"><div className="h-full rounded-full bg-berry transition-all" style={{ width: (progress / 4) * 100 + "%" }} /></div>
      </div>}

      {notice && <p className="mt-5 rounded-2xl bg-mango/40 p-3 text-sm font-semibold text-ink">{source === "fallback" ? "Demo mode: " : ""}{notice}</p>}
      {error && <p role="alert" className="mt-5 rounded-2xl bg-coral/15 p-4 text-sm font-semibold text-ink">{error}</p>}

      {phase === "start" && <button type="button" onClick={startMission} disabled={isLoading} className="mt-7 inline-flex min-h-12 items-center gap-3 rounded-full bg-ink px-5 py-3 font-bold text-white transition hover:bg-berry disabled:cursor-wait disabled:opacity-60 focus-visible:outline focus-visible:outline-4 focus-visible:outline-berry">
        {isLoading ? <LoaderCircle className="animate-spin" aria-hidden="true" size={19} /> : <ArrowRight aria-hidden="true" size={19} />}
        {isLoading ? "Preparing your challenge..." : "Start Market Adventure"}
      </button>}

      {mission && phase !== "summary" && <div className="mt-7 border-t border-ink/10 pt-6">
        {phase === "adaptedAnswer" && reasoningEvaluation && <div className="mb-6 rounded-2xl bg-leaf/50 p-4">
          <p className="flex items-center gap-2 font-bold"><CheckCircle2 aria-hidden="true" size={19} /> You explained your thinking</p>
          <p className="mt-2 leading-7">{reasoningEvaluation.feedback}</p>
          <p className="mt-2 text-sm font-semibold text-ink/70">Next step: {reasoningEvaluation.difficultyAction === "increase" ? "a little more challenge" : reasoningEvaluation.difficultyAction === "simplify" ? "a smaller step to practise" : "another chance to practise"}</p>
        </div>}
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-berry">Challenge {mission.difficulty} of 5</p>
        <h3 className="mt-2 font-display text-2xl font-bold">{mission.title}</h3>
        <p className="mt-4 leading-7">{mission.story}</p>
        <div className="mt-5 rounded-2xl bg-sky p-4">
          <p className="text-sm font-bold">Market basket</p>
          <p className="mt-1 text-sm text-ink/70">Budget: ₦{mission.challenge.budget.toLocaleString()}</p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-3">
            {mission.challenge.items.filter((item) => mission.challenge.selectedItemNames.includes(item.name)).map((item) => <li key={item.name} className="rounded-xl bg-white px-3 py-2 text-sm font-semibold">{item.name}: ₦{item.price.toLocaleString()}</li>)}
          </ul>
        </div>
        <p className="mt-5 font-bold">{mission.question}</p>

        {(phase === "answer" || phase === "adaptedAnswer") && <div>
          <label className="mt-5 block text-sm font-bold" htmlFor="mission-answer">Your answer</label>
          <input id="mission-answer" value={answer} onChange={(event) => setAnswer(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") void (phase === "answer" ? submitAnswer() : finishSession()); }} className="mt-2 min-h-12 w-full rounded-2xl border-2 border-ink/15 px-4 text-lg outline-none focus:border-berry" inputMode="numeric" placeholder="Type the amount in naira" />
          <button type="button" onClick={() => void (phase === "answer" ? submitAnswer() : finishSession())} disabled={isLoading || !answer.trim()} className="mt-5 inline-flex min-h-12 items-center gap-3 rounded-full bg-ink px-5 py-3 font-bold text-white transition hover:bg-berry disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-4 focus-visible:outline-berry">
            {isLoading ? <LoaderCircle className="animate-spin" aria-hidden="true" size={19} /> : <ArrowRight aria-hidden="true" size={19} />}
            {isLoading ? "Checking your thinking..." : phase === "answer" ? "Check my answer" : "Finish mission"}
          </button>
        </div>}

        {phase === "explain" && responseEvaluation && <div className="mt-6 space-y-5">
          <div className="rounded-2xl bg-sky p-4" aria-live="polite">
            <p className="flex items-center gap-2 font-bold"><MessageCircle aria-hidden="true" size={19} /> ThinkLab guide</p>
            <p className="mt-2 leading-7">{responseEvaluation.feedback}</p>
            <p className="mt-3 font-bold">{responseEvaluation.followUpQuestion}</p>
          </div>
          <div>
            <label className="block text-sm font-bold" htmlFor="mission-explanation">Explain your thinking</label>
            <textarea id="mission-explanation" value={explanation} onChange={(event) => setExplanation(event.target.value)} className="mt-2 min-h-28 w-full rounded-2xl border-2 border-ink/15 p-4 leading-7 outline-none focus:border-berry" placeholder="Tell Zara&apos;s guide what you did first..." />
            <button type="button" onClick={() => void submitReasoning()} disabled={isLoading || !explanation.trim()} className="mt-4 inline-flex min-h-12 items-center gap-3 rounded-full bg-ink px-5 py-3 font-bold text-white transition hover:bg-berry disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-4 focus-visible:outline-berry">
              {isLoading ? <LoaderCircle className="animate-spin" aria-hidden="true" size={19} /> : <ArrowRight aria-hidden="true" size={19} />}
              {isLoading ? "Preparing the next challenge..." : "Share my thinking"}
            </button>
          </div>
        </div>}
      </div>}

      {phase === "summary" && summary && <div className="mt-7 border-t border-ink/10 pt-6" aria-live="polite">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-berry">Learning Evidence</p>
        <h3 className="mt-2 font-display text-3xl font-bold">What I discovered</h3>
        <p className="mt-3 leading-7">{summary.encouragement}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-sky p-4"><h4 className="font-bold">What I practised</h4><ul className="mt-3 space-y-3">{summary.academicEvidence.map((item) => <li key={item.skill}><p className="font-semibold">{item.skill}</p><p className="mt-1 text-sm leading-6 text-ink/70">{item.observation}</p></li>)}</ul></div>
          <div className="rounded-2xl bg-leaf/50 p-4"><h4 className="font-bold">How I solved it</h4><ul className="mt-3 space-y-3">{summary.capabilityEvidence.map((item) => <li key={item.capability}><p className="font-semibold">{item.capability}</p><p className="mt-1 text-sm leading-6 text-ink/70">{item.observation}</p></li>)}</ul></div>
        </div>
        <div className="mt-4 rounded-2xl bg-mango/50 p-4"><h4 className="font-bold">What&apos;s next</h4><p className="mt-2 leading-7">{summary.nextStep}</p></div>
        <button type="button" onClick={resetSession} className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-ink/15 px-5 py-3 font-bold text-berry hover:border-berry focus-visible:outline focus-visible:outline-4 focus-visible:outline-berry"><RefreshCcw aria-hidden="true" size={18} /> Try another mission</button>
      </div>}
    </section>
  );
}
