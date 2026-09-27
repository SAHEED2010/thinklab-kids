"use client";

import { useState } from "react";
import { Check, RotateCcw } from "lucide-react";

const correctOrder = ["Forward", "Forward", "Turn right"];

export function LogicGame() {
  const [steps, setSteps] = useState<string[]>([]);
  const isComplete = steps.length === correctOrder.length && steps.every((step, index) => step === correctOrder[index]);
  function addStep(step: string) {
    if (steps.length < correctOrder.length) setSteps((current) => [...current, step]);
  }

  return (
    <section className="rounded-3xl border border-ink/10 bg-white p-5 shadow-soft sm:p-7" aria-labelledby="logic-heading">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-berry">Functional mini game</p>
      <h2 id="logic-heading" className="mt-1 font-display text-2xl font-bold">Help Tobi guide the robot</h2>
      <p className="mt-3 leading-7 text-ink/70">Choose three instructions to reach the blue star. Deterministic game rules stay in normal code.</p>
      <div className="mt-6 rounded-2xl bg-sky p-4"><p className="text-sm font-bold">Your program</p><div className="mt-3 flex min-h-12 flex-wrap gap-2">{steps.length ? steps.map((step, index) => <span key={step + "-" + index} className="rounded-full bg-white px-3 py-2 text-sm font-bold">{index + 1}. {step}</span>) : <span className="text-sm text-ink/60">Choose an instruction below.</span>}</div></div>
      <div className="mt-5 flex flex-wrap gap-3">
        {["Forward", "Turn right"].map((step) => <button key={step} type="button" onClick={() => addStep(step)} disabled={steps.length >= correctOrder.length || isComplete} className="min-h-12 rounded-full border-2 border-ink/15 px-4 font-bold hover:border-berry disabled:opacity-50 focus-visible:outline focus-visible:outline-4 focus-visible:outline-berry">{step}</button>)}
        <button type="button" onClick={() => setSteps([])} className="inline-flex min-h-12 items-center gap-2 rounded-full px-4 font-bold text-berry hover:bg-sky focus-visible:outline focus-visible:outline-4 focus-visible:outline-berry"><RotateCcw aria-hidden="true" size={17} /> Reset</button>
      </div>
      {isComplete && <p className="mt-5 flex items-center gap-2 font-bold text-berry"><Check aria-hidden="true" size={19} /> Robot reached the star!</p>}
    </section>
  );
}
