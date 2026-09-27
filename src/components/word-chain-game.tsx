"use client";

import { useState } from "react";
import { ArrowRight, Lightbulb, Play, RotateCcw, Sparkles } from "lucide-react";
import { firstLetter, isCorrectChoice, lastLetter, WORD_CHAIN_PUZZLES, type WordChainPuzzle } from "@/lib/word-chain";

// After this many misses the chain links are highlighted automatically.
const AUTO_CLUE_AFTER = 2;

type ReflectionId = "last-letter" | "word-start" | "guess";

const REFLECTIONS: { id: ReflectionId; label: string }[] = [
  { id: "last-letter", label: "I looked at the last letter" },
  { id: "word-start", label: "I checked how words start" },
  { id: "guess", label: "I made a guess" },
];

function reflectionReply(id: ReflectionId, puzzle: WordChainPuzzle): string {
  const last = puzzle.chain[puzzle.chain.length - 1];
  const hook = lastLetter(last);
  if (id === "last-letter") return `Yes! The last letter is the hook. ${last} ends with ${hook}, so the next word must start with ${hook}.`;
  if (id === "word-start") return `Good checking. Every new word starts with the letter the word before it ends with.`;
  return `A guess is a fine start. Next time, test it: ${last} ends with ${hook}, and ${puzzle.answer} starts with ${hook}.`;
}

function ChainWord({ word, highlightFirst, highlightLast, tone = "plain" }: { word: string; highlightFirst: boolean; highlightLast: boolean; tone?: "plain" | "answer" }) {
  const letters = word.split("");
  return (
    <span className={`inline-flex min-h-14 items-center rounded-2xl border-2 px-4 font-display text-2xl font-bold tracking-wide ${tone === "answer" ? "border-ink bg-leaf" : "border-ink/10 bg-white"}`}>
      {letters.map((letter, i) => {
        const marked = (highlightFirst && i === 0) || (highlightLast && i === letters.length - 1);
        return (
          <span key={i} className={marked ? "rounded-md bg-mango px-0.5" : undefined}>
            {letter}
          </span>
        );
      })}
    </span>
  );
}

