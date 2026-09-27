import { z } from "zod";

export const missionRequestSchema = z.object({
  learnerId: z.enum(["amara", "tobi", "zara", "david", "favour"]),
  academicObjective: z.string().trim().min(3).max(200),
  capabilityObjectives: z.array(z.string().trim().min(2).max(80)).min(1).max(6),
});

export const learningMissionSchema = z.object({
  title: z.string().trim().min(1).max(80),
  story: z.string().trim().min(1).max(500),
  question: z.string().trim().min(1).max(240),
  interactionType: z.enum(["number", "choice", "shortAnswer"]),
  academicObjective: z.string().trim().min(1).max(200),
  capabilities: z.array(z.string().trim().min(1).max(80)).min(1).max(6),
  difficulty: z.number().int().min(1).max(5),
});

export type MissionRequest = z.infer<typeof missionRequestSchema>;
export type ValidatedLearningMission = z.infer<typeof learningMissionSchema>;

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
  },
  required: ["title", "story", "question", "interactionType", "academicObjective", "capabilities", "difficulty"],
  additionalProperties: false,
} as const;
