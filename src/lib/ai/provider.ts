import type { Learner } from "@/lib/types";
import type { MissionRequest, ValidatedLearningMission } from "./schemas";

export interface GenerateMissionInput extends MissionRequest {
  learner: Learner;
}

export interface LearningAIProvider {
  generateMission(input: GenerateMissionInput): Promise<ValidatedLearningMission>;
}