export function WordChainGame() {
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [missed, setMissed] = useState<string[]>([]);
  const [solved, setSolved] = useState(false);
  const [clueAsked, setClueAsked] = useState(false);
  const [reflection, setReflection] = useState<ReflectionId | null>(null);

  const puzzle = WORD_CHAIN_PUZZLES[puzzleIndex];
  const lastWord = puzzle.chain[puzzle.chain.length - 1];
  const latestMiss = missed.length > 0 ? puzzle.options.find((option) => option.word === missed[missed.length - 1]) : undefined;
  const showLinks = solved || clueAsked || missed.length >= AUTO_CLUE_AFTER;
  const isLastPuzzle = puzzleIndex === WORD_CHAIN_PUZZLES.length - 1;

  const choose = (word: string) => {
    if (solved || missed.includes(word)) return;
    if (isCorrectChoice(puzzle, word)) setSolved(true);
    else setMissed((prev) => [...prev, word]);
  };

  const startPuzzle = (index: number) => {
    setPuzzleIndex(index);
    setMissed([]);
    setSolved(false);
    setClueAsked(false);
    setReflection(null);
  };

  const words = solved ? [...puzzle.chain, puzzle.answer] : puzzle.chain;

  return (
    <section className="rounded-3xl border-2 border-berry/20 bg-white p-5 sm:p-6" aria-labelledby="word-chain-heading">
      <div className="mb-6">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-berry px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
          <Play aria-hidden="true" size={12} fill="currentColor" /> Playable sample
        </span>
        <h3 id="word-chain-heading" className="mt-3 font-display text-2xl font-bold">Word Chain</h3>
        <p className="mt-2 leading-7 text-ink/70">Each word hooks onto the one before it. Find the word that comes next.</p>
      </div>

      {/* Understand: the chain */}
      <div className="rounded-3xl bg-sky p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-ink/60">Word chain {puzzleIndex + 1} of {WORD_CHAIN_PUZZLES.length}</p>
          {!showLinks && (
            <button
              onClick={() => setClueAsked(true)}
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-4 text-sm font-bold text-ink transition hover:bg-mango focus-visible:outline focus-visible:outline-4 focus-visible:outline-berry"
            >
              <Lightbulb aria-hidden="true" size={17} /> Clue
            </button>
          )}
        </div>
        <ol className="mt-5 flex flex-wrap items-center gap-2" aria-label="Word chain">
          {words.map((word, i) => (
            <li key={word} className="flex items-center gap-2">
              {i > 0 && <ArrowRight aria-hidden="true" size={20} className="text-ink/40" />}
              <ChainWord
                word={word}
                highlightFirst={showLinks && i > 0}
                highlightLast={showLinks && i < words.length - 1}
                tone={solved && i === words.length - 1 ? "answer" : "plain"}
              />
            </li>
          ))}
          {!solved && (
            <li className="flex items-center gap-2">
              <ArrowRight aria-hidden="true" size={20} className="text-ink/40" />
              <span className="inline-flex min-h-14 min-w-20 items-center justify-center rounded-2xl border-2 border-dashed border-ink/30 px-4 font-display text-2xl font-bold text-ink/40">?</span>
            </li>
          )}
        </ol>
        {showLinks && !solved && (
          <p className="mt-4 leading-7 text-ink/80">See the yellow letters? Look at where each word ends and where the next one begins.</p>
        )}
      </div>

      {/* Think & choose */}
      <fieldset className="mt-6" disabled={solved}>
        <legend className="font-display text-xl font-bold">Which word comes after {lastWord}?</legend>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {puzzle.options.map(({ word }) => {
            const wasMissed = missed.includes(word);
            const isAnswer = solved && word === puzzle.answer;
            return (
              <button
                key={word}
                onClick={() => choose(word)}
                disabled={wasMissed}
                className={`min-h-16 rounded-2xl border-2 px-4 font-display text-2xl font-bold transition focus-visible:outline focus-visible:outline-4 focus-visible:outline-berry ${
                  isAnswer
                    ? "border-ink bg-leaf text-ink"
                    : wasMissed
                      ? "border-ink/10 bg-ink/5 text-ink/40 line-through"
                      : "border-ink/10 bg-white text-ink hover:border-berry hover:bg-sky active:scale-95 disabled:hover:border-ink/10 disabled:hover:bg-white"
                }`}
              >
                {word}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Feedback & learn */}
      <div className="mt-6" aria-live="polite">
        {!solved && latestMiss && (
          <div className="rounded-2xl bg-coral/15 p-5">
            <p className="font-bold"><span className="capitalize">{latestMiss.word}</span> doesn&apos;t fit. Think again!</p>
            <p className="mt-2 leading-7 text-ink/80">{latestMiss.whyNot}</p>
          </div>
        )}

        {solved && (
          <div className="rounded-2xl bg-leaf/30 p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <Sparkles aria-hidden="true" className="mt-1 shrink-0 text-berry" size={24} />
              <div>
                <p className="font-display text-2xl font-bold">You found the hook!</p>
                <p className="mt-2 leading-7 text-ink/80">
                  <span className="capitalize">{lastWord}</span> ends with <strong>{lastLetter(lastWord)}</strong>, and {puzzle.answer} starts with <strong>{firstLetter(puzzle.answer)}</strong>.
                  You spotted the rule, then used it to test each word. That&apos;s pattern thinking.
                </p>
              </div>
            </div>

            {/* Explain */}
            <div className="mt-6 border-t border-ink/10 pt-5">
              <p className="font-bold">What helped you decide?</p>
              {reflection === null ? (
                <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                  {REFLECTIONS.map(({ id, label }) => (
                    <button
                      key={id}
                      onClick={() => setReflection(id)}
                      className="min-h-12 rounded-2xl border-2 border-ink/10 bg-white px-5 py-2 text-left font-bold transition hover:border-berry focus-visible:outline focus-visible:outline-4 focus-visible:outline-berry"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="mt-2 leading-7 text-ink/80">{reflectionReply(reflection, puzzle)}</p>
              )}
            </div>

            <button
              onClick={() => startPuzzle(isLastPuzzle ? 0 : puzzleIndex + 1)}
              className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-berry px-6 font-bold text-white transition hover:bg-berry/90 focus-visible:outline focus-visible:outline-4 focus-visible:outline-ink active:scale-95"
            >
              {isLastPuzzle ? <><RotateCcw aria-hidden="true" size={18} /> Play again</> : <>Next chain <ArrowRight aria-hidden="true" size={18} /></>}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
