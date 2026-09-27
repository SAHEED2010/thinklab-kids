import { describe, expect, it } from "vitest";
import { calculateExpectedRemaining, calculateMissionTotal, determineDifficultyAction, evaluateMissionAnswer } from "./deterministic";
import { fallbackMarketMission } from "./fallback";

describe("deterministic market evaluation", () => {
  it("calculates and checks the budget without using AI", () => {
    expect(calculateExpectedRemaining(fallbackMarketMission)).toBe(500);
    expect(evaluateMissionAnswer(fallbackMarketMission, "₦500").correctness).toBe("correct");
    expect(evaluateMissionAnswer(fallbackMarketMission, "400").correctness).toBe("incorrect");
  });

  it("treats non-numeric answers as unclear", () => {
    expect(evaluateMissionAnswer(fallbackMarketMission, "I am not sure").correctness).toBe("unclear");
  });

  it("chooses an adaptation from observed evidence", () => {
    const evaluation = evaluateMissionAnswer(fallbackMarketMission, "500");
    expect(determineDifficultyAction(evaluation, "demonstrated")).toBe("increase");
    expect(determineDifficultyAction(evaluation, "developing")).toBe("maintain");
    expect(determineDifficultyAction({ ...evaluation, correctness: "incorrect" }, "emerging")).toBe("simplify");
  });

  it("rejects malformed challenges instead of silently scoring them", () => {
    const malformedMission = {
      ...fallbackMarketMission,
      challenge: {
        ...fallbackMarketMission.challenge,
        selectedItemNames: ["Rice", "Missing item"],
      },
    };

    expect(() => calculateMissionTotal(malformedMission)).toThrow();
    expect(() => calculateExpectedRemaining(malformedMission)).toThrow();
    expect(() => evaluateMissionAnswer(malformedMission, "500")).toThrow();
  });
});
