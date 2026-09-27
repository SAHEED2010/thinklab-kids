"use client";

import { useState } from "react";
import { ArrowRight, LoaderCircle, MessageCircle, Sparkles } from "lucide-react";
import type { Learner } from "@/lib/types";
import type { ValidatedLearningMission } from "@/lib/ai/schemas";

const missionRequest = {
  academicObjective: "addition and subtraction with money",
  capabilityObjectives: ["reasoning", "decision-making", "communication"],
};

export function MissionDemo({ learner }: { learner: Learner }) {
  const [mission, setMission] = useState<ValidatedLearningMission | null>(null);
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function startMission() {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/ai/mission", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ learnerId: learner.id, ...missionRequest }) });
      const payload: { mission?: ValidatedLearningMission; error?: string } = await response.json();
      if (!response.ok || !payload.mission) throw new Error(payload.error ?? "We could not start the mission.");
      setMission(payload.mission);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "We could not start the mission.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="rounded-3xl border border-ink/10 bg-white p-5 shadow-soft sm:p-7" aria-labelledby="mission-heading">
      <div className="flex items-start gap-4">
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-leaf"><Sparkles aria-hidden="true" size={24} /></span>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-berry">Functional vertical slice</p>
          <h2 id="mission-heading" className="mt-1 font-display text-2xl font-bold">Zara&apos;s market mission</h2>
          <p className="mt-2 max-w-2xl leading-7 text-ink/70">Start a short, age-aware challenge. The first bootstrap path proves that the browser can reach a server-only AI provider and receive validated mission data.</p>
        </div>
      </div>
      {!mission && <button type="button" onClick={startMission} disabled={isLoading} className="mt-7 inline-flex min-h-12 items-center gap-3 rounded-full bg-ink px-5 py-3 font-bold text-white transition hover:bg-berry disabled:cursor-wait disabled:opacity-60 focus-visible:outline focus-visible:outline-4 focus-visible:outline-berry">
        {isLoading ? <LoaderCircle className="animate-spin" aria-hidden="true" size={19} /> : <ArrowRight aria-hidden="true" size={19} />} {isLoading ? "Preparing mission..." : "Start mission"}
      </button>}
      {error && <p role="alert" className="mt-5 rounded-2xl bg-coral/15 p-4 text-sm font-semibold text-ink">{error} Add a server-side <code>GEMINI_API_KEY</code> to <code>.env.local</code> for the live path.</p>}
      {mission && <div className="mt-7 border-t border-ink/10 pt-6">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-berry">Mission {mission.difficulty} of 5</p>
        <h3 className="mt-2 font-display text-2xl font-bold">{mission.title}</h3>
        <p className="mt-4 leading-7">{mission.story}</p>
        <p className="mt-5 font-bold">{mission.question}</p>
        <label className="mt-5 block text-sm font-bold" htmlFor="mission-answer">Your answer</label>
        <input id="mission-answer" value={answer} onChange={(event) => setAnswer(event.target.value)} className="mt-2 min-h-12 w-full rounded-2xl border-2 border-ink/15 px-4 outline-none focus:border-berry" placeholder="Write or type your thinking" />
        <div className="mt-5 flex items-start gap-3 rounded-2xl bg-sky p-4 text-sm leading-6"><MessageCircle className="mt-0.5 shrink-0" aria-hidden="true" size={19} /><p><strong>Next step:</strong> in the full flow, the AI asks why and adapts the next challenge. This bootstrap keeps the boundary ready for that interaction.</p></div>
      </div>}
    </section>
  );
}
