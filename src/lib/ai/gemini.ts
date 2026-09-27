import { GoogleGenAI } from "@google/genai";
import {
  learningMissionSchema,
  missionResponseSchema,
  reasoningEvaluationSchema,
  responseEvaluationSchema,
  sessionSummarySchema,
} from "./schemas";
import type {
  EvaluateReasoningInput,
  EvaluateResponseInput,
  GenerateMissionInput,
  LearningAIProvider,
  SummarizeSessionInput,
} from "./provider";
import {
  buildReasoningEvaluationPrompt,
  buildResponseEvaluationPrompt,
  REASONING_EVALUATION_SYSTEM_PROMPT,
  RESPONSE_EVALUATION_SYSTEM_PROMPT,
} from "./prompts/evaluate";
import { buildSessionSummaryPrompt, SESSION_SUMMARY_SYSTEM_PROMPT } from "./prompts/summary";
import { MISSION_SYSTEM_PROMPT, buildMissionPrompt } from "./prompts/mission";

const GEMINI_MODEL = "gemini-2.5-flash";

export class GeminiLearningAIProvider implements LearningAIProvider {
  private readonly client: GoogleGenAI;

  constructor(apiKey: string) {
    this.client = new GoogleGenAI({ apiKey });
  }

  async generateMission(input: GenerateMissionInput) {
    const response = await this.client.models.generateContent({
      model: GEMINI_MODEL,
      contents: buildMissionPrompt(input),
      config: {
        systemInstruction: MISSION_SYSTEM_PROMPT,
        responseMimeType: "application/json",
        responseSchema: missionResponseSchema,
        temperature: 0.4,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("Gemini returned an empty mission response.");
    }

    return learningMissionSchema.parse(JSON.parse(text));
  }

  async evaluateResponse(input: EvaluateResponseInput) {
    const response = await this.client.models.generateContent({
      model: GEMINI_MODEL,
      contents: buildResponseEvaluationPrompt(input),
      config: {
        systemInstruction: RESPONSE_EVALUATION_SYSTEM_PROMPT,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            correctness: { type: "string", enum: ["correct", "partially_correct", "incorrect", "unclear"] },
            feedback: { type: "string" },
            followUpQuestion: { type: "string" },
            possibleMisconception: { type: "string", nullable: true },
          },
          required: ["correctness", "feedback", "followUpQuestion", "possibleMisconception"],
          additionalProperties: false,
        },
        temperature: 0.2,
      },
    });
    return responseEvaluationSchema.parse(JSON.parse(requireText(response)));
  }

  async evaluateReasoning(input: EvaluateReasoningInput) {
    const response = await this.client.models.generateContent({
      model: GEMINI_MODEL,
      contents: buildReasoningEvaluationPrompt(input),
      config: {
        systemInstruction: REASONING_EVALUATION_SYSTEM_PROMPT,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            understanding: { type: "string", enum: ["emerging", "developing", "demonstrated"] },
            feedback: { type: "string" },
            possibleMisconception: { type: "string", nullable: true },
            evidence: {
              type: "array",
              items: {
                type: "object",
                properties: { capability: { type: "string" }, observation: { type: "string" } },
                required: ["capability", "observation"],
                additionalProperties: false,
              },
            },
            difficultyAction: { type: "string", enum: ["simplify", "maintain", "increase"] },
          },
          required: ["understanding", "feedback", "possibleMisconception", "evidence", "difficultyAction"],
          additionalProperties: false,
        },
        temperature: 0.2,
      },
    });
    return reasoningEvaluationSchema.parse(JSON.parse(requireText(response)));
  }

  async summarizeSession(input: SummarizeSessionInput) {
    const response = await this.client.models.generateContent({
      model: GEMINI_MODEL,
      contents: buildSessionSummaryPrompt(input),
      config: {
        systemInstruction: SESSION_SUMMARY_SYSTEM_PROMPT,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            learnerId: { type: "string" },
            missionTitle: { type: "string" },
            academicEvidence: {
              type: "array",
              items: {
                type: "object",
                properties: { skill: { type: "string" }, observation: { type: "string" } },
                required: ["skill", "observation"],
                additionalProperties: false,
              },
            },
            capabilityEvidence: {
              type: "array",
              items: {
                type: "object",
                properties: { capability: { type: "string" }, observation: { type: "string" } },
                required: ["capability", "observation"],
                additionalProperties: false,
              },
            },
            nextStep: { type: "string" },
            encouragement: { type: "string" },
          },
          required: ["learnerId", "missionTitle", "academicEvidence", "capabilityEvidence", "nextStep", "encouragement"],
          additionalProperties: false,
        },
        temperature: 0.2,
      },
    });
    return sessionSummarySchema.parse(JSON.parse(requireText(response)));
  }
}

function requireText(response: { text?: string }): string {
  if (!response.text) throw new Error("Gemini returned an empty response.");
  return response.text;
}

export function createLearningAIProvider(): LearningAIProvider {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured. Add it to .env.local to use AI mission generation.");
  }
  return new GeminiLearningAIProvider(apiKey);
}
