import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Eye, Clock, ShieldCheck } from "lucide-react";
import { StatusBadge } from "@/components/status-badge";

export function StatusMatrix() {
  return (
    <section aria-labelledby="status-heading" className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
      <div className="text-center max-w-3xl mx-auto">
        <p className="inline-flex items-center gap-2 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em]">
          <ShieldCheck className="size-3.5" aria-hidden="true" />
          Honest Product Transparency
        </p>
        <h2 id="status-heading" className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl text-ink">
          What works right now, what is previewed, and what comes next.
        </h2>
        <p className="mt-4 text-base sm:text-lg leading-relaxed text-ink/75">
          We never disguise prototypes as finished software. Here is the exact status of the ThinkLab platform for judges, educators, and parents.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {/* Column 1: LIVE */}
        <div className="flex flex-col justify-between rounded-3xl border-2 border-emerald-300 bg-emerald-50/40 p-6 sm:p-7 shadow-sm">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-emerald-200">
              <StatusBadge status="live" />
              <span className="text-xs font-semibold text-emerald-800">Current Hackathon Build</span>
            </div>

            <p className="mt-4 text-xs font-bold uppercase tracking-wider text-emerald-900">
              Interactive & Testable Today
            </p>

            <ul className="mt-4 space-y-3 text-sm text-ink/85">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <strong className="text-ink">Zara Market / Life Mission:</strong>
                  <p className="text-xs text-ink/70 mt-0.5">Adaptive shopping dilemma, server-side AI evaluation & explanation feedback.</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <strong className="text-ink">Tobi Robot Coding Logic:</strong>
                  <p className="text-xs text-ink/70 mt-0.5">Deterministic grid sequencing, obstacle navigation, and execution runner.</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <strong className="text-ink">Learning Evidence Logging:</strong>
                  <p className="text-xs text-ink/70 mt-0.5">Real-time session capture of strategies, reasoning, and child explanations.</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <strong className="text-ink">Synthetic Parent Preview:</strong>
                  <p className="text-xs text-ink/70 mt-0.5">Observable progress cards with ethical, non-stigmatizing observation language.</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <strong className="text-ink">Learner Journey Hub:</strong>
                  <p className="text-xs text-ink/70 mt-0.5">5 distinct developmental profiles across ages 4–11 with safe local mock state.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-emerald-200">
            <Link
              href="/learners"
              className="flex items-center justify-between rounded-xl bg-ink px-4 py-2.5 text-xs font-bold text-white hover:bg-berry transition"
            >
              <span>Test Live Experiences</span>
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Column 2: PREVIEW */}
        <div className="flex flex-col justify-between rounded-3xl border border-sky-300 bg-sky/30 p-6 sm:p-7 shadow-sm">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-sky-200">
              <StatusBadge status="preview" />
              <span className="text-xs font-semibold text-ink/70">Concept & Architecture</span>
            </div>

            <p className="mt-4 text-xs font-bold uppercase tracking-wider text-berry">
              Active Prototype Directions
            </p>

            <ul className="mt-4 space-y-3 text-sm text-ink/85">
              <li className="flex items-start gap-2.5">
                <Eye className="size-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <strong className="text-ink">Strategy Arena & Puzzles:</strong>
                  <p className="text-xs text-ink/70 mt-0.5">Chess, X-and-O, and consequence planning mechanics modeled for David (Age 9).</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Eye className="size-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <strong className="text-ink">Word Arena & Story Studio:</strong>
                  <p className="text-xs text-ink/70 mt-0.5">Scrabble-inspired tile mechanics and narrative comprehension challenges.</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Eye className="size-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <strong className="text-ink">Discovery Lab & Wonder Engine:</strong>
                  <p className="text-xs text-ink/70 mt-0.5">Science prediction sandboxes and child-led curiosity inquiry loops.</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Eye className="size-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <strong className="text-ink">Ages 12–14 Launch Experiences:</strong>
                  <p className="text-xs text-ink/70 mt-0.5">Extended independent project briefs, debate formats, and portfolio structures.</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Eye className="size-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <strong className="text-ink">Challenge Arena & Daily Problems:</strong>
                  <p className="text-xs text-ink/70 mt-0.5">Multi-criteria rubrics rewarding depth, creativity, and reasoning over speed.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-sky-200">
            <span className="block text-center text-xs font-semibold text-ink/60">
              Interactive demonstrations available in /learners
            </span>
          </div>
        </div>

        {/* Column 3: COMING SOON */}
        <div className="flex flex-col justify-between rounded-3xl border border-stone-200 bg-stone-50 p-6 sm:p-7 shadow-sm">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <StatusBadge status="coming-soon" />
              <span className="text-xs font-semibold text-stone-500">Longer-Term Roadmap</span>
            </div>

            <p className="mt-4 text-xs font-bold uppercase tracking-wider text-stone-600">
              Production Scaling & Infrastructure
            </p>

            <ul className="mt-4 space-y-3 text-sm text-ink/80">
              <li className="flex items-start gap-2.5">
                <Clock className="size-4 text-stone-500 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <strong className="text-ink">Real Multiplayer & Team Challenges:</strong>
                  <p className="text-xs text-stone-600 mt-0.5">Synchronous peer collaboration and school-vs-school strategy leagues.</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="size-4 text-stone-500 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <strong className="text-ink">Child Accounts & Guardian Consent:</strong>
                  <p className="text-xs text-stone-600 mt-0.5">GDPR/NDPR-compliant guardian governance, verified auth, and data privacy.</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="size-4 text-stone-500 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <strong className="text-ink">Voice & African Languages:</strong>
                  <p className="text-xs text-stone-600 mt-0.5">Speech interaction in Yoruba, Hausa, Igbo, and Nigerian Pidgin for ages 4–5.</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="size-4 text-stone-500 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <strong className="text-ink">Low-Bandwidth Offline Sync:</strong>
                  <p className="text-xs text-stone-600 mt-0.5">Local SQLite caching for uninterrupted learning during power and network outages.</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="size-4 text-stone-500 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <strong className="text-ink">Multimodal Sketch & Photo Analysis:</strong>
                  <p className="text-xs text-stone-600 mt-0.5">Photographing paper drawings and physical builds to explain their design.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-stone-200">
            <span className="block text-center text-xs font-semibold text-stone-500">
              Planned for subsequent engineering phases
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
