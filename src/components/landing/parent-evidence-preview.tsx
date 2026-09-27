import React from "react";
import { ShieldAlert, CheckCircle2, HeartHandshake, Eye } from "lucide-react";
import { StatusBadge } from "@/components/status-badge";

export function ParentEvidencePreview() {
  return (
    <section aria-labelledby="parent-heading" className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2">
          <p className="inline-flex items-center gap-2 rounded-full bg-berry/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-berry">
            <HeartHandshake className="size-3.5" aria-hidden="true" />
            Parent & Guardian Value
          </p>
          <StatusBadge status="preview" size="sm" />
        </div>
        <h2 id="parent-heading" className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl text-ink">
          Observable learning evidence, not hollow percentage scores.
        </h2>
        <p className="mt-4 text-base sm:text-lg leading-relaxed text-ink/75">
          A report card that says &ldquo;Maths: 82%&rdquo; tells you almost nothing about how your child actually thinks. Below is a synthetic specimen demonstrating the kind of observable activity evidence ThinkLab is designed to capture, without labels or fake IQ metrics.
        </p>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.6fr]">
        {/* Left: What Conventional Apps Show */}
        <div className="flex flex-col justify-between rounded-3xl border border-ink/15 bg-white p-6 sm:p-8 shadow-sm">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-ink/10">
              <span className="text-xs font-bold uppercase tracking-wider text-ink/50">Conventional EdTech Report</span>
              <span className="rounded-full bg-rose-100 text-rose-800 text-[11px] font-bold px-2.5 py-0.5">Static / Opaque</span>
            </div>

            <div className="mt-6 text-center rounded-2xl bg-paper p-6 border border-ink/10">
              <span className="text-xs font-bold uppercase tracking-wider text-ink/60">Weekly Subject Grade</span>
              <p className="mt-3 font-display text-6xl font-black text-ink">82%</p>
              <p className="mt-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">Proficiency: Above Average</p>
            </div>

            <div className="mt-6 space-y-3">
              <div className="rounded-xl border border-ink/10 p-3.5 bg-paper/60 text-xs text-ink/70 space-y-2">
                <p className="flex justify-between"><span>Questions Attempted:</span> <strong className="text-ink">25</strong></p>
                <p className="flex justify-between"><span>Correct Answers:</span> <strong className="text-ink">21 / 25</strong></p>
                <p className="flex justify-between"><span>Speed Percentile:</span> <strong className="text-ink">78th percentile</strong></p>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-rose-50 border border-rose-200 p-4">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-800">
              <ShieldAlert className="size-4 shrink-0" aria-hidden="true" />
              <span>What this leaves completely hidden:</span>
            </div>
            <ul className="mt-2 space-y-1.5 text-xs text-rose-900/80">
              <li>• What specific mental misconception caused the 4 missed questions?</li>
              <li>• Did the child guess or apply a coherent logical strategy?</li>
              <li>• Can they articulate <em>why</em> their answer works under changed constraints?</li>
            </ul>
          </div>
        </div>

        {/* Right: ThinkLab Observable Learning Evidence Card (Synthetic Specimen) */}
        <div className="flex flex-col justify-between rounded-3xl border-2 border-berry/30 bg-gradient-to-b from-white via-sky/10 to-paper p-6 sm:p-8 shadow-soft">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-ink/10">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-berry flex items-center gap-1.5">
                  <Eye className="size-3.5" aria-hidden="true" />
                  Synthetic Specimen · Demonstration Preview
                </span>
                <h3 className="mt-1 font-display text-2xl font-bold text-ink">
                  Zara&apos;s Market Budget Session (Age 7)
                </h3>
              </div>
              <span className="rounded-full bg-sky border border-sky-300 px-3 py-1 text-xs font-bold text-ink">
                Illustrative Preview
              </span>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-ink/10 bg-white p-4 shadow-2xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-berry">Academic Foundation Practised</span>
                <p className="mt-1 text-sm font-bold text-ink">3-Item Multi-Digit Addition & Subtraction</p>
                <p className="mt-1 text-xs text-ink/70">Calculated ₦600 + ₦450 + ₦700 accurately against a ₦2,000 threshold.</p>
              </div>

              <div className="rounded-2xl border border-ink/10 bg-white p-4 shadow-2xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-berry">Approach & Strategy</span>
                <p className="mt-1 text-sm font-bold text-ink">Prioritized Protein First, Then Staples</p>
                <p className="mt-1 text-xs text-ink/70">Locked in the smoked fish, then balanced remaining allowance across vegetables.</p>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="rounded-2xl border border-ink/10 bg-white p-4 shadow-2xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Observed Reasoning Example</span>
                <p className="mt-1 text-sm leading-relaxed text-ink/85">
                  &ldquo;When tomato prices surged by ₦150, Zara compared two distinct alternative items before making her decision rather than abandoning the budget.&rdquo;
                </p>
              </div>

              <div className="rounded-2xl border border-ink/10 bg-white p-4 shadow-2xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">Articulated Explanation Example</span>
                <p className="mt-1 text-sm leading-relaxed text-ink/85">
                  &ldquo;She initially needed help explaining why she subtracted the total cost from her budget. With a guided prompt, she stated: &lsquo;I must keep ₦200 safe for bus fare so I do not walk in the sun.&rsquo;&rdquo;
                </p>
              </div>

              <div className="rounded-2xl border border-leaf/60 bg-leaf/20 p-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-900">Recommended Next Experience</span>
                <p className="mt-1 text-sm font-bold text-ink">
                  Practise finding multiple valid item combinations within a fixed budget boundary.
                </p>
                <p className="mt-0.5 text-xs text-ink/75">
                  Targeted next mission: explore combinations with ₦3,000 allowance and 4 items.
                </p>
              </div>
            </div>
          </div>

          {/* Child-Safety & Anti-Labeling Guarantee */}
          <div className="mt-6 border-t border-ink/10 pt-4 flex items-center justify-between gap-3 text-xs text-ink/70">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-emerald-600 shrink-0" aria-hidden="true" />
              <span><strong>Our Ethical AI Commitment:</strong> No IQ scores, no &ldquo;gifted&rdquo; or &ldquo;weak&rdquo; labels, and no permanent ability classifications. Observations are contextual, time-bounded, and specific.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
