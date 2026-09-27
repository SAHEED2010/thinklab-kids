import type { Learner } from "@/lib/types";
import type { SessionAttempt } from "@/lib/types";
import type {
  DeterministicEvaluationResult,
  MissionRequest,
  ReasoningEvaluationResult,
  ResponseEvaluationResult,
  SessionSummaryResult,
  ValidatedLearningMission,
} from "./schemas";

export interface GenerateMissionInput extends MissionRequest {
  learner: Learner;
  adaptationReason?: "simplify" | "maintain" | "increase";
  previousMission?: ValidatedLearningMission;
}

export interface EvaluateResponseInput {
  learner: Learner;
  mission: ValidatedLearningMission;
  answer: string;
  deterministic: DeterministicEvaluationResult;
}

export interface EvaluateReasoningInput {
  learner: Learner;
  mission: ValidatedLearningMission;
  answer: string;
  explanation: string;
  deterministic: DeterministicEvaluationResult;
  responseEvaluation: ResponseEvaluationResult;
}

export interface SummarizeSessionInput {
  learner: Learner;
  missionTitle: string;
  attempts: SessionAttempt[];
}

export interface LearningAIProvider {
  generateMission(input: GenerateMissionInput): Promise<ValidatedLearningMission>;
  evaluateResponse(input: EvaluateResponseInput): Promise<ResponseEvaluationResult>;
  evaluateReasoning(input: EvaluateReasoningInput): Promise<ReasoningEvaluationResult>;
  summarizeSession(input: SummarizeSessionInput): Promise<SessionSummaryResult>;
}
