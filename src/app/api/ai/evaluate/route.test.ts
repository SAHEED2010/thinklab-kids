import { afterEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";
import { fallbackMarketMission } from "@/lib/learning/fallback";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("POST /api/ai/evaluate", () => {
  it("keeps deterministic arithmetic authoritative over model correctness", async () => {
    vi.stubEnv("THINKLAB_AI_PROVIDER", "qwen");
    vi.stubEnv("THINKLAB_AI_BASE_URL", "http://127.0.0.1:8000/v1");
    vi.stubEnv("THINKLAB_AI_MODEL", "Qwen/Qwen2.5-VL-3B-Instruct");
    vi.stubGlobal("fetch", async () => new Response(JSON.stringify({
      choices: [{ message: { content: JSON.stringify({
        correctness: "correct",
        feedback: "Keep checking each price.",
        followUpQuestion: "What did you add first?",
        possibleMisconception: null,
      }) } }],
    }), { status: 200 }));

    const response = await POST(new Request("http://localhost/api/ai/evaluate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        learnerId: "zara",
        mission: fallbackMarketMission,
        answer: "400",
      }),
    }));
    const payload = await response.json() as {
      deterministic: { correctness: string };
      evaluation: { correctness: string };
      source: string;
    };

    expect(response.status).toBe(200);
    expect(payload.source).toBe("qwen");
    expect(payload.deterministic.correctness).toBe("incorrect");
    expect(payload.evaluation.correctness).toBe("incorrect");
  });
});
