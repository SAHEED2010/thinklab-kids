import { describe, expect, it } from "vitest";
import { isCorrectChoice, joinsChain, WORD_CHAIN_PUZZLES } from "./word-chain";

describe("joinsChain", () => {
  it("links a word to the next when the last letter matches the first", () => {
    expect(joinsChain("egg", "goat")).toBe(true);
    expect(joinsChain("egg", "eye")).toBe(false);
  });

  it("ignores letter case", () => {
    expect(joinsChain("Egg", "Goat")).toBe(true);
  });
});

describe("WORD_CHAIN_PUZZLES", () => {
  it.each(WORD_CHAIN_PUZZLES)("$id has a chain that follows the rule", (puzzle) => {
    puzzle.chain.slice(1).forEach((word, i) => expect(joinsChain(puzzle.chain[i], word)).toBe(true));
  });

  it.each(WORD_CHAIN_PUZZLES)("$id has exactly one option that fits", (puzzle) => {
    const last = puzzle.chain[puzzle.chain.length - 1];
    const fitting = puzzle.options.filter((option) => joinsChain(last, option.word));
    expect(fitting.map((option) => option.word)).toEqual([puzzle.answer]);
    expect(isCorrectChoice(puzzle, puzzle.answer)).toBe(true);
  });

  it.each(WORD_CHAIN_PUZZLES)("$id explains every wrong option", (puzzle) => {
    puzzle.options
      .filter((option) => option.word !== puzzle.answer)
      .forEach((option) => expect(option.whyNot.length).toBeGreaterThan(0));
  });
});
