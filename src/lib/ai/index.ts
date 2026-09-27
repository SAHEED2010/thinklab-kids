import { FallbackLearningAIProvider } from "./fallback";
import { GeminiLearningAIProvider } from "./gemini";
import { NvidiaQwenLearningAIProvider } from "./qwen";
import type { LearningAIProvider } from "./provider";

const DEFAULT_QWEN_BASE_URL = "http://127.0.0.1:8000/v1";
const DEFAULT_QWEN_MODEL = "Qwen/Qwen2.5-VL-3B-Instruct";
const DEFAULT_TIMEOUT_MS = 20_000;

export function createLearningAIProvider(environment: Partial<NodeJS.ProcessEnv> = process.env): LearningAIProvider {
  const configuredProvider = environment.THINKLAB_AI_PROVIDER?.trim().toLowerCase() || "qwen";

  if (configuredProvider === "fallback") {
    return new FallbackLearningAIProvider();
  }

  if (configuredProvider === "gemini") {
    const apiKey = environment.GEMINI_API_KEY?.trim();
    if (!apiKey) throw new Error("GEMINI_API_KEY is not configured for the Gemini provider.");
    return new GeminiLearningAIProvider(apiKey);
  }

  if (configuredProvider === "qwen") {
    return new NvidiaQwenLearningAIProvider({
      baseUrl: environment.THINKLAB_AI_BASE_URL?.trim() || DEFAULT_QWEN_BASE_URL,
      model: environment.THINKLAB_AI_MODEL?.trim() || DEFAULT_QWEN_MODEL,
      token: environment.THINKLAB_AI_TOKEN,
      timeoutMs: parseTimeout(environment.THINKLAB_AI_TIMEOUT_MS),
    });
  }

  throw new Error(`Unsupported THINKLAB_AI_PROVIDER: ${configuredProvider}`);
}

function parseTimeout(value: string | undefined): number {
  if (!value) return DEFAULT_TIMEOUT_MS;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed >= 5_000 && parsed <= 60_000 ? parsed : DEFAULT_TIMEOUT_MS;
}

export { FallbackLearningAIProvider, GeminiLearningAIProvider, NvidiaQwenLearningAIProvider };
export { parseModelJson } from "./json";
export type { LearningAIProvider, LearningAIProviderSource } from "./provider";
