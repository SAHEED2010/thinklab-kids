// Deterministic rules for the Strategy & Word Arena word-chain challenge.
// The rule: each word starts with the last letter of the word before it.

export interface ChainOption {
  word: string;
  /** Why this word does not fit, written for a young learner. Unused for the answer. */
  whyNot: string;
}

export interface WordChainPuzzle {
  id: string;
  chain: string[];
  options: ChainOption[];
  answer: string;
}

export const WORD_CHAIN_PUZZLES: WordChainPuzzle[] = [
  {
    id: "egg-chain",
    chain: ["sun", "nest", "tree", "egg"],
    answer: "goat",
    options: [
      { word: "eye", whyNot: "Eye starts with e, just like egg starts. But the chain never joins at the start of a word. Look at the other end of egg." },
      { word: "goat", whyNot: "" },
      { word: "leg", whyNot: "Leg ends with g, like egg does. But look at how tree joins egg. Which end of the new word has to match?" },
      { word: "sock", whyNot: "Sock starts with s, like sun at the very beginning. The next word only needs to join the word right before it: egg." },
    ],
  },
  {
    id: "yam-chain",
    chain: ["bus", "sun", "net", "toy"],
    answer: "yam",
    options: [
      { word: "tin", whyNot: "Tin starts with t, the same letter toy starts with. The chain joins at the end of toy, not the start." },
      { word: "boy", whyNot: "Boy ends with y, like toy. That sounds nice, but look at how net joins toy. Which end of the new word has to match?" },
      { word: "yam", whyNot: "" },
      { word: "bag", whyNot: "Bag starts with b, like bus at the very beginning. The next word only needs to join the word right before it: toy." },
    ],
  },
];

export function lastLetter(word: string): string {
  return word.charAt(word.length - 1).toLowerCase();
}

export function firstLetter(word: string): string {
  return word.charAt(0).toLowerCase();
}

/** True when `next` hooks onto `previous` by the chain rule. */
export function joinsChain(previous: string, next: string): boolean {
  return previous.length > 0 && next.length > 0 && lastLetter(previous) === firstLetter(next);
}

export function isCorrectChoice(puzzle: WordChainPuzzle, word: string): boolean {
  return word === puzzle.answer && joinsChain(puzzle.chain[puzzle.chain.length - 1], word);
}
