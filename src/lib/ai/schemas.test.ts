import { describe, expect, it } from "vitest";
import { learningMissionSchema } from "./schemas";

describe("learningMissionSchema", () => {
  it("accepts a valid structured mission", () => {
    const result = learningMissionSchema.safeParse({
      title: "Market Adventure",
      story: "Zara has ₦2,000 to spend.",
      question: "How much remains after buying a mango for ₦500?",
      interactionType: "number",
      academicObjective: "addition and subtraction with money",
      capabilities: ["reasoning", "decision-making"],
      difficulty: 2,
      challenge: {
        budget: 2000,
        items: [
          { name: "Rice", price: 650 },
          { name: "Eggs", price: 500 },
        ],
        selectedItemNames: ["Rice", "Eggs"],
      },
    });

    expect(result.success).toBe(true);
  });

  it("rejects an unknown interaction type", () => {
    const result = learningMissionSchema.safeParse({
      title: "Market Adventure",
      story: "A short story.",
      question: "What should Zara do?",
      interactionType: "essay",
      academicObjective: "reasoning",
      capabilities: ["communication"],
      difficulty: 2,
    });

    expect(result.success).toBe(false);
  });
});
