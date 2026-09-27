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
              Operational in Current Code
            </p>

            <ul className="mt-4 space-y-3 text-sm text-ink/85">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <strong className="text-ink">Zara Adaptive Mission Generation:</strong>
                  <p className="text-xs text-ink/70 mt-0.5">A server-side learning provider creates structured, age-appropriate market dilemmas with validated schemas and a local fallback.</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <strong className="text-ink">Tobi Robot Sequencing:</strong>
                  <p className="text-xs text-ink/70 mt-0.5">Deterministic instruction sequencing game where normal code validates instructions to reach the star without AI hallucinations.</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <strong className="text-ink">Synthetic Learner Profiles:</strong>
                  <p className="text-xs text-ink/70 mt-0.5">5 local mock profiles (Ages 4–11) to test developmental interactions without collecting real children&apos;s data.</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <strong className="text-ink">Learner Hub Navigation:</strong>
                  <p className="text-xs text-ink/70 mt-0.5">Mobile-first Next.js App Router experience with accessible touch targets across learners and worlds.</p>
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
              Active Prototype & Specimen Previews
            </p>

            <ul className="mt-4 space-y-3 text-sm text-ink/85">
              <li className="flex items-start gap-2.5">
                <Eye className="size-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <strong className="text-ink">Synthetic Parent Preview:</strong>
                  <p className="text-xs text-ink/70 mt-0.5">Static specimen demonstrating observable learning evidence rather than opaque percentage grades.</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Eye className="size-4 text-berry shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <strong className="text-ink">Synthetic Learning Evidence Model:</strong>
                  <p className="text-xs text-ink/70 mt-0.5">Documented architecture for capturing reasoning, strategy, and next steps without permanent ability labels.</p>
                </div>
              </li>
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
                  <p className="text-xs text-ink/70 mt-0.5">Scrabble-inspired tile mechanics and narrative comprehension concepts.</p>
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
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-sky-200">
            <span className="block text-center text-xs font-semibold text-ink/60">
              Concepts and mock demonstrations in /learners
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
              Future Engineering Phases
            </p>

            <ul className="mt-4 space-y-3 text-sm text-ink/80">
              <li className="flex items-start gap-2.5">
                <Clock className="size-4 text-stone-500 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <strong className="text-ink">Collaborative Team Challenges:</strong>
                  <p className="text-xs text-stone-600 mt-0.5">Peer collaboration and optional team problem-solving challenges.</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="size-4 text-stone-500 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <strong className="text-ink">Guardian Controls & Production Accounts:</strong>
                  <p className="text-xs text-stone-600 mt-0.5">Guardian governance, verified authentication, and strict privacy design required before production.</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="size-4 text-stone-500 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <strong className="text-ink">Voice & African Languages:</strong>
                  <p className="text-xs text-stone-600 mt-0.5">Speech interaction in Yoruba, Hausa, Igbo, and Nigerian Pidgin for early learners.</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="size-4 text-stone-500 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <strong className="text-ink">Offline & Low-Data Support:</strong>
                  <p className="text-xs text-stone-600 mt-0.5">Local caching and bandwidth minimization for intermittent connectivity.</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="size-4 text-stone-500 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <strong className="text-ink">Multimodal Sketch & Artifact Analysis:</strong>
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
