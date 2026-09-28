// Deterministic rules for the Challenge Arena seed game.
// Players take 1 or 2 seeds in turn. Whoever takes the last seed wins.
// The robot plays perfectly, so the child wins only by always leaving the
// robot a multiple of 3 seeds.

export const START_SEEDS = 7;
export const TAKE_OPTIONS = [1, 2] as const;
export type Take = (typeof TAKE_OPTIONS)[number];

export function canTake(seedsLeft: number, take: number): take is Take {
  return (take === 1 || take === 2) && take <= seedsLeft;
}

/** The robot's move: take the remainder mod 3 when it can win, otherwise take 1. */
export function robotTake(seedsLeft: number): Take {
  const winning = seedsLeft % 3;
  if (winning === 1 || winning === 2) return winning;
  return 1;
}

/** True when the player about to move can force a win from this many seeds. */
export function isWinningPosition(seedsLeft: number): boolean {
  return seedsLeft % 3 !== 0;
}

/**
 * A clue that grows with each lost game, so the child is nudged
 * towards the strategy without being handed the full answer at once.
 */
export function clueForLosses(losses: number): string {
  if (losses <= 0) return "";
  if (losses === 1) return "Robot wins when it can grab all the seeds left. How many seeds could Robot NOT finish in one turn?";
  if (losses === 2) return "Try to leave Robot exactly 3 seeds. Whatever Robot takes, you can take the rest.";
  return "Work backwards. To leave Robot 3 seeds later, what should you leave Robot before that?";
}
