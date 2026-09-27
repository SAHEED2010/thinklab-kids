import { describe, expect, it } from "vitest";

describe("ThinkLab Product Architecture & Explanations", () => {
  const canonicalWorlds = [
    "Number Lab",
    "Story Studio",
    "Code Quest",
    "Strategy Arena",
    "Word Arena",
    "Discovery Lab",
    "Creator Studio",
    "Life Missions",
    "Wonder",
    "Projects",
  ];

  const learningLoopStages = [
    "Explore",
    "Think",
    "Attempt",
    "Explain",
    "Feedback",
    "Adapt",
    "Create",
    "Master",
  ];

  const ageStageMottos = [
    { range: "Ages 4–5", motto: "I explore." },
    { range: "Ages 6–8", motto: "I try and explain." },
    { range: "Ages 9–11", motto: "I investigate and challenge." },
    { range: "Ages 12–14", motto: "I build, lead, and launch." },
  ];

  it("defines exactly 10 canonical ThinkLab worlds", () => {
    expect(canonicalWorlds.length).toBe(10);
    expect(canonicalWorlds).toContain("Life Missions");
    expect(canonicalWorlds).toContain("Code Quest");
    expect(canonicalWorlds).toContain("Number Lab");
    expect(canonicalWorlds).toContain("Strategy Arena");
  });

  it("contains all 8 stages of the ThinkLab learning loop in sequence", () => {
    expect(learningLoopStages.length).toBe(8);
    expect(learningLoopStages[0]).toBe("Explore");
    expect(learningLoopStages[3]).toBe("Explain");
    expect(learningLoopStages[7]).toBe("Master");
  });

  it("contains all 4 developmental age stage progressions", () => {
    expect(ageStageMottos.length).toBe(4);
    expect(ageStageMottos[0].motto).toContain("explore");
    expect(ageStageMottos[1].motto).toContain("explain");
    expect(ageStageMottos[2].motto).toContain("investigate");
    expect(ageStageMottos[3].motto).toContain("launch");
  });

  it("enforces Responsible AI constraints against deficit labeling words", () => {
    const forbiddenPhrases = [
      /\bIQ\b/i,
      /\bgifted\b/i,
      /\bweak\b/i,
      /\bincapable\b/i,
      /\bfake creativity percentage\b/i,
    ];

    const sampleCoreValues = [
      "School gives the foundation. ThinkLab provides the arena to explore, apply, and explain it.",
      "Adding observable evidence alongside conventional grades.",
      "Descriptive activity evidence with zero permanent labels.",
    ];

    for (const text of sampleCoreValues) {
      for (const pattern of forbiddenPhrases) {
        expect(text).not.toMatch(pattern);
      }
    }
  });
});
