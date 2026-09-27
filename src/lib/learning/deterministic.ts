import type { DeterministicEvaluation, DifficultyAction, LearningMission, UnderstandingLevel } from "@/lib/types";

export function calculateMissionTotal(mission: LearningMission): number {
  const selected = new Set(mission.challenge.selectedItemNames);
  return mission.challenge.items
    .filter((item) => selected.has(item.name))
    .reduce((total, item) => total + item.price, 0);
}

export function calculateExpectedRemaining(mission: LearningMission): number {
  return mission.challenge.budget - calculateMissionTotal(mission);
}

export function parseNumberAnswer(value: string): number | null {
  const normalized = value.trim().replace(/[₦,\s]/g, "");
  if (!normalized || !/^\d+(?:\.\d+)?$/.test(normalized)) return null;
  const parsed = Number(normalized);
  return Number.isSafeInteger(parsed) ? parsed : null;
}

export function evaluateMissionAnswer(mission: LearningMission, rawAnswer: string): DeterministicEvaluation {
  const expectedRemaining = calculateExpectedRemaining(mission);
  const submittedAnswer = parseNumberAnswer(rawAnswer);

  return {
    correctness: submittedAnswer === null
      ? "unclear"
      : submittedAnswer === expectedRemaining
        ? "correct"
        : "incorrect",
    expectedRemaining,
    submittedAnswer,
    totalCost: calculateMissionTotal(mission),
  };
}

export function determineDifficultyAction(
  evaluation: DeterministicEvaluation,
  understanding: UnderstandingLevel,
): DifficultyAction {
  if (evaluation.correctness === "incorrect" || evaluation.correctness === "unclear" || understanding === "emerging") {
    return "simplify";
  }
  if (evaluation.correctness === "correct" && understanding === "demonstrated") {
    return "increase";
  }
  return "maintain";
}
