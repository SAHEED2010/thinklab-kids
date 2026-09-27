export type LearnerId = "amara" | "tobi" | "zara" | "david" | "favour";

export type LearnerStatus = "demo" | "functional";

export interface Learner {
  id: LearnerId;
  name: string;
  age: number;
  focus: string;
  interaction: string;
  description: string;
  status: LearnerStatus;
  color: string;
}

export type MissionInteractionType = "number" | "choice" | "shortAnswer";

export interface LearningMission {
  title: string;
  story: string;
  question: string;
  interactionType: MissionInteractionType;
  academicObjective: string;
  capabilities: string[];
  difficulty: number;
}

export interface LearnerResponse {
  learnerId: LearnerId;
  missionTitle: string;
  answer: string;
  explanation?: string;
}

export interface LearningObservation {
  capability: string;
  evidence: string;
  nextStep: string;
}

export interface SessionSummary {
  learnerId: LearnerId;
  missionTitle: string;
  observations: LearningObservation[];
  encouragement: string;
}
