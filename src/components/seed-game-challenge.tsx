"use client";

import { useEffect, useState } from "react";
import { Bot, Lightbulb, Play, RotateCcw, Trophy } from "lucide-react";
import { canTake, clueForLosses, robotTake, START_SEEDS, TAKE_OPTIONS, type Take } from "@/lib/seed-game";

const ROBOT_THINK_MS = 900;

type Phase = "child" | "robot" | "won" | "lost";

interface Move {
  by: "you" | "robot";
  took: Take;
  left: number;
}

export function SeedGameChallenge() {
  const [seeds, setSeeds] = useState(START_SEEDS);
  const [phase, setPhase] = useState<Phase>("child");
  const [selected, setSelected] = useState<Take | null>(null);
  const [moves, setMoves] = useState<Move[]>([]);
  const [losses, setLosses] = useState(0);

  // Robot's turn: pause briefly so the child can watch what happens.
  useEffect(() => {
    if (phase !== "robot") return;
    const timer = setTimeout(() => {
      const took = robotTake(seeds);
      const left = seeds - took;
      setSeeds(left);
      setMoves((prev) => [...prev, { by: "robot", took, left }]);
      if (left === 0) {
        setLosses((prev) => prev + 1);
        setPhase("lost");
      } else {
        setPhase("child");
      }
    }, ROBOT_THINK_MS);
    return () => clearTimeout(timer);
  }, [phase, seeds]);

  const takeSeeds = () => {
    if (phase !== "child" || selected === null || !canTake(seeds, selected)) return;
    const left = seeds - selected;
    setSeeds(left);
    setMoves((prev) => [...prev, { by: "you", took: selected, left }]);
    setSelected(null);
    setPhase(left === 0 ? "won" : "robot");
  };

  const newGame = () => {
    setSeeds(START_SEEDS);
    setPhase("child");
    setSelected(null);
    setMoves([]);
  };

  const lastMove = moves[moves.length - 1];
  const leftForRobot = moves.filter((move) => move.by === "you" && move.left > 0).map((move) => move.left);
  const clue = clueForLosses(losses);

  let status = "Your turn. You go first!";
  if (phase === "robot") status = "Robot is thinking…";
  else if (phase === "child" && lastMove?.by === "robot") status = `Robot took ${lastMove.took}. Your turn!`;

  return (
    <section className="rounded-3xl border-2 border-berry/20 bg-white p-5 sm:p-6" aria-labelledby="seed-game-heading">
      <div className="mb-6">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-berry px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
          <Play aria-hidden="true" size={12} fill="currentColor" /> Playable sample
        </span>
        <h3 id="seed-game-heading" className="mt-3 font-display text-2xl font-bold">The Seed Game</h3>
        <p className="mt-2 leading-7 text-ink/70">Take 1 or 2 seeds each turn. Whoever takes the last seed wins.</p>
      </div>

      {/* The seed tray */}
      <div className="rounded-3xl bg-mango/30 p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="whitespace-nowrap font-display text-2xl font-bold" aria-live="polite">
            {seeds} {seeds === 1 ? "seed" : "seeds"} left
          </p>
          <span className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-white px-3 py-2 text-sm font-bold">
            <Bot aria-hidden="true" size={18} /> You vs Robot
          </span>
        </div>
        <ul className="mt-5 flex flex-wrap justify-center gap-3" aria-label={`${seeds} seeds in the tray`}>
          {Array.from({ length: START_SEEDS }, (_, i) => {
            const present = i < seeds;
            const picked = present && selected !== null && i >= seeds - selected;
            return (
              <li
                key={i}
                aria-hidden="true"
                className={`h-12 w-12 rounded-full transition sm:h-14 sm:w-14 ${
                  !present
                    ? "border-2 border-dashed border-ink/20"
                    : picked
                      ? "-translate-y-2 bg-berry ring-4 ring-berry/30"
                      : "bg-[#8a5a2b] shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)]"
                }`}
              />
            );
          })}
        </ul>
      </div>

      {/* Plan & try */}
      {(phase === "child" || phase === "robot") && (
        <div className="mt-6">
          <p className="font-bold" aria-live="polite">{status}</p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:max-w-md">
            {TAKE_OPTIONS.map((take) => (
              <button
                key={take}
                onClick={() => setSelected(take)}
                disabled={phase !== "child" || !canTake(seeds, take)}
                aria-pressed={selected === take}
                className={`min-h-16 rounded-2xl border-2 font-display text-xl font-bold transition focus-visible:outline focus-visible:outline-4 focus-visible:outline-berry disabled:opacity-40 ${
                  selected === take ? "border-berry bg-sky" : "border-ink/10 bg-white hover:border-berry"
                }`}
              >
                Take {take}
              </button>
            ))}
          </div>
          <button
            onClick={takeSeeds}
            disabled={phase !== "child" || selected === null}
            className="mt-4 min-h-14 w-full rounded-full bg-berry px-6 text-lg font-bold text-white transition hover:bg-berry/90 focus-visible:outline focus-visible:outline-4 focus-visible:outline-ink active:scale-95 disabled:opacity-40 sm:max-w-md"
          >
            {selected === null ? "Pick 1 or 2 seeds" : `Take ${selected} ${selected === 1 ? "seed" : "seeds"}`}
          </button>
          {clue && (
            <p className="mt-5 flex items-start gap-2 rounded-2xl bg-sky p-4 leading-7">
              <Lightbulb aria-hidden="true" className="mt-1 shrink-0 text-berry" size={20} />
              <span>{clue}</span>
            </p>
          )}
        </div>
      )}

      {/* Observe & adjust */}
      <div aria-live="polite">
        {phase === "lost" && (
          <div className="mt-6 rounded-2xl bg-coral/15 p-5 sm:p-6">
            <p className="font-display text-2xl font-bold">Robot took the last seed.</p>
            <p className="mt-2 leading-7 text-ink/80">
              You left Robot {lastMove.took} {lastMove.took === 1 ? "seed" : "seeds"}, so Robot could take them all. Let&apos;s try a new plan.
            </p>
            <p className="mt-4 flex items-start gap-2 rounded-2xl bg-white p-4 leading-7">
              <Lightbulb aria-hidden="true" className="mt-1 shrink-0 text-berry" size={20} />
              <span>{clue}</span>
            </p>
            <button
              onClick={newGame}
              className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-full bg-berry px-6 font-bold text-white transition hover:bg-berry/90 focus-visible:outline focus-visible:outline-4 focus-visible:outline-ink active:scale-95"
            >
              <RotateCcw aria-hidden="true" size={18} /> Try again
            </button>
          </div>
        )}

        {phase === "won" && (
          <div className="mt-6 rounded-2xl bg-leaf/30 p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <Trophy aria-hidden="true" className="mt-1 shrink-0 text-berry" size={26} />
              <div>
                <p className="font-display text-2xl font-bold">You took the last seed!</p>
                <p className="mt-2 leading-7 text-ink/80">
                  You left Robot {leftForRobot.join(", then ")} seeds. Robot can never win from those numbers.
                  You worked backwards from the goal and stuck to your plan. That&apos;s strategic thinking.
                </p>
                {losses > 0 && (
                  <p className="mt-2 leading-7 text-ink/80">
                    It took you {losses + 1} games. Every try taught you something new.
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={newGame}
              className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-full bg-berry px-6 font-bold text-white transition hover:bg-berry/90 focus-visible:outline focus-visible:outline-4 focus-visible:outline-ink active:scale-95"
            >
              <RotateCcw aria-hidden="true" size={18} /> Play again
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
