"use client";

import { useState } from "react";
import { RotateCcw, Sparkles, HelpCircle } from "lucide-react";

// --- Game Constants ---
interface Challenge {
  question: string;
  options: string[];
  correctIndex: number;
  category: string;
  explanation: string;
  hint: string;
}

const CHALLENGE: Challenge = {
  question: "Which one does not belong with the others?",
  options: ["Apple", "Banana", "Orange", "Car"],
  correctIndex: 3,
  category: "Fruits",
  explanation: "Apples, Bananas, and Oranges are all delicious fruits. A car is something we use to travel!",
  hint: "Think about what you can eat. Is there something here you can't eat?",
};

type GameStatus = 'playing' | 'feedback' | 'success';

export function StrategyArena() {
  // --- State ---
  const [status, setStatus] = useState<GameStatus>('playing');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showReflection, setShowReflection] = useState(false);
  const [reflectionText, setReflectionText] = useState("");

  // --- Game Logic ---
  const handleChoice = (index: number) => {
    if (status === 'success') return;

    setSelectedOption(index);
    if (index === CHALLENGE.correctIndex) {
      setStatus('success');
    } else {
      setStatus('feedback');
    }
  };

  const resetGame = () => {
    setStatus('playing');
    setSelectedOption(null);
    setShowReflection(false);
    setReflectionText("");
  };

  return (
    <section className="rounded-3xl border border-ink/10 bg-white p-5 shadow-soft sm:p-8" aria-labelledby="strategy-heading">
      <div className="mb-8">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-berry">Reasoning & Patterns</p>
        <h2 id="strategy-heading" className="mt-1 font-display text-3xl font-bold">Strategy Arena</h2>
        <p className="mt-2 leading-7 text-ink/70">Use your thinking powers to solve the challenge!</p>
      </div>

      <div className="flex flex-col gap-8">
        {/* Challenge Area */}
        <div className="rounded-3xl bg-paper p-6 border-2 border-ink/5">
          <h3 className="text-xl font-display font-bold text-center mb-6">{CHALLENGE.question}</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CHALLENGE.options.map((option, idx) => (
              <button
                key={option}
                onClick={() => handleChoice(idx)}
                disabled={status === 'success'}
                className={`min-h-16 rounded-2xl px-6 font-bold transition-all border-2 text-lg flex items-center justify-center ${
                  selectedOption === idx
                    ? (idx === CHALLENGE.correctIndex ? 'bg-leaf border-leaf text-white' : 'bg-coral/20 border-coral text-coral')
                    : 'bg-white border-ink/10 text-ink hover:border-berry hover:bg-sky active:scale-95'
                } disabled:opacity-60`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Feedback Area */}
        <div className="min-h-[100px]">
          {status === 'feedback' && (
            <div className="rounded-2xl bg-coral/10 p-5 border-l-4 border-coral animate-in fade-in slide-in-from-top-2">
              <div className="flex items-start gap-3">
                <HelpCircle className="text-coral shrink-0" size={24} />
                <div>
                  <p className="font-bold text-coral">Not quite yet!</p>
                  <p className="mt-1 text-ink/70 leading-6">{CHALLENGE.hint}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedOption(null)}
                className="mt-4 text-sm font-bold text-berry hover:underline flex items-center gap-1"
              >
                <RotateCcw size={14} /> Try another choice
              </button>
            </div>
          )}

          {status === 'success' && (
            <div className="rounded-2xl bg-leaf/10 p-6 border-l-4 border-leaf animate-in fade-in zoom-in duration-300">
              <div className="flex items-start gap-3">
                <Sparkles className="text-leaf shrink-0" size={24} />
                <div>
                  <p className="font-bold text-leaf text-xl">You spotted the pattern!</p>
                  <p className="mt-2 text-ink/80 leading-7">{CHALLENGE.explanation}</p>
                  <p className="mt-3 font-bold text-berry">That&apos;s strong reasoning!</p>
                </div>
              </div>

              {/* Reflection Step */}
              {!showReflection ? (
                <div className="mt-6 pt-6 border-t border-leaf/20">
                  <p className="text-sm font-bold text-ink/60 mb-3">What helped you decide?</p>
                  <button
                    onClick={() => setShowReflection(true)}
                    className="min-h-12 rounded-full bg-berry px-6 font-bold text-white hover:bg-berry/90 transition-all active:scale-95"
                  >
                    I want to explain!
                  </button>
                </div>
              ) : (
                <div className="mt-6 pt-6 border-t border-leaf/20">
                  <textarea
                    value={reflectionText}
                    onChange={(e) => setReflectionText(e.target.value)}
                    placeholder="Type your thinking here..."
                    className="w-full rounded-2xl border-2 border-ink/10 p-4 text-ink focus:border-berry outline-none transition-all"
                    rows={3}
                  />
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={resetGame}
                      className="min-h-12 rounded-full bg-berry px-6 font-bold text-white hover:bg-berry/90 transition-all active:scale-95"
                    >
                      Done!
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Global Reset */}
        {status !== 'playing' && (
          <div className="flex justify-center">
            <button
              onClick={resetGame}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold text-ink/40 hover:text-ink transition-colors"
            >
              <RotateCcw size={16} /> Start Over
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
