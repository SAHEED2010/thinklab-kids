import { describe, expect, it } from "vitest";
import { getLearner } from "@/data/learners";
import { evaluateMissionAnswer } from "@/lib/learning/deterministic";
import { fallbackMarketMission } from "@/lib/learning/fallback";
import { NvidiaQwenLearningAIProvider } from "./qwen";

describe("NvidiaQwenLearningAIProvider", () => {
  it("sends an OpenAI-compatible request and parses fenced JSON", async () => {
    const responseBody = {
      choices: [{ message: { content: "```json\n{\"correctness\":\"correct\",\"feedback\":\"Nice work.\",\"followUpQuestion\":\"What did you add first?\",\"possibleMisconception\":null}\n```" } }],
    };
    const fetchImpl: typeof fetch = async (_input, init) => {
      expect(init?.method).toBe("POST");
      expect(init?.headers).toEqual({ "Content-Type": "application/json" });
      return new Response(JSON.stringify(responseBody), { status: 200 });
    };
    const learner = getLearner("zara");
    if (!learner) throw new Error("Test learner missing.");

    const provider = new NvidiaQwenLearningAIProvider({
      baseUrl: "http://127.0.0.1:8000/v1/",
      model: "Qwen/Qwen2.5-VL-3B-Instruct",
      fetchImpl,
    });
    const result = await provider.evaluateResponse({
      learner,
      mission: fallbackMarketMission,
      answer: "500",
      deterministic: evaluateMissionAnswer(fallbackMarketMission, "500"),
    });

    expect(result.correctness).toBe("correct");
    expect(provider.source).toBe("qwen");
  });

  it("turns invalid model JSON into a provider failure for the route fallback", async () => {
    const fetchImpl: typeof fetch = async () => new Response(JSON.stringify({
      choices: [{ message: { content: "not JSON" } }],
    }), { status: 200 });
    const learner = getLearner("zara");
    if (!learner) throw new Error("Test learner missing.");

    const provider = new NvidiaQwenLearningAIProvider({
      baseUrl: "http://127.0.0.1:8000/v1",
      model: "Qwen/Qwen2.5-VL-3B-Instruct",
      fetchImpl,
    });

    await expect(provider.evaluateResponse({
      learner,
      mission: fallbackMarketMission,
      answer: "500",
      deterministic: evaluateMissionAnswer(fallbackMarketMission, "500"),
    })).rejects.toThrow("Qwen request failed");
  });

  it("aborts a request that exceeds the configured timeout", async () => {
    const fetchImpl: typeof fetch = async (_input, init) => new Promise<Response>((_resolve, reject) => {
      init?.signal?.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")), { once: true });
    });
    const learner = getLearner("zara");
    if (!learner) throw new Error("Test learner missing.");
    const provider = new NvidiaQwenLearningAIProvider({
      baseUrl: "http://127.0.0.1:8000/v1",
      model: "Qwen/Qwen2.5-VL-3B-Instruct",
      timeoutMs: 25,
      fetchImpl,
    });

    await expect(provider.evaluateResponse({
      learner,
      mission: fallbackMarketMission,
      answer: "500",
      deterministic: evaluateMissionAnswer(fallbackMarketMission, "500"),
    })).rejects.toThrow("Qwen request timed out");
  });
});
