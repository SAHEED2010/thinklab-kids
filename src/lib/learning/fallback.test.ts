import { describe, expect, it } from "vitest";
import { evaluateMissionAnswer } from "./deterministic";
import { fallbackMarketMission, fallbackReasoningEvaluation, fallbackSessionSummary } from "./fallback";

describe("fallback reasoning evaluation", () => {
  it("does not infer demonstrated understanding from explanation length", () => {
    const evaluation = evaluateMissionAnswer(fallbackMarketMission, "500");
    const reasoning = fallbackReasoningEvaluation(evaluation, "I added every price, found the total, and subtracted it from the budget.");

    expect(reasoning.understanding).toBe("developing");
    expect(reasoning.evidence).toEqual([{
      capability: "Communication",
      observation: "Shared an explanation during the market mission.",
    }]);
  });

  it("uses only the fact that an explanation was shared for communication evidence", () => {
    const evaluation = evaluateMissionAnswer(fallbackMarketMission, "500");
    const reasoning = fallbackReasoningEvaluation(evaluation, "ok");

    expect(reasoning.understanding).toBe("developing");
    expect(reasoning.evidence).toHaveLength(1);
  });

  it("uses deterministic difficulty decisions for fallback adaptation", () => {
    const incorrect = evaluateMissionAnswer(fallbackMarketMission, "400");
    const reasoning = fallbackReasoningEvaluation(incorrect, "I tried subtracting the prices.");

    expect(reasoning.difficultyAction).toBe("simplify");
  });
});

describe("fallback session summary", () => {
  it("uses directly observable wording for a minimal explanation", () => {
    const summary = fallbackSessionSummary("zara", "Zara's Market Adventure", [{ correctness: "correct", explanation: "ok" }]);

    expect(summary.capabilityEvidence).toContainEqual({
      capability: "Communication",
      observation: "Shared an explanation during the market mission.",
    });
    expect(summary.capabilityEvidence).not.toContainEqual({
      capability: "Communication",
      observation: "Explained a step used during the market mission.",
    });
  });
});
