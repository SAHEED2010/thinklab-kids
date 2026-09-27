import { z } from "zod";
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
import { parseModelJson } from "./json";

const openAIChatCompletionSchema = z.object({
  choices: z.array(z.object({
    message: z.object({
      content: z.string().nullable().optional(),
    }),
  })).min(1),
});

const responseEvaluationJsonSchema = {
  type: "object",
  properties: {
    correctness: { type: "string", enum: ["correct", "partially_correct", "incorrect", "unclear"] },
    feedback: { type: "string" },
    followUpQuestion: { type: "string" },
    possibleMisconception: { type: ["string", "null"] },
  },
  required: ["correctness", "feedback", "followUpQuestion", "possibleMisconception"],
  additionalProperties: false,
} as const;

const reasoningEvaluationJsonSchema = {
  type: "object",
  properties: {
    understanding: { type: "string", enum: ["emerging", "developing", "demonstrated"] },
    feedback: { type: "string" },
    possibleMisconception: { type: ["string", "null"] },
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
} as const;

const sessionSummaryJsonSchema = {
  type: "object",
  properties: {
    learnerId: { type: "string", enum: ["amara", "tobi", "zara", "david", "favour"] },
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
} as const;

export interface NvidiaQwenProviderConfig {
  baseUrl: string;
  model: string;
  token?: string;
  timeoutMs?: number;
  fetchImpl?: typeof fetch;
}

export class NvidiaQwenLearningAIProvider implements LearningAIProvider {
  readonly source = "qwen" as const;

  private readonly endpoint: string;
  private readonly model: string;
  private readonly token?: string;
  private readonly timeoutMs: number;
  private readonly fetchImpl: typeof fetch;

  constructor(config: NvidiaQwenProviderConfig) {
    const baseUrl = config.baseUrl.trim().replace(/\/+$/, "");
    if (!baseUrl) throw new Error("THINKLAB_AI_BASE_URL is not configured.");
    if (!config.model.trim()) throw new Error("THINKLAB_AI_MODEL is not configured.");

    this.endpoint = `${baseUrl}/chat/completions`;
    this.model = config.model.trim();
    this.token = config.token?.trim() || undefined;
    this.timeoutMs = config.timeoutMs ?? 20_000;
    this.fetchImpl = config.fetchImpl ?? fetch;
  }

  generateMission(input: GenerateMissionInput) {
    return this.completeJson(
      MISSION_SYSTEM_PROMPT,
      buildMissionPrompt(input),
      0.1,
      learningMissionSchema,
      missionResponseSchema,
      700,
    );
  }

  evaluateResponse(input: EvaluateResponseInput) {
    return this.completeJson(
      RESPONSE_EVALUATION_SYSTEM_PROMPT,
      buildResponseEvaluationPrompt(input),
      0.15,
      responseEvaluationSchema,
      responseEvaluationJsonSchema,
      350,
    );
  }

  evaluateReasoning(input: EvaluateReasoningInput) {
    return this.completeJson(
      REASONING_EVALUATION_SYSTEM_PROMPT,
      buildReasoningEvaluationPrompt(input),
      0.15,
      reasoningEvaluationSchema,
      reasoningEvaluationJsonSchema,
      450,
    );
  }

  summarizeSession(input: SummarizeSessionInput) {
    return this.completeJson(
      SESSION_SUMMARY_SYSTEM_PROMPT,
      buildSessionSummaryPrompt(input),
      0.15,
      sessionSummarySchema,
      sessionSummaryJsonSchema,
      500,
    );
  }

  private async completeJson<T>(
    systemPrompt: string,
    userPayload: string,
    temperature: number,
    schema: z.ZodType<T>,
    responseSchema: unknown,
    maxTokens: number,
  ): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (this.token) headers.Authorization = `Bearer ${this.token}`;

      const response = await this.fetchImpl(this.endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify({
          model: this.model,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPayload },
          ],
          temperature,
          max_tokens: maxTokens,
          response_format: {
            type: "json_schema",
            json_schema: { name: "thinklab_response", strict: true, schema: responseSchema },
          },
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`Qwen request failed with HTTP ${response.status}.`);
      }

      let payload: unknown;
      try {
        payload = await response.json() as unknown;
      } catch {
        throw new Error("Qwen returned an invalid API response.");
      }

      const completion = openAIChatCompletionSchema.parse(payload);
      const content = completion.choices[0]?.message.content?.trim();
      if (!content) throw new Error("Qwen returned an empty response.");

      return parseModelJson(content, schema);
    } catch (error) {
      if (controller.signal.aborted) throw new Error("Qwen request timed out.");
      if (error instanceof Error && error.message.startsWith("Qwen ")) throw error;
      if (error instanceof z.ZodError) {
        const paths = error.issues.map((issue) => issue.path.join(".") || "response").join(", ");
        throw new Error(`Qwen response failed validation at ${paths}.`);
      }
      throw new Error(`Qwen request failed: ${error instanceof Error ? error.message : "unknown error"}.`);
    } finally {
      clearTimeout(timeoutId);
    }
  }
}
