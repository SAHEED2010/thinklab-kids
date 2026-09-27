import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Layers,
  ArrowRight,
  Volume2,
  CheckCircle2,
} from "lucide-react";
import { ProductSubNav } from "@/components/product/product-sub-nav";
import { StatusBadge } from "@/components/status-badge";

export const metadata: Metadata = {
  title: "Ages 4–14 · The Developmental Continuum",
  description:
    "How ThinkLab Kids grows with African children from ages 4 through 14: four developmental stages across canonical learning worlds.",
};

interface DevelopmentalStage {
  id: string;
  range: string;
  agencyMotto: string;
  title: string;
  badge: "live" | "preview" | "coming-soon";
  statusText: string;
  themeColor: string;
  borderAccent: string;
  summary: string;
  primaryInteractions: string[];
  keyCapabilities: string[];
  canonicalWorlds: string[];
  sampleExperience: {
    title: string;
    learner: string;
    description: string;
  };
}

const developmentalStages: DevelopmentalStage[] = [
  {
    id: "stage-1",
    range: "Ages 4–5",
    agencyMotto: "“I explore.”",
    title: "Stage 1: Sensory Discovery & Foundational Patterns",
    badge: "preview",
    statusText: "Preview Specification",
    themeColor: "from-mango/20 via-white to-paper",
    borderAccent: "border-mango/60",
    summary:
      "Concrete, playful interactions focused on noticing patterns, quantities, and cause-and-effect. Driven by touch, guided visuals, and audio prompts with minimal keyboard typing.",
    primaryInteractions: [
      "Listen & respond",
      "Tap & drag matching",
      "Count objects in sets of 2–5",
      "Identify footprint tracks",
      "Visual pattern sequencing",
      "Imaginative story response",
    ],
    keyCapabilities: [
      "Early 1-to-1 correspondence counting",
      "Spatial orientation and shape intuition",
      "Expressive verbal description",
      "Curiosity and noticing changes",
    ],
    canonicalWorlds: ["Number Lab", "Story Studio", "Wonder"],
    sampleExperience: {
      title: "Animal Tracks & Counting Parade",
      learner: "Amara (Age 4)",
      description:
        "Match animal sounds to visual footprints, count bird wings in sets of two, and describe what changed when tracks diverge.",
    },
  },
  {
    id: "stage-2",
    range: "Ages 6–8",
    agencyMotto: "“I try and explain.”",
    title: "Stage 2: Applied Foundations & Deterministic Logic",
    badge: "live",
    statusText: "Functional Live Slice",
    themeColor: "from-sky/30 via-white to-paper",
    borderAccent: "border-sky-400",
    summary:
      "Transitioning from recognition into application and explanation. Children use real-world African missions for arithmetic and deterministic grids for computational thinking.",
    primaryInteractions: [
      "Real-world budgeting missions",
      "Ordered sequence programming",
      "Verbal explanation capture",
      "Multi-digit arithmetic trade-offs",
      "Boundary collision debugging",
      "Simple defensive strategy",
    ],
    keyCapabilities: [
      "Applied currency addition and subtraction",
      "Sequential logic and ordinal command ordering",
      "Explaining reasoning behind decisions",
      "Cognitive flexibility when constraints shift",
    ],
    canonicalWorlds: ["Life Missions", "Code Quest", "Number Lab"],
    sampleExperience: {
      title: "Balogun Market & Robot Star Navigation",
      learner: "Zara (Age 7) & Tobi (Age 6)",
      description:
        "Zara manages food trade-offs with ₦2,000 allowance, while Tobi programs deterministic robot movements on a 5×5 obstacle grid.",
    },
  },
  {
    id: "stage-3",
    range: "Ages 9–11",
    agencyMotto: "“I investigate and challenge.”",
    title: "Stage 3: Strategic Planning & Open-Ended Dilemmas",
    badge: "preview",
    statusText: "Preview Specification",
    themeColor: "from-leaf/20 via-white to-paper",
    borderAccent: "border-leaf",
    summary:
      "Multi-step consequence mapping, scientific modeling, and collaborative design challenges. Children compare competing alternatives and navigate ambiguity.",
    primaryInteractions: [
      "2-to-3 move tactical consequence mapping",
      "Energy & resource allocation simulations",
      "Hypothesis testing under changing weather",
      "Structured debate and justification",
      "Community infrastructure challenges",
    ],
    keyCapabilities: [
      "Conditional if-then tactical reasoning",
      "Scientific prediction and energy calculations",
      "Financial budgeting across competing priorities",
      "Communicating trade-offs under uncertainty",
    ],
    canonicalWorlds: ["Strategy Arena", "Discovery Lab", "Creator Studio", "Word Arena", "Projects"],
    sampleExperience: {
      title: "Solar Microgrid & Tactical Defense",
      learner: "David (Age 9) & Favour (Age 11)",
      description:
        "David balances center control in tactical board puzzles, while Favour models community solar storage for clinic vaccine refrigeration during overcast rains.",
    },
  },
  {
    id: "stage-4",
    range: "Ages 12–14",
    agencyMotto: "“I build, lead, and launch.”",
    title: "Stage 4: Systems Building & Independent Projects",
    badge: "coming-soon",
    statusText: "Product Vision",
    themeColor: "from-berry/15 via-white to-paper",
    borderAccent: "border-berry/40",
    summary:
      "Adolescent agency, independent research, computational systems architecture, entrepreneurship modeling, and portfolio-scale project creation.",
    primaryInteractions: [
      "Multi-week project investigations",
      "Systems architecture simulations",
      "Civic enterprise modeling",
      "Evidence-backed formal debate",
      "Peer code and design reviews",
      "Portfolio project publishing",
    ],
    keyCapabilities: [
      "Complex systems thinking and trade-off analysis",
      "Entrepreneurial financial sustainability",
      "Collaborative project leadership",
      "Critical evaluation of empirical research",
    ],
    canonicalWorlds: ["Projects", "Creator Studio", "Discovery Lab"],
    sampleExperience: {
      title: "Municipal Route Optimization & Civic Brief",
      learner: "Senior Learner Cohort",
      description:
        "Model municipal waste-collection logistics for a local council ward, simulate diesel and labor overheads, and publish an evidence brief.",
    },
  },
];

