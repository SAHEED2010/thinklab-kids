import { describe, expect, it } from "vitest";
import { syntheticParentEvidence } from "./parent-preview";

describe("syntheticParentEvidence", () => {
  it("contains records for all demo learners including Zara and Tobi", () => {
    const learnerIds = syntheticParentEvidence.map((e) => e.learnerId);
    expect(learnerIds).toContain("zara");
    expect(learnerIds).toContain("tobi");
    expect(learnerIds).toContain("david");
    expect(learnerIds).toContain("amara");
    expect(learnerIds).toContain("favour");
  });

  it("includes concrete academic foundation and reasoning evidence for Zara", () => {
    const zara = syntheticParentEvidence.find((e) => e.learnerId === "zara");
    expect(zara).toBeDefined();
    expect(zara?.activityTitle).toContain("Balogun Market");
    expect(zara?.academicFoundation.details).toContain("₦2,000");
    expect(zara?.reasoningObserved).toContain("tomato price changed");
    expect(zara?.explanationObserved).toContain("₦200");
    expect(zara?.supportNeeded).toContain("prompt");
    expect(zara?.nextRecommendedStep.action).toContain("₦3,000");
  });

  it("includes concrete sequential logic and obstacle reasoning for Tobi", () => {
    const tobi = syntheticParentEvidence.find((e) => e.learnerId === "tobi");
    expect(tobi).toBeDefined();
    expect(tobi?.academicFoundation.concept).toContain("Sequential Logic");
    expect(tobi?.reasoningObserved).toContain("sequencing mistake");
    expect(tobi?.explanationObserved).toContain("two steps straight first");
    expect(tobi?.supportNeeded).toContain("Tried twice");
    expect(tobi?.nextRecommendedStep.suggestedWorld).toBe("Code Quest");
  });

  it("satisfies Responsible AI anti-labeling criteria without deficit or fixed-ability words", () => {
    const forbiddenPatterns = [
      /\bIQ\b/i,
      /\bgifted\b/i,
      /\bweak\b/i,
      /\bincapable\b/i,
      /\bfailure\b/i,
      /\bfailed\b/i,
      /\bpoor\b/i,
      /\bbelow average\b/i,
      /\btalent percentage\b/i,
    ];

    for (const record of syntheticParentEvidence) {
      const allText = [
        record.problemFaced,
        record.approachStrategy,
        record.reasoningObserved,
        record.explanationObserved,
        record.supportNeeded,
        record.nextRecommendedStep.action,
        record.nextRecommendedStep.context,
        record.homeConversationPrompt,
      ].join(" ");

      for (const pattern of forbiddenPatterns) {
        expect(allText).not.toMatch(pattern);
      }
    }
  });

  it("has non-empty home conversation prompts and recent interests for every learner", () => {
    for (const record of syntheticParentEvidence) {
      expect(record.homeConversationPrompt.length).toBeGreaterThan(15);
      expect(record.recentInterests.length).toBeGreaterThanOrEqual(2);
      expect(record.problemFaced.length).toBeGreaterThan(10);
    }
  });
});
