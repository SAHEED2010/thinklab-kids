import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Compass,
  ArrowRight,
  Bot,
  Store,
  CheckCircle2,
  Cpu,
  HeartHandshake,
  Workflow,
} from "lucide-react";
import { ProductSubNav } from "@/components/product/product-sub-nav";
import { StatusBadge } from "@/components/status-badge";

export const metadata: Metadata = {
  title: "How It Works · The 8-Stage Learning Loop",
  description:
    "How ThinkLab Kids works: the 8-stage learning loop, contextual AI generation, deterministic logic, and observable evidence.",
};

const loopStages = [
  {
    num: "01",
    name: "Explore",
    color: "bg-sky text-ink border-sky-300",
    description: "Encounter a contextual question, Nigerian story, environment, puzzle, observation, or challenge.",
    detail: "Rather than an abstract worksheet, learning starts inside a living context—like Balogun Market, a solar kiosk, or a robot grid.",
  },
  {
    num: "02",
    name: "Think",
    color: "bg-mango/40 text-ink border-mango/60",
    description: "Consider what is known, what matters, possible choices, and available resources.",
    detail: "Children pause before answering to examine constraints: budget limits, boundary walls, nutritional priorities, or sequence steps.",
  },
  {
    num: "03",
    name: "Attempt",
    color: "bg-paper text-ink border-ink/20",
    description: "Try an answer, solution, sequence, design, hypothesis, or strategy.",
    detail: "An active move rather than passive reading. Children test their hypothesis with tangible inputs or selections.",
  },
  {
    num: "04",
    name: "Explain",
    color: "bg-leaf/40 text-ink border-leaf",
    description: "Articulate why they chose that approach in their own spoken or written words.",
    detail: "The cornerstone of ThinkLab: articulating reasoning solidifies comprehension and builds confidence to defend ideas.",
  },
  {
    num: "05",
    name: "Feedback",
    color: "bg-sky/60 text-ink border-sky-300",
    description: "Receive useful, structured feedback about the attempt without shaming or red marks.",
    detail: "Immediate, encouraging feedback validates what worked and pinpoints the exact boundary or constraint that requires attention.",
  },
  {
    num: "06",
    name: "Adapt",
    color: "bg-coral/25 text-ink border-coral/50",
    description: "Change the strategy, revise assumptions, or try another path when conditions change.",
    detail: "A price surges, an obstacle appears, or resources shrink. The child learns resilience and cognitive flexibility.",
  },
  {
    num: "07",
    name: "Create",
    color: "bg-berry/20 text-berry border-berry/40",
    description: "Use the learning to make, design, write, build, investigate, or solve something original.",
    detail: "Applying the discovered rule to invent a new sequence, construct an alternative grocery combination, or design a path.",
  },
  {
    num: "08",
    name: "Master",
    color: "bg-ink text-white border-ink",
    description: "Demonstrate enduring understanding through repeated application—not merely memorizing one answer.",
    detail: "True mastery means transferring principles into unfamiliar domains rather than repeating rote answers from memory.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-10 sm:py-16">
      {/* Product Sub-Navigation */}
      <ProductSubNav currentPath="/how-it-works" />

      {/* Hero Header */}
      <header className="max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-berry/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-berry">
          <Workflow className="size-3.5" aria-hidden="true" />
          The Learning Architecture
        </div>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-ink leading-[1.1]">
          How ThinkLab guides children from inquiry to mastery.
        </h1>
        <p className="mt-5 text-lg sm:text-xl leading-relaxed text-ink/80">
          Learning is not a one-way lecture or a static quiz. ThinkLab structures learning as an iterative loop where children explore dilemmas, make choices, defend their reasoning, and adapt when constraints change.
        </p>
      </header>

      {/* Section A: The Complete 8-Stage Learning Loop */}
      <section aria-labelledby="loop-heading" className="mt-12 sm:mt-16">
        <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-ink/10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-berry">Foundational Model</span>
            <h2 id="loop-heading" className="mt-1 font-display text-2xl sm:text-3xl font-bold text-ink">
              The 8-Stage ThinkLab Learning Loop
            </h2>
          </div>
          <span className="rounded-full bg-paper border border-ink/10 px-3 py-1 text-xs font-bold text-ink">
            Non-Linear · Iterative · Reflective
          </span>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {loopStages.map((stage) => (
            <div
              key={stage.num}
              className="flex flex-col justify-between rounded-2xl border bg-white p-5 shadow-2xs transition hover:shadow-soft"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center rounded-lg border px-2.5 py-0.5 text-xs font-bold ${stage.color}`}>
                    Stage {stage.num}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-ink/40">Step</span>
                </div>
                <h3 className="mt-3 font-display text-xl font-bold text-ink">{stage.name}</h3>
                <p className="mt-2 text-xs font-semibold leading-relaxed text-ink/80">{stage.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-ink/10">
                <p className="text-[11px] leading-relaxed text-ink/65 italic">{stage.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section B: Show an Example Journey (Zara's Balogun Market Mission) */}
      <section
        aria-labelledby="journey-heading"
        className="mt-12 sm:mt-16 rounded-3xl border-2 border-leaf/60 bg-gradient-to-b from-leaf/15 via-white to-paper p-7 sm:p-10 shadow-soft"
      >
        <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-leaf/40">
          <div>
            <div className="flex items-center gap-2">
              <Store className="size-4 text-emerald-800" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">Concrete Journey</span>
            </div>
            <h2 id="journey-heading" className="mt-1 font-display text-2xl sm:text-3xl font-bold text-ink">
              Walking through the loop: Zara at Balogun Market (Age 7)
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status="live" size="sm" />
            <span className="text-xs font-bold text-ink/60">Functional Slice</span>
          </div>
        </div>

        <p className="mt-4 text-sm sm:text-base leading-relaxed text-ink/80">
          Here is how the complete learning model comes alive during a budgeting and arithmetic mission in <strong>Life Missions & Number Lab</strong>:
        </p>

        {/* 8-Step Walkthrough Timeline */}
        <div className="mt-8 space-y-3">
          {[
            {
              stage: "1. Explore",
              status: "LIVE in Prototype",
              title: "Encountering the market dilemma",
              desc: "Zara receives ₦2,000 to buy dinner staples for her family. Fresh cassava flour is ₦600, smoked fish is ₦700, and fresh tomatoes are ₦450.",
            },
            {
              stage: "2. Think",
              status: "LIVE in Prototype",
              title: "Checking constraints & allowances",
              desc: "She calculates total cost: ₦600 + ₦700 + ₦450 = ₦1,750. She notes a remaining ₦250, but remembers she must reserve at least ₦200 for bus fare home.",
            },
            {
              stage: "3. Attempt",
              status: "LIVE in Prototype",
              title: "Committing to a basket selection",
              desc: "Zara enters her basket calculation and verifies that ₦1,750 is strictly under her ₦2,000 threshold with ₦250 left over.",
            },
            {
              stage: "4. Explain",
              status: "LIVE in Prototype",
              title: "Verbalizing why the choice works",
              desc: "Prompted to explain, Zara states: 'I kept ₦200 safe for bus fare so I do not have to walk home in the hot sun.'",
            },
            {
              stage: "5. Feedback",
              status: "LIVE in Prototype",
              title: "Receiving structured reinforcement",
              desc: "The app validates her arithmetic accuracy and acknowledges her forward-thinking bus reserve as a smart trade-off.",
            },
            {
              stage: "6. Adapt",
              status: "LIVE in Prototype",
              title: "Reacting to an unexpected constraint change",
              desc: "Tomato prices surge by ₦150 (now ₦600), pushing the basket to ₦1,900. With only ₦100 remaining, her bus reserve is threatened. Zara swaps one item to stay within budget.",
            },
            {
              stage: "7. Create",
              status: "Preview · Product Model",
              title: "Designing an alternative family menu",
              desc: "Given a ₦3,000 budget and 6 pantry options, Zara constructs three distinct valid meal combinations meeting protein and vegetable quotas.",
            },
            {
              stage: "8. Master",
              status: "Planned Adaptive Step",
              title: "Transferring budgeting logic to new worlds",
              desc: "Zara encounters a craft market mission in Creator Studio and independently applies the same reserve-first budgeting strategy.",
            },
          ].map((step, idx) => (
            <div
              key={step.stage}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-ink/10 bg-white p-4 shadow-2xs"
            >
              <div className="flex items-start gap-3">
                <span className="flex size-7 items-center justify-center rounded-xl bg-berry/10 text-xs font-black text-berry shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-ink uppercase tracking-wider">{step.stage}</span>
                    <span className="text-xs font-bold text-ink">· {step.title}</span>
                  </div>
                  <p className="mt-1 text-xs sm:text-sm text-ink/75 leading-relaxed">{step.desc}</p>
                </div>
              </div>

              <span className="self-start sm:self-auto rounded-full bg-paper border border-ink/15 px-2.5 py-0.5 text-[11px] font-bold text-ink/70 shrink-0">
                {step.status}
              </span>
            </div>
          ))}
        </div>

        {/* Prototype Honesty Notice */}
        <div className="mt-6 rounded-2xl bg-white/80 border border-leaf p-4 text-xs text-ink/80">
          <strong>Transparency Note:</strong> Steps 1–6 are functional in the hackathon build via our server-side Gemini mission flow and deterministic validators. Steps 7–8 represent our validated product model and next integration phases.
        </div>
      </section>

      {/* Section C: How AI Fits — A Tool, Not a Chatbot */}
      <section
        aria-labelledby="ai-role-heading"
        className="mt-12 sm:mt-16 rounded-3xl border border-ink/10 bg-white p-7 sm:p-10 shadow-sm"
      >
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-berry">
          <Cpu className="size-4 shrink-0 text-berry" aria-hidden="true" />
          <span>The AI Role & Architecture</span>
        </div>
        <h2 id="ai-role-heading" className="mt-3 font-display text-2xl sm:text-3xl font-bold text-ink">
          AI is a tool inside the learning experience—not the product itself.
        </h2>
        <div className="mt-4 space-y-4 text-sm sm:text-base leading-relaxed text-ink/80">
          <p>
            ThinkLab Kids is deliberately <strong>not</strong> an open-ended conversational wrapper or a &ldquo;ChatGPT for kids&rdquo;. Handing young children an unfiltered chat interface is neither pedagogically effective nor safe.
          </p>
          <p>
            Instead, we use Gemini behind strict server-side boundaries to generate structured, curriculum-aligned scenarios, introduce contextual plot twists, and synthesize session observations:
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-ink/10 bg-paper p-5">
            <span className="text-xs font-bold uppercase tracking-wider text-berry">Contextual Scenarios</span>
            <h3 className="mt-1 text-base font-bold text-ink">Scenario Generation</h3>
            <p className="mt-1 text-xs text-ink/70 leading-relaxed">
              Produces fresh, culturally grounded Nigerian story missions (markets, transit, solar energy) tailored to learner age and skill boundaries.
            </p>
          </div>

          <div className="rounded-2xl border border-ink/10 bg-paper p-5">
            <span className="text-xs font-bold uppercase tracking-wider text-berry">Constraint Variation</span>
            <h3 className="mt-1 text-base font-bold text-ink">Adaptive Twists</h3>
            <p className="mt-1 text-xs text-ink/70 leading-relaxed">
              Injects dynamic price changes, resource limits, or route closures that require children to rethink assumptions and adapt strategies.
            </p>
          </div>

          <div className="rounded-2xl border border-ink/10 bg-paper p-5">
            <span className="text-xs font-bold uppercase tracking-wider text-berry">Evidence Synthesis</span>
            <h3 className="mt-1 text-base font-bold text-ink">Descriptive Observation</h3>
            <p className="mt-1 text-xs text-ink/70 leading-relaxed">
              Summarizes observed decisions and spoken explanations into parent-friendly evidence without permanent IQ or talent labeling.
            </p>
          </div>
        </div>

        {/* Current Implementation vs Future Capability */}
        <div className="mt-8 rounded-2xl border border-ink/10 bg-paper/60 p-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-ink/60">
            Distinguishing Current Implementation from Future Capabilities
          </h3>
          <div className="mt-3 grid gap-4 sm:grid-cols-2 text-xs sm:text-sm">
            <div className="rounded-xl bg-white border border-emerald-200 p-4">
              <span className="font-bold text-emerald-800 flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                Live in Current Build:
              </span>
              <ul className="mt-2 space-y-1 text-xs text-ink/75">
                <li>• Server-side Gemini structured schema generation</li>
                <li>• Real-time input and output Zod validation</li>
                <li>• Deterministic math and game fallback safety layers</li>
                <li>• Structured mission response evaluation and session summaries</li>
              </ul>
            </div>

            <div className="rounded-xl bg-white border border-stone-200 p-4">
              <span className="font-bold text-stone-700 flex items-center gap-1.5">
                <Compass className="size-4 text-stone-500 shrink-0" />
                Planned Future Capabilities:
              </span>
              <ul className="mt-2 space-y-1 text-xs text-ink/75">
                <li>• Multimodal audio analysis for non-readers</li>
                <li>• Multi-session longitudinal adaptive calibration</li>
                <li>• Offline on-device small model execution for rural connectivity</li>
                <li>• Cross-world capability transfer tracking</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section D: Deterministic Logic Still Matters (Tobi) */}
      <section
        aria-labelledby="deterministic-heading"
        className="mt-12 sm:mt-16 rounded-3xl border-2 border-sky-400 bg-gradient-to-b from-sky/35 via-white to-paper p-7 sm:p-10 shadow-soft"
      >
        <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-sky-300">
          <div>
            <div className="flex items-center gap-2">
              <Bot className="size-4 text-sky-800" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-wider text-sky-900">Deterministic Code</span>
            </div>
            <h2 id="deterministic-heading" className="mt-1 font-display text-2xl sm:text-3xl font-bold text-ink">
              Why not everything needs AI: Tobi&apos;s Robot Code Quest
            </h2>
          </div>
          <StatusBadge status="live" size="sm" />
        </div>

        <div className="mt-4 space-y-4 text-sm sm:text-base leading-relaxed text-ink/80">
          <p>
            An essential product principle of ThinkLab is restraint: <strong>Use AI where variability and language help. Use normal code where rules should remain predictable.</strong>
          </p>
          <p>
            Tobi&apos;s robot sequencing game in <strong>Code Quest</strong> is completely deterministic. It runs on a 5×5 grid with precise boundary checks, obstacle collisions, and clear heading states:
          </p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-xs">
          <div className="rounded-xl bg-white border border-sky-200 p-3.5 shadow-2xs">
            <span className="font-bold text-sky-900 block">5×5 Grid Mathematics</span>
            <p className="mt-1 text-ink/70">Deterministic coordinate tracking from start (0,4) to goal star (4,0).</p>
          </div>
          <div className="rounded-xl bg-white border border-sky-200 p-3.5 shadow-2xs">
            <span className="font-bold text-sky-900 block">Boundary Collision Checks</span>
            <p className="mt-1 text-ink/70">Instant feedback when instructions wander off the map boundaries.</p>
          </div>
          <div className="rounded-xl bg-white border border-sky-200 p-3.5 shadow-2xs">
            <span className="font-bold text-sky-900 block">Obstacle Detection</span>
            <p className="mt-1 text-ink/70">Predictable barrier checks that prompt children to debug turn orders.</p>
          </div>
          <div className="rounded-xl bg-white border border-sky-200 p-3.5 shadow-2xs">
            <span className="font-bold text-sky-900 block">Ordinal Command Execution</span>
            <p className="mt-1 text-ink/70">Step-by-step loop execution of Forward, Turn Left, and Turn Right commands.</p>
          </div>
        </div>

        <div className="mt-6 p-4 rounded-2xl bg-white border border-sky-200 text-xs text-ink/75 flex items-center justify-between flex-wrap gap-2">
          <span>By keeping core game mechanics in deterministic code, we guarantee mathematical consistency, zero hallucinations, and zero server latency for fast play.</span>
          <Link
            href="/learn/tobi"
            className="inline-flex items-center gap-1 font-bold text-berry hover:underline"
          >
            <span>Play Tobi&apos;s Game</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </section>

      {/* Section E: Safety & Observable Learning Evidence */}
      <section
        aria-labelledby="evidence-heading"
        className="mt-12 sm:mt-16 rounded-3xl border border-ink/10 bg-paper p-7 sm:p-10"
      >
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-berry">
          <HeartHandshake className="size-4 shrink-0 text-berry" aria-hidden="true" />
          <span>Responsible Evidence</span>
        </div>
        <h2 id="evidence-heading" className="mt-3 font-display text-2xl sm:text-3xl font-bold text-ink">
          Communicating observable evidence, not sterile grades or IQ numbers.
        </h2>
        <p className="mt-4 text-sm sm:text-base leading-relaxed text-ink/80">
          The ultimate output of ThinkLab&apos;s learning loop is not a letter grade or a percentile ranking. Instead, we capture specific, time-bounded evidence of what the child actually did, reasoned, and explained:
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 text-xs">
          <div className="rounded-2xl bg-white border border-ink/10 p-4">
            <span className="font-bold text-ink block">Observable Reasoning</span>
            <p className="mt-1 text-ink/70">What alternatives were compared when tomato prices changed.</p>
          </div>
          <div className="rounded-2xl bg-white border border-ink/10 p-4">
            <span className="font-bold text-ink block">Captured Explanations</span>
            <p className="mt-1 text-ink/70">How the child articulated keeping transport money safe in their own words.</p>
          </div>
          <div className="rounded-2xl bg-white border border-ink/10 p-4">
            <span className="font-bold text-ink block">Support Needed</span>
            <p className="mt-1 text-ink/70">Where a prompt was helpful, framed as guidance rather than failure.</p>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl bg-white border border-ink/10 p-4">
          <p className="text-xs text-ink/80">
            Want to see how this evidence is presented to parents and guardians?
          </p>
          <Link
            href="/parent"
            className="inline-flex items-center gap-1.5 rounded-full bg-berry px-4 py-2 text-xs font-bold text-white shadow-soft transition hover:bg-ink shrink-0"
          >
            <span>Inspect Parent Preview</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </section>

      {/* Bottom CTA — Sequence to Ages 4–14 */}
      <footer className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-3xl border border-ink/10 bg-white p-6 sm:p-8 shadow-soft">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-berry">Next Chapter</span>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-ink mt-0.5">
            Discover the Ages 4–14 Continuum
          </h3>
          <p className="text-xs sm:text-sm text-ink/70 mt-1">
            See how ThinkLab scaffolds from early sensory exploration to adolescent independent projects.
          </p>
        </div>

        <Link
          href="/ages"
          className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-berry shrink-0 focus-visible:outline focus-visible:outline-4 focus-visible:outline-berry"
        >
          <span>Explore Ages 4–14</span>
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </footer>
    </div>
  );
}
