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

export type ResponseCorrectness = "correct" | "partially_correct" | "incorrect" | "unclear";
export type UnderstandingLevel = "emerging" | "developing" | "demonstrated";
export type DifficultyAction = "simplify" | "maintain" | "increase";

export interface MissionItem {
  name: string;
  price: number;
}

export interface MissionChallenge {
  budget: number;
  items: MissionItem[];
  selectedItemNames: string[];
}

export interface LearningMission {
  title: string;
  story: string;
  question: string;
  interactionType: MissionInteractionType;
  academicObjective: string;
  capabilities: string[];
  difficulty: number;
  challenge: MissionChallenge;
}

export interface LearnerResponse {
  learnerId: LearnerId;
  missionTitle: string;
  answer: string;
  explanation?: string;
}

export interface DeterministicEvaluation {
  correctness: ResponseCorrectness;
  expectedRemaining: number;
  submittedAnswer: number | null;
  totalCost: number;
}

export interface LearningEvidenceItem {
  skill: string;
  observation: string;
}

export interface CapabilityEvidenceItem {
  capability: string;
  observation: string;
}

export interface ResponseEvaluation {
  correctness: ResponseCorrectness;
  feedback: string;
  followUpQuestion: string;
  possibleMisconception: string | null;
}

export interface ReasoningEvaluation {
  understanding: UnderstandingLevel;
  feedback: string;
  possibleMisconception: string | null;
  evidence: CapabilityEvidenceItem[];
  difficultyAction: DifficultyAction;
}

export interface SessionAttempt {
  missionTitle: string;
  answer: string;
  explanation: string;
  correctness: ResponseCorrectness;
  understanding?: UnderstandingLevel;
}

export interface SessionSummary {
  learnerId: LearnerId;
  missionTitle: string;
  academicEvidence: LearningEvidenceItem[];
  capabilityEvidence: CapabilityEvidenceItem[];
  nextStep: string;
  encouragement: string;
}

export interface LearningObservation {
  capability: string;
  evidence: string;
  nextStep: string;
}
