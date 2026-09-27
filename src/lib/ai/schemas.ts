import { z } from "zod";

export const missionRequestSchema = z.object({
  learnerId: z.enum(["amara", "tobi", "zara", "david", "favour"]),
  academicObjective: z.string().trim().min(3).max(200),
  capabilityObjectives: z.array(z.string().trim().min(2).max(80)).min(1).max(6),
  difficulty: z.number().int().min(1).max(5).optional().default(1),
  previousContext: z.string().trim().max(800).optional(),
});

export const missionItemSchema = z.object({
  name: z.string().trim().min(1).max(40),
  price: z.number().int().min(1).max(5000),
});

export const missionChallengeSchema = z.object({
  budget: z.number().int().min(1).max(10000),
  items: z.array(missionItemSchema).min(2).max(5),
  selectedItemNames: z.array(z.string().trim().min(1).max(40)).min(1).max(5),
});

export const learningMissionSchema = z.object({
  title: z.string().trim().min(1).max(80),
  story: z.string().trim().min(1).max(500),
  question: z.string().trim().min(1).max(240),
  interactionType: z.enum(["number", "choice", "shortAnswer"]),
  academicObjective: z.string().trim().min(1).max(200),
  capabilities: z.array(z.string().trim().min(1).max(80)).min(1).max(6),
  difficulty: z.number().int().min(1).max(5),
  challenge: missionChallengeSchema,
});

export type MissionRequest = z.infer<typeof missionRequestSchema>;
export type ValidatedLearningMission = z.infer<typeof learningMissionSchema>;

export const deterministicEvaluationSchema = z.object({
  correctness: z.enum(["correct", "partially_correct", "incorrect", "unclear"]),
  expectedRemaining: z.number().int().min(0).max(10000),
  submittedAnswer: z.number().int().min(0).max(10000).nullable(),
  totalCost: z.number().int().min(0).max(10000),
});

export const responseEvaluationSchema = z.object({
  correctness: z.enum(["correct", "partially_correct", "incorrect", "unclear"]),
  feedback: z.string().trim().min(1).max(280),
  followUpQuestion: z.string().trim().min(1).max(180),
  possibleMisconception: z.string().trim().max(240).nullable(),
});

export const reasoningEvaluationSchema = z.object({
  understanding: z.enum(["emerging", "developing", "demonstrated"]),
  feedback: z.string().trim().min(1).max(280),
  possibleMisconception: z.string().trim().max(240).nullable(),
  evidence: z.array(z.object({
    capability: z.string().trim().min(1).max(80),
    observation: z.string().trim().min(1).max(240),
  })).max(4),
  difficultyAction: z.enum(["simplify", "maintain", "increase"]),
});

export const sessionAttemptSchema = z.object({
  missionTitle: z.string().trim().min(1).max(80),
  answer: z.string().trim().max(100),
  explanation: z.string().trim().max(500),
  correctness: z.enum(["correct", "partially_correct", "incorrect", "unclear"]),
  understanding: z.enum(["emerging", "developing", "demonstrated"]).optional(),
});

export const sessionSummarySchema = z.object({
  learnerId: z.enum(["amara", "tobi", "zara", "david", "favour"]),
  missionTitle: z.string().trim().min(1).max(80),
  academicEvidence: z.array(z.object({
    skill: z.string().trim().min(1).max(100),
    observation: z.string().trim().min(1).max(280),
  })).min(1).max(4),
  capabilityEvidence: z.array(z.object({
    capability: z.string().trim().min(1).max(80),
    observation: z.string().trim().min(1).max(280),
  })).max(4),
  nextStep: z.string().trim().min(1).max(280),
  encouragement: z.string().trim().min(1).max(240),
});

export const evaluateResponseRequestSchema = z.object({
  learnerId: z.enum(["amara", "tobi", "zara", "david", "favour"]),
  mission: learningMissionSchema,
  answer: z.string().trim().max(100),
});

export const reasoningRequestSchema = z.object({
  learnerId: z.enum(["amara", "tobi", "zara", "david", "favour"]),
  mission: learningMissionSchema,
  answer: z.string().trim().max(100),
  explanation: z.string().trim().min(1).max(500),
  responseEvaluation: responseEvaluationSchema,
});

export const sessionSummaryRequestSchema = z.object({
  learnerId: z.enum(["amara", "tobi", "zara", "david", "favour"]),
  missionTitle: z.string().trim().min(1).max(80),
  attempts: z.array(sessionAttemptSchema).min(1).max(3),
});

export type DeterministicEvaluationResult = z.infer<typeof deterministicEvaluationSchema>;
export type ResponseEvaluationResult = z.infer<typeof responseEvaluationSchema>;
export type ReasoningEvaluationResult = z.infer<typeof reasoningEvaluationSchema>;
export type SessionSummaryResult = z.infer<typeof sessionSummarySchema>;

export const missionResponseSchema = {
  type: "object",
  properties: {
    title: { type: "string" },
    story: { type: "string" },
    question: { type: "string" },
    interactionType: { type: "string", enum: ["number", "choice", "shortAnswer"] },
    academicObjective: { type: "string" },
    capabilities: { type: "array", items: { type: "string" } },
    difficulty: { type: "integer", minimum: 1, maximum: 5 },
    challenge: {
      type: "object",
      properties: {
        budget: { type: "integer", minimum: 1, maximum: 10000 },
        items: {
          type: "array",
          items: {
            type: "object",
            properties: { name: { type: "string" }, price: { type: "integer", minimum: 1, maximum: 5000 } },
            required: ["name", "price"],
            additionalProperties: false,
          },
        },
        selectedItemNames: { type: "array", items: { type: "string" } },
      },
      required: ["budget", "items", "selectedItemNames"],
      additionalProperties: false,
    },
  },
  required: ["title", "story", "question", "interactionType", "academicObjective", "capabilities", "difficulty", "challenge"],
  additionalProperties: false,
} as const;
