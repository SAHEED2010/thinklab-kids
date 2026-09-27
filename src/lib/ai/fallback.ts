import {
  fallbackAdaptedMission,
  fallbackMarketMission,
  fallbackReasoningEvaluation,
  fallbackResponseEvaluation,
  fallbackSessionSummary,
} from "@/lib/learning/fallback";
import type {
  EvaluateReasoningInput,
  EvaluateResponseInput,
  GenerateMissionInput,
  LearningAIProvider,
  SummarizeSessionInput,
} from "./provider";

export class FallbackLearningAIProvider implements LearningAIProvider {
  readonly source = "fallback" as const;

  async generateMission(input: GenerateMissionInput) {
    return input.adaptationReason
      ? fallbackAdaptedMission(input.adaptationReason)
      : fallbackMarketMission;
  }

  async evaluateResponse(input: EvaluateResponseInput) {
    return fallbackResponseEvaluation(input.deterministic);
  }

  async evaluateReasoning(input: EvaluateReasoningInput) {
    return fallbackReasoningEvaluation(input.deterministic, input.explanation);
  }

  async summarizeSession(input: SummarizeSessionInput) {
    return fallbackSessionSummary(input.learner.id, input.missionTitle, input.attempts);
  }
}
