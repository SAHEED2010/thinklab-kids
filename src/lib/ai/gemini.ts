import { GoogleGenAI } from "@google/genai";
import { learningMissionSchema, missionResponseSchema } from "./schemas";
import type { GenerateMissionInput, LearningAIProvider } from "./provider";

const GEMINI_MODEL = "gemini-2.5-flash";

export class GeminiLearningAIProvider implements LearningAIProvider {
  private readonly client: GoogleGenAI;

  constructor(apiKey: string) {
    this.client = new GoogleGenAI({ apiKey });
  }

  async generateMission(input: GenerateMissionInput) {
    const { MISSION_SYSTEM_PROMPT, buildMissionPrompt } = await import("./prompts/mission");
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
}

export function createLearningAIProvider(): LearningAIProvider {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured. Add it to .env.local to use AI mission generation.");
  }
  return new GeminiLearningAIProvider(apiKey);
}
