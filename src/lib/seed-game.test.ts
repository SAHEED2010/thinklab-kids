import { describe, expect, it } from "vitest";
import { canTake, clueForLosses, isWinningPosition, robotTake, START_SEEDS, TAKE_OPTIONS } from "./seed-game";

// Plays out every child strategy against the robot and reports whether the child can win.
function childCanForceWin(seedsLeft: number): boolean {
  return TAKE_OPTIONS.some((take) => {
    if (!canTake(seedsLeft, take)) return false;
    const afterChild = seedsLeft - take;
    if (afterChild === 0) return true;
    const afterRobot = afterChild - robotTake(afterChild);
    if (afterRobot === 0) return false;
    return childCanForceWin(afterRobot);
  });
}

describe("seed game rules", () => {
  it("only allows taking 1 or 2 seeds that exist", () => {
    expect(canTake(5, 1)).toBe(true);
    expect(canTake(5, 2)).toBe(true);
    expect(canTake(5, 3)).toBe(false);
    expect(canTake(1, 2)).toBe(false);
  });

  it("robot always makes a legal move", () => {
    for (let seeds = 1; seeds <= START_SEEDS; seeds++) expect(canTake(seeds, robotTake(seeds))).toBe(true);
  });

  it("robot takes the last seeds when it can", () => {
    expect(robotTake(1)).toBe(1);
    expect(robotTake(2)).toBe(2);
    expect(robotTake(5)).toBe(2);
  });

  it("the starting position is winnable for the child", () => {
    expect(isWinningPosition(START_SEEDS)).toBe(true);
    expect(childCanForceWin(START_SEEDS)).toBe(true);
  });

  it("the child wins only by leaving the robot a multiple of 3", () => {
    const winningFirstMoves = TAKE_OPTIONS.filter((take) => {
      const afterChild = START_SEEDS - take;
      const afterRobot = afterChild - robotTake(afterChild);
      return afterRobot > 0 && childCanForceWin(afterRobot);
    });
    expect(winningFirstMoves).toEqual([1]);
  });

  it("gives a clue after every loss, getting more specific", () => {
    expect(clueForLosses(0)).toBe("");
    const clues = [1, 2, 3].map(clueForLosses);
    expect(new Set(clues).size).toBe(3);
  });
});