export default function AgesPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-10 sm:py-16">
      {/* Product Sub-Navigation */}
      <ProductSubNav currentPath="/ages" />

      {/* Hero Header */}
      <header className="max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-berry/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-berry">
          <Layers className="size-3.5" aria-hidden="true" />
          The Developmental Continuum
        </div>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-ink leading-[1.1]">
          One continuous learning world from age 4 to age 14.
        </h1>
        <p className="mt-5 text-lg sm:text-xl leading-relaxed text-ink/80">
          ThinkLab is not four disconnected apps. It is a single developmental progression designed to evolve alongside a child&apos;s growing independence—shifting from sensory exploration to articulated reasoning, strategic investigation, and independent creation.
        </p>
      </header>

      {/* Agency Motto Banner */}
      <section aria-labelledby="progression-heading" className="mt-12 rounded-3xl border border-ink/10 bg-white p-6 sm:p-8 shadow-sm">
        <h2 id="progression-heading" className="text-xs font-bold uppercase tracking-wider text-berry">
          The Learner Agency Progression
        </h2>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="rounded-2xl bg-paper p-4 border border-ink/10">
            <span className="text-xs font-bold text-ink/50 uppercase">Ages 4–5</span>
            <p className="mt-1 font-display text-xl font-black text-ink">“I explore.”</p>
            <p className="mt-1 text-xs text-ink/70">Sensory patterns & rhythm</p>
          </div>
          <div className="rounded-2xl bg-sky/30 p-4 border border-sky-300">
            <span className="text-xs font-bold text-sky-900 uppercase">Ages 6–8</span>
            <p className="mt-1 font-display text-xl font-black text-ink">“I try & explain.”</p>
            <p className="mt-1 text-xs text-ink/70">Applied math & coding logic</p>
          </div>
          <div className="rounded-2xl bg-leaf/25 p-4 border border-leaf">
            <span className="text-xs font-bold text-emerald-900 uppercase">Ages 9–11</span>
            <p className="mt-1 font-display text-xl font-black text-ink">“I investigate.”</p>
            <p className="mt-1 text-xs text-ink/70">Strategy & open problems</p>
          </div>
          <div className="rounded-2xl bg-berry/10 p-4 border border-berry/30">
            <span className="text-xs font-bold text-berry uppercase">Ages 12–14</span>
            <p className="mt-1 font-display text-xl font-black text-ink">“I build & launch.”</p>
            <p className="mt-1 text-xs text-ink/70">Projects & systems leadership</p>
          </div>
        </div>
      </section>

      {/* Stage-by-Stage Deep Dive */}
      <section aria-label="Developmental stages deep dive" className="mt-12 sm:mt-16 space-y-8">
        {developmentalStages.map((stage) => (
          <article
            key={stage.id}
            className={`rounded-3xl border-2 ${stage.borderAccent} bg-gradient-to-b ${stage.themeColor} p-6 sm:p-9 shadow-soft`}
          >
            {/* Stage Header */}
            <div className="flex flex-wrap items-start justify-between gap-3 pb-5 border-b border-ink/10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-ink text-white px-3 py-0.5 text-xs font-bold">
                    {stage.range}
                  </span>
                  <span className="font-display text-lg font-bold text-ink italic">
                    {stage.agencyMotto}
                  </span>
                </div>
                <h3 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-ink">
                  {stage.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <StatusBadge status={stage.badge} size="md" />
              </div>
            </div>

            {/* Summary */}
            <p className="mt-5 text-sm sm:text-base leading-relaxed text-ink/80">
              {stage.summary}
            </p>

            {/* Grid: Interactions, Capabilities, Canonical Worlds */}
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {/* Interactions */}
              <div className="rounded-2xl bg-white/90 border border-ink/10 p-4 shadow-2xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-berry block">
                  Primary Interactions
                </span>
                <ul className="mt-2 space-y-1.5 text-xs text-ink/75">
                  {stage.primaryInteractions.map((act) => (
                    <li key={act} className="flex items-start gap-1.5">
                      <span className="size-1.5 rounded-full bg-berry shrink-0 mt-1.5" />
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Capabilities */}
              <div className="rounded-2xl bg-white/90 border border-ink/10 p-4 shadow-2xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block">
                  Cognitive Capabilities
                </span>
                <ul className="mt-2 space-y-1.5 text-xs text-ink/75">
                  {stage.keyCapabilities.map((cap) => (
                    <li key={cap} className="flex items-start gap-1.5">
                      <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Canonical Worlds & Sample */}
              <div className="rounded-2xl bg-white/90 border border-ink/10 p-4 shadow-2xs sm:col-span-2 lg:col-span-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-ink/60 block">
                    Canonical ThinkLab Worlds
                  </span>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {stage.canonicalWorlds.map((world) => (
                      <span
                        key={world}
                        className="rounded-lg bg-paper border border-ink/15 px-2 py-0.5 text-[11px] font-bold text-ink"
                      >
                        {world}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-ink/10">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-ink/50 block">
                    Sample Mission
                  </span>
                  <p className="mt-1 text-xs font-bold text-ink">{stage.sampleExperience.title}</p>
                  <p className="text-[11px] text-ink/70 leading-relaxed mt-0.5">
                    {stage.sampleExperience.description}
                  </p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Technology & Voice Honesty Section */}
      <section
        aria-labelledby="voice-honesty-heading"
        className="mt-12 sm:mt-16 rounded-3xl border border-sky-300 bg-sky/35 p-6 sm:p-8"
      >
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink/80">
          <Volume2 className="size-4 text-berry shrink-0" aria-hidden="true" />
          <span>Technology & Accessibility Transparency</span>
        </div>
        <h2 id="voice-honesty-heading" className="mt-2 font-display text-xl sm:text-2xl font-bold text-ink">
          Voice recognition is an active research area—not live in this MVP.
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink/80">
          While early-childhood learning (Ages 4–5) strongly benefits from spoken interaction, production-grade African dialect voice recognition requires rigorous acoustic modeling, safety guards, and offline latency benchmarks. In our current hackathon prototype, Amara and early missions are structured as interactive click and tap demonstrations. We do not claim live speech evaluation.
        </p>
      </section>

      {/* Canonical Worlds Reference Grid */}
      <section aria-labelledby="worlds-directory-heading" className="mt-12 sm:mt-16 rounded-3xl border border-ink/10 bg-white p-6 sm:p-9 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-ink/10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-berry">Architecture</span>
            <h2 id="worlds-directory-heading" className="mt-1 font-display text-2xl font-bold text-ink">
              The 10 Canonical ThinkLab Worlds
            </h2>
          </div>
          <Link href="/worlds" className="text-xs font-bold text-berry hover:underline flex items-center gap-1">
            <span>Explore full worlds showcase</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { name: "Number Lab", domain: "Applied Numeracy" },
            { name: "Story Studio", domain: "Narrative & Verbal" },
            { name: "Code Quest", domain: "Computational Thinking" },
            { name: "Strategy Arena", domain: "Tactics & Logic" },
            { name: "Word Arena", domain: "Vocabulary & Language" },
            { name: "Discovery Lab", domain: "Science & Exploration" },
            { name: "Creator Studio", domain: "Design & Invention" },
            { name: "Life Missions", domain: "Practical Dilemmas" },
            { name: "Wonder", domain: "Curiosity & Patterns" },
            { name: "Projects", domain: "Extended Collaborative Builds" },
          ].map((world) => (
            <div key={world.name} className="rounded-xl border border-ink/10 bg-paper p-3 text-center">
              <span className="font-bold text-xs text-ink block">{world.name}</span>
              <span className="text-[10px] text-ink/60 mt-0.5 block">{world.domain}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA — Live Experience Entry */}
      <footer className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-3xl border-2 border-berry/30 bg-gradient-to-r from-paper to-sky/20 p-6 sm:p-8 shadow-soft">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-berry">Try It Live</span>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-ink mt-0.5">
            Experience the working Stage 2 prototypes today.
          </h3>
          <p className="text-xs sm:text-sm text-ink/70 mt-1">
            Launch Zara&apos;s adaptive market mission or play Tobi&apos;s deterministic robot sequencing game.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            href="/learn/zara"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-soft transition hover:bg-berry focus-visible:outline focus-visible:outline-4 focus-visible:outline-berry"
          >
            <span>Zara Mission (Live)</span>
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href="/learn/tobi"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink/20 px-5 py-2.5 text-xs sm:text-sm font-bold text-ink transition hover:border-berry focus-visible:outline focus-visible:outline-4 focus-visible:outline-berry"
          >
            <span>Tobi Logic (Live)</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}
