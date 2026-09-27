import { determineDifficultyAction } from "./deterministic";
import type { DifficultyAction, DeterministicEvaluation, LearningMission, ReasoningEvaluation, ResponseEvaluation, SessionSummary } from "@/lib/types";

export const fallbackMarketMission: LearningMission = {
  title: "Zara's Market Basket",
  story: "Zara has ₦2,000 for a market trip. She chooses rice, eggs and tomatoes for her family.",
  question: "How much money will Zara have left?",
  interactionType: "number",
  academicObjective: "addition and subtraction with money",
  capabilities: ["reasoning", "decision-making", "communication"],
  difficulty: 1,
  challenge: {
    budget: 2000,
    items: [
      { name: "Rice", price: 650 },
      { name: "Eggs", price: 500 },
      { name: "Tomatoes", price: 350 },
    ],
    selectedItemNames: ["Rice", "Eggs", "Tomatoes"],
  },
};

export function fallbackResponseEvaluation(evaluation: DeterministicEvaluation): ResponseEvaluation {
  if (evaluation.correctness === "correct") {
    return {
      correctness: "correct",
      feedback: "You found the right amount left in Zara's basket.",
      followUpQuestion: "How did you work that out?",
      possibleMisconception: null,
    };
  }

  return {
    correctness: evaluation.correctness,
    feedback: evaluation.correctness === "unclear"
      ? "Try entering the amount of money Zara has left after shopping."
      : "Let's slow down. Add the item prices first, then take that total away from ₦2,000.",
    followUpQuestion: "What did you add first, and why?",
    possibleMisconception: evaluation.correctness === "incorrect" ? "The total cost may not have been subtracted from the budget yet." : null,
  };
}

export function fallbackReasoningEvaluation(
  evaluation: DeterministicEvaluation,
  explanation: string,
): ReasoningEvaluation {
  const hasExplanation = explanation.trim().length > 0;
  const understanding = evaluation.correctness === "correct" ? "developing" : "emerging";

  return {
    understanding,
    feedback: evaluation.correctness === "correct"
      ? "Your answer matched the market calculation. Thanks for sharing your thinking."
      : "You have a useful start. Try naming the total cost before you subtract it from the budget.",
    possibleMisconception: understanding === "emerging" ? "The order of adding prices and subtracting from the budget may need another try." : null,
    evidence: hasExplanation
      ? [{ capability: "Communication", observation: "Shared an explanation during the market mission." }]
      : [],
    difficultyAction: determineDifficultyAction(evaluation, understanding),
  };
}

export function fallbackAdaptedMission(action: DifficultyAction): LearningMission {
  if (action === "simplify") {
    return {
      ...fallbackMarketMission,
      title: "A Smaller Market Basket",
      story: "Zara has ₦1,500. She chooses bread for ₦400 and fruit for ₦300.",
      question: "How much money will Zara have left?",
      difficulty: 1,
      challenge: {
        budget: 1500,
        items: [{ name: "Bread", price: 400 }, { name: "Fruit", price: 300 }],
        selectedItemNames: ["Bread", "Fruit"],
      },
    };
  }

  if (action === "increase") {
    return {
      ...fallbackMarketMission,
      title: "Zara's Market Choice",
      story: "Zara has ₦2,500. Rice costs ₦700, beans cost ₦600 and oranges cost ₦450.",
      question: "How much will Zara have left if she buys all three?",
      difficulty: 2,
      challenge: {
        budget: 2500,
        items: [{ name: "Rice", price: 700 }, { name: "Beans", price: 600 }, { name: "Oranges", price: 450 }],
        selectedItemNames: ["Rice", "Beans", "Oranges"],
      },
    };
  }

  return {
    ...fallbackMarketMission,
    title: "A New Market Plan",
    story: "Zara has ₦2,000. Rice costs ₦650, eggs cost ₦500 and bananas cost ₦250.",
    question: "How much will Zara have left if she buys all three?",
    challenge: {
      budget: 2000,
      items: [{ name: "Rice", price: 650 }, { name: "Eggs", price: 500 }, { name: "Bananas", price: 250 }],
      selectedItemNames: ["Rice", "Eggs", "Bananas"],
    },
  };
}

export function fallbackSessionSummary(
  learnerId: SessionSummary["learnerId"],
  missionTitle: string,
  attempts: Array<{ correctness: string; explanation: string }>,
): SessionSummary {
  const correctCount = attempts.filter((attempt) => attempt.correctness === "correct").length;
  const explained = attempts.some((attempt) => attempt.explanation.trim().length > 0);

  return {
    learnerId,
    missionTitle,
    academicEvidence: [{
      skill: "Addition and subtraction with money",
      observation: correctCount > 0
        ? "Solved a contextual money problem by finding the amount left."
        : "Practised finding the amount left after buying items.",
    }],
    capabilityEvidence: [
      ...(explained ? [{ capability: "Communication", observation: "Explained a step used during the market mission." }] : []),
      { capability: "Reasoning", observation: "Worked through a budget question in a familiar market context." },
    ],
    nextStep: "Try finding two different shopping plans that stay inside a fixed budget.",
    encouragement: "You kept trying and shared how you were thinking. That is how ideas grow.",
  };
}
