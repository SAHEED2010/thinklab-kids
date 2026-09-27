import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { getLearner } from "@/data/learners";
import { createLearningAIProvider } from "@/lib/ai";
import { learningMissionSchema, reasoningEvaluationSchema, reasoningRequestSchema } from "@/lib/ai/schemas";
import { containsForbiddenLearningLabel, missionTextForSafetyCheck } from "@/lib/ai/safety";
import { fallbackAdaptedMission, fallbackReasoningEvaluation } from "@/lib/learning/fallback";
import { determineDifficultyAction, evaluateMissionAnswer } from "@/lib/learning/deterministic";
import type { LearningAIProvider, LearningAIProviderSource } from "@/lib/ai/provider";

function nextDifficulty(current: number, action: "simplify" | "maintain" | "increase"): number {
  if (action === "simplify") return Math.max(1, current - 1);
  if (action === "increase") return Math.min(5, current + 1);
  return current;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  try {
    const input = reasoningRequestSchema.parse(body);
    const learner = getLearner(input.learnerId);
    if (!learner) return NextResponse.json({ error: "Learner not found." }, { status: 404 });

    const deterministic = evaluateMissionAnswer(input.mission, input.answer);
    let evaluation = fallbackReasoningEvaluation(deterministic, input.explanation);
    let source: LearningAIProviderSource = "fallback";
    let provider: LearningAIProvider | null = null;

    try {
      provider = createLearningAIProvider();
      const generated = reasoningEvaluationSchema.parse(await provider.evaluateReasoning({
        learner,
        mission: input.mission,
        answer: input.answer,
        explanation: input.explanation,
        deterministic,
        responseEvaluation: input.responseEvaluation,
      }));
      if (containsForbiddenLearningLabel([
        generated.feedback,
        generated.possibleMisconception ?? "",
        ...generated.evidence.flatMap((item) => [item.capability, item.observation]),
      ])) {
        throw new Error("Generated reasoning feedback failed the child-safety content check.");
      }
      evaluation = generated;
      source = provider.source;
    } catch (error) {
      console.error("Reasoning evaluation failed:", error instanceof Error ? error.message : "Unknown provider error");
      provider = null;
    }

    const action = determineDifficultyAction(deterministic, evaluation.understanding);
    evaluation = { ...evaluation, difficultyAction: action };
    let adaptedMission = fallbackAdaptedMission(action);

    if (provider && source !== "fallback") {
      try {
        const generatedMission = learningMissionSchema.parse(await provider.generateMission({
          learner,
          learnerId: input.learnerId,
          academicObjective: input.mission.academicObjective,
          capabilityObjectives: input.mission.capabilities,
          difficulty: nextDifficulty(input.mission.difficulty, action),
          adaptationReason: action,
          previousContext: "The learner's first answer was " + deterministic.correctness + ". Their explanation showed " + evaluation.understanding + " understanding. Adapt the next challenge with a clear reason.",
          previousMission: input.mission,
        }));
        if (containsForbiddenLearningLabel(missionTextForSafetyCheck(generatedMission))) {
          throw new Error("Generated adapted mission failed the child-safety content check.");
        }
        adaptedMission = generatedMission;
      } catch (error) {
        console.error("Adapted mission generation failed:", error instanceof Error ? error.message : "Unknown provider error");
        source = "fallback";
        provider = null;
      }
    }

    return NextResponse.json({
      deterministic,
      evaluation,
      adaptedMission,
      source,
      notice: source === "fallback" ? "Demo adaptation used while the learning guide is unavailable." : undefined,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: "Reasoning request did not match the expected shape." }, { status: 400 });
    }
    console.error("Reasoning request failed:", error instanceof Error ? error.message : "Unknown request error");
    return NextResponse.json({ error: "We could not prepare the next challenge just now." }, { status: 400 });
  }
}
