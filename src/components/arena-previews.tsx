import type { ReactNode } from "react";
import { ChessKing, ChessKnight, ChessQueen, Circle, Square, Triangle } from "lucide-react";
import { StatusBadge } from "@/components/status-badge";

// Static previews of planned Strategy & Word Arena activities.
// Nothing here is interactive: each card only shows what the child would do.

interface ArenaPreview {
  title: string;
  childDoes: string;
  thinking: string;
  visual: ReactNode;
}

function PatternVisual() {
  const shapes = [Circle, Square, Triangle, Circle, Square];
  return (
    <div className="flex items-center gap-2">
      {shapes.map((Shape, i) => (
        <Shape key={i} size={26} className="text-berry" fill="currentColor" />
      ))}
      <span className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-dashed border-ink/30 font-bold text-ink/50">?</span>
    </div>
  );
}

function ChessVisual() {
  const pieces: Record<number, ReactNode> = {
    1: <ChessKing size={22} className="text-ink" />,
    7: <ChessQueen size={22} className="text-ink" />,
    10: <ChessKnight size={22} className="text-berry" fill="currentColor" />,
  };
  return (
    <div className="grid grid-cols-4 overflow-hidden rounded-lg border-2 border-ink/20">
      {Array.from({ length: 16 }, (_, i) => (
        <span key={i} className={`flex h-9 w-9 items-center justify-center ${(Math.floor(i / 4) + i) % 2 === 0 ? "bg-white" : "bg-mango/50"}`}>
          {pieces[i]}
        </span>
      ))}
    </div>
  );
}

function XAndOVisual() {
  const cells = ["X", "O", "X", "", "O", "", "", "", ""];
  return (
    <div className="grid grid-cols-3 gap-1">
      {cells.map((cell, i) => (
        <span key={i} className={`flex h-9 w-9 items-center justify-center rounded-md bg-white font-display text-lg font-bold ${cell === "X" ? "text-berry" : "text-ink"}`}>
          {cell}
        </span>
      ))}
    </div>
  );
}

function WordTilesVisual() {
  const tiles: [string, number][] = [["M", 3], ["A", 1], ["N", 1], ["G", 2], ["O", 1]];
  return (
    <div className="flex gap-1.5">
      {tiles.map(([letter, points]) => (
        <span key={letter} className="relative flex h-10 w-10 items-center justify-center rounded-md bg-mango font-display text-xl font-bold shadow-[inset_0_-3px_0_rgba(0,0,0,0.12)]">
          {letter}
          <span className="absolute bottom-0.5 right-1 text-[10px] leading-none">{points}</span>
        </span>
      ))}
    </div>
  );
}

const PREVIEWS: ArenaPreview[] = [
  {
    title: "Pattern Puzzle",
    childDoes: "Look at a row of shapes and pick the one that comes next.",
    thinking: "Spotting a rule, then testing it.",
    visual: <PatternVisual />,
  },
  {
    title: "Chess Micro-Puzzle",
    childDoes: "Study a tiny board with a few pieces and find the one best move.",
    thinking: "Planning ahead and checking what could happen next.",
    visual: <ChessVisual />,
  },
  {
    title: "X-and-O Strategy",
    childDoes: "Finish a half-played game: find the square that wins or blocks.",
    thinking: "Thinking about the other player's next move.",
    visual: <XAndOVisual />,
  },
  {
    title: "Word Tiles",
    childDoes: "Build words from letter tiles and find the one worth the most points.",
    thinking: "Vocabulary, spelling and comparing choices.",
    visual: <WordTilesVisual />,
  },
];

export function ArenaPreviews() {
  return (
    <div>
      <h3 className="font-display text-2xl font-bold">Coming to the arena</h3>
      <p className="mt-1 leading-7 text-ink/70">These activities are previews. They show what you will do here later.</p>
      <ul className="mt-5 grid gap-4 sm:grid-cols-2">
        {PREVIEWS.map(({ title, childDoes, thinking, visual }) => (
          <li key={title} className="rounded-3xl border border-ink/10 bg-paper p-5">
            <div className="flex items-start justify-between gap-3">
              <h4 className="font-display text-xl font-bold">{title}</h4>
              <StatusBadge status="preview" size="sm" className="shrink-0" />
            </div>
            <div className="mt-4 flex min-h-24 items-center justify-center rounded-2xl bg-sky/60 p-3" aria-hidden="true">
              {visual}
            </div>
            <p className="mt-4 leading-7">
              <strong>You would:</strong> {childDoes}
            </p>
            <p className="mt-1 leading-7 text-ink/75">
              <strong className="text-ink">Thinking:</strong> {thinking}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
