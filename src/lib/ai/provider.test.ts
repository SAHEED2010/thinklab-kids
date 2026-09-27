import { describe, expect, it } from "vitest";
import { createLearningAIProvider } from "./index";

describe("learning AI provider selection", () => {
  it("selects Qwen explicitly", () => {
    const provider = createLearningAIProvider({
      THINKLAB_AI_PROVIDER: "qwen",
      THINKLAB_AI_BASE_URL: "http://127.0.0.1:8000/v1",
      THINKLAB_AI_MODEL: "Qwen/Qwen2.5-VL-3B-Instruct",
    });

    expect(provider.source).toBe("qwen");
  });

  it("selects the no-network fallback explicitly", () => {
    expect(createLearningAIProvider({ THINKLAB_AI_PROVIDER: "fallback" }).source).toBe("fallback");
  });

  it("does not require Gemini credentials for the default Qwen path", () => {
    expect(createLearningAIProvider({}).source).toBe("qwen");
  });

  it("requires a key only when Gemini is explicitly selected", () => {
    expect(() => createLearningAIProvider({ THINKLAB_AI_PROVIDER: "gemini" })).toThrow("GEMINI_API_KEY");
  });
});
