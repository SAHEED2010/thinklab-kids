"use client";

import React, { useState } from "react";
import { CheckCircle2, MessageSquare, Sparkles } from "lucide-react";

export function ExerciseComparison() {
  const [scenarioState, setScenarioState] = useState<"standard" | "price-surge">("standard");

  return (
    <section aria-labelledby="comparison-heading" className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
      <div className="text-center max-w-3xl mx-auto">
        <p className="inline-flex items-center gap-2 rounded-full bg-mango/40 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-ink">
          <Sparkles className="size-3.5 text-berry" aria-hidden="true" />
          The ThinkLab Difference
        </p>
        <h2 id="comparison-heading" className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl text-ink">
          Same core arithmetic. A completely different depth of mind.
        </h2>
        <p className="mt-4 text-base sm:text-lg leading-relaxed text-ink/75">
          Conventional worksheets test recall and calculation in isolation. ThinkLab embeds the exact same academic foundations inside living context, real decisions, constraint trade-offs, and verbal reasoning.
        </p>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        {/* Left: Conventional Exercise */}
        <div className="flex flex-col justify-between rounded-3xl border border-ink/15 bg-white p-6 sm:p-8 shadow-sm">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-ink/10">
              <span className="text-xs font-bold uppercase tracking-wider text-ink/60">Conventional Classroom Worksheet</span>
              <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-600">Recall & Calculation</span>
            </div>

            <div className="mt-8 rounded-2xl bg-paper p-6 border border-ink/10">
              <p className="text-xs font-bold uppercase tracking-wider text-ink/50">Exercise 4B</p>
              <p className="mt-4 font-display text-2xl font-bold text-ink sm:text-3xl">
                ₦2,000 − ₦1,250 = <span className="inline-block border-b-2 border-dashed border-ink/40 w-24 text-center text-berry">750</span>
              </p>
              <p className="mt-4 text-xs text-ink/60 italic">Calculate the remainder and write your answer in the box provided.</p>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-3 rounded-xl bg-emerald-50 p-3.5 text-emerald-900 border border-emerald-200">
                <CheckCircle2 className="size-5 shrink-0 text-emerald-600 mt-0.5" aria-hidden="true" />
                <div className="text-sm">
                  <p className="font-bold">Result: ₦750 (Marked Correct)</p>
                  <p className="text-emerald-800 text-xs mt-0.5">The child completed the vertical subtraction algorithm.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-ink/10 pt-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-ink/60">What this validates</h3>
            <ul className="mt-3 space-y-2 text-sm text-ink/75">
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-stone-400" />
                Verifies computational fluency with 4-digit subtraction.
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-stone-400" />
                Single pre-printed correct answer with zero ambiguity.
              </li>
              <li className="flex items-center gap-2 text-ink/50 italic">
                <span className="size-1.5 rounded-full bg-stone-300" />
                Does not reveal how the child reasons, chooses, or adapts under real constraints.
              </li>
            </ul>
          </div>
        </div>

        {/* Right: ThinkLab Mission */}
        <div className="flex flex-col justify-between rounded-3xl border-2 border-berry/30 bg-gradient-to-b from-sky/40 to-white p-6 sm:p-8 shadow-soft">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-berry/20">
              <span className="text-xs font-bold uppercase tracking-wider text-berry">ThinkLab Mission · Balogun Market</span>
              <span className="rounded-full bg-emerald-100 border border-emerald-300 px-3 py-1 text-xs font-bold text-emerald-900">
                Knowledge + Choice + Explanation
              </span>
            </div>

            <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm border border-berry/15">
              <div className="flex items-center justify-between text-xs font-bold text-ink/60">
                <span>Zara’s Mission (Age 7)</span>
                <span className="rounded-full bg-mango/50 px-2.5 py-0.5 text-ink font-bold">Budget: ₦2,000</span>
              </div>
              
              <p className="mt-3 font-display text-lg font-bold text-ink">
                &ldquo;Zara is sent to Balogun Market with ₦2,000 to buy items for a nutritious family meal. How should she allocate her budget?&rdquo;
              </p>

              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-xl border border-ink/10 bg-paper p-2.5">
                  <p className="font-bold text-ink">Cassava Flour (Garri)</p>
                  <p className="text-berry font-bold mt-1">₦600</p>
                </div>
                <div className="rounded-xl border border-ink/10 bg-paper p-2.5">
                  <p className="font-bold text-ink">Smoked Fish (Protein)</p>
                  <p className="text-berry font-bold mt-1">₦700</p>
                </div>
                <div className={`rounded-xl border p-2.5 transition ${scenarioState === "price-surge" ? "border-coral bg-coral/10" : "border-ink/10 bg-paper"}`}>
                  <p className="font-bold text-ink">Fresh Tomatoes</p>
                  <p className="text-berry font-bold mt-1">
                    {scenarioState === "price-surge" ? (
                      <span><span className="line-through text-ink/40 mr-1.5">₦450</span><span className="text-coral">₦600 (Price Shift)</span></span>
                    ) : "₦450"}
                  </p>
                </div>
                <div className="rounded-xl border border-ink/10 bg-paper p-2.5">
                  <p className="font-bold text-ink">Ripe Plantains</p>
                  <p className="text-berry font-bold mt-1">₦500</p>
                </div>
              </div>

              {/* Dynamic toggle to simulate what happens during an adaptive mission */}
              <div className="mt-4 pt-3 border-t border-ink/10 flex items-center justify-between">
                <span className="text-xs text-ink/70">Simulate market shift:</span>
                <button
                  type="button"
                  onClick={() => setScenarioState(s => s === "standard" ? "price-surge" : "standard")}
                  className="rounded-lg bg-berry/10 px-3 py-1.5 text-xs font-bold text-berry hover:bg-berry hover:text-white transition"
                >
                  {scenarioState === "standard" ? "Introduce Price Increase (+₦150)" : "Reset to Standard Scenario"}
                </button>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <div className="rounded-xl bg-berry/5 p-4 border border-berry/20">
                <div className="flex items-center gap-2 text-xs font-bold text-berry">
                  <MessageSquare className="size-4" aria-hidden="true" />
                  <span>Observed Child Reasoning:</span>
                </div>
                <p className="mt-1.5 text-sm italic text-ink/85">
                  {scenarioState === "standard"
                    ? "“I chose Garri (₦600), Smoked Fish (₦700), and Tomatoes (₦450). Total is ₦1,750. ₦2,000 − ₦1,750 = ₦250 left so Zara has bus fare home.”"
                    : "“Because tomatoes jumped to ₦600, total became ₦1,900. Zara only has ₦100 left. I swapped for plantains to keep a ₦200 safety buffer.”"}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-berry/20 pt-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-berry">What ThinkLab develops</h3>
            <ul className="mt-3 space-y-2 text-sm text-ink/85">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-600 shrink-0" aria-hidden="true" />
                <span><strong>Multi-digit arithmetic</strong> anchored in concrete practical purpose.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-600 shrink-0" aria-hidden="true" />
                <span><strong>Constraint reasoning</strong>: balancing nutrition, budget, and transportation reserves.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-600 shrink-0" aria-hidden="true" />
                <span><strong>Verbal explanation</strong>: articulating <em>why</em> a decision was made.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-mango/20 border border-mango/40 p-4 sm:p-5 text-center max-w-3xl mx-auto">
        <p className="text-xs sm:text-sm font-semibold text-ink">
          <strong className="text-berry font-bold">The Golden Rule:</strong> Ordinary maths exercises are not bad—computation practice is essential. ThinkLab simply provides the critical companion layer: <span className="underline decoration-berry decoration-2">Knowledge + Context + Choice + Reasoning + Explanation</span>.
        </p>
      </div>
    </section>
  );
}
