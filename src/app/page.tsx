import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  Compass,
  Sparkles,
  Bot,
  Store,
  School,
  XCircle,
  Check,
} from "lucide-react";
import { StatusBadge } from "@/components/status-badge";
import { ExerciseComparison } from "@/components/landing/exercise-comparison";
import { AgeStages } from "@/components/landing/age-stages";
import { WorldsShowcase } from "@/components/landing/worlds-showcase";
import { ChallengesSection } from "@/components/landing/challenges-section";
import { ParentEvidencePreview } from "@/components/landing/parent-evidence-preview";
import { StatusMatrix } from "@/components/landing/status-matrix";
import { learners } from "@/data/learners";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 1. HERO SECTION: What ThinkLab Kids is */}
      <section
        id="overview"
        aria-labelledby="hero-heading"
        className="relative overflow-hidden border-b border-ink/10 bg-gradient-to-b from-paper via-white to-sky/20 px-5 pt-12 pb-16 sm:pt-20 sm:pb-24"
      >
        <div className="mx-auto max-w-6xl">
          {/* Top Pill Indicators */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-berry px-3.5 py-1 text-xs font-bold text-white shadow-soft">
              <Sparkles className="size-3.5" aria-hidden="true" />
              Ages 4–14
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-leaf/60 border border-leaf px-3.5 py-1 text-xs font-bold text-ink">
              <School className="size-3.5 text-emerald-900" aria-hidden="true" />
              Complements School · Never Replaces It
            </span>
            <StatusBadge status="live" size="sm" />
          </div>

          <div className="mt-8 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <h1
                id="hero-heading"
                className="font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl lg:text-6xl leading-[1.08]"
              >
                Where young African minds practise thinking, explaining, and creating.
              </h1>
              
              <p className="mt-6 text-lg sm:text-xl leading-relaxed text-ink/80 max-w-2xl">
                ThinkLab Kids is an AI-assisted learning world designed to complement classroom education. Academic foundations matter deeply—yet children also need regular, repeated opportunities to reason through unfamiliar dilemmas, test hypotheses, explain their choices, and make sense of the world around them.
              </p>

              {/* The Learning Loop */}
              <div className="mt-8 rounded-2xl border border-berry/20 bg-white/80 p-4 sm:p-5 shadow-2xs backdrop-blur-xs">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-berry">
                  The ThinkLab Learning Loop
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs sm:text-sm font-bold text-ink">
                  <span className="rounded-lg bg-sky px-2.5 py-1">Explore</span>
                  <span className="text-ink/40">→</span>
                  <span className="rounded-lg bg-mango/40 px-2.5 py-1">Think</span>
                  <span className="text-ink/40">→</span>
                  <span className="rounded-lg bg-paper border border-ink/15 px-2.5 py-1">Attempt</span>
                  <span className="text-ink/40">→</span>
                  <span className="rounded-lg bg-leaf/40 px-2.5 py-1">Explain</span>
                  <span className="text-ink/40">→</span>
                  <span className="rounded-lg bg-sky px-2.5 py-1">Feedback</span>
                  <span className="text-ink/40">→</span>
                  <span className="rounded-lg bg-coral/30 px-2.5 py-1">Adapt</span>
                  <span className="text-ink/40">→</span>
                  <span className="rounded-lg bg-berry/20 text-berry px-2.5 py-1">Create</span>
                  <span className="text-ink/40">→</span>
                  <span className="rounded-lg bg-ink text-white px-2.5 py-1">Master</span>
                </div>
                <div className="mt-3 pt-3 border-t border-berry/15 flex items-center justify-between text-xs">
                  <span className="text-ink/70">8-stage iterative inquiry cycle</span>
                  <Link href="/how-it-works" className="font-bold text-berry hover:underline flex items-center gap-1">
                    <span>How the loop works in detail</span>
                    <ArrowRight className="size-3" />
                  </Link>
                </div>
              </div>

              {/* Hero Action CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="#demo-experience"
                  className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-ink px-6 py-3 font-bold text-white shadow-soft transition hover:bg-berry focus-visible:outline focus-visible:outline-4 focus-visible:outline-berry"
                >
                  <span>Enter the ThinkLab Demo</span>
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/why"
                  className="inline-flex min-h-12 items-center rounded-full border-2 border-ink/15 px-6 py-3 font-bold text-ink transition hover:border-berry focus-visible:outline focus-visible:outline-4 focus-visible:outline-berry"
                >
                  Why ThinkLab Exists
                </Link>
              </div>
            </div>

            {/* Right Card: What ThinkLab IS vs What ThinkLab IS NOT */}
            <div className="rounded-3xl border-2 border-ink/10 bg-white p-6 sm:p-8 shadow-soft">
              <span className="text-xs font-bold uppercase tracking-wider text-ink/50">Our Product Identity</span>
              <h2 className="mt-2 font-display text-2xl font-bold text-ink">
                Built specifically for genuine mental agility.
              </h2>
              
              <div className="mt-6 space-y-4">
                <div className="rounded-2xl bg-rose-50/70 border border-rose-200 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                    <XCircle className="size-4" aria-hidden="true" />
                    What ThinkLab is NOT:
                  </p>
                  <ul className="mt-2 space-y-1.5 text-xs text-rose-950">
                    <li>• Not another generic LMS or school admin dashboard</li>
                    <li>• Not a digital worksheet platform for rote drills</li>
                    <li>• Not a raw ChatGPT-for-kids conversational wrapper</li>
                    <li>• Not a system that boils learning down to a single letter grade</li>
                  </ul>
                </div>

                <div className="rounded-2xl bg-emerald-50/70 border border-emerald-200 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                    <CheckCircle2 className="size-4" aria-hidden="true" />
                    What ThinkLab IS:
                  </p>
                  <ul className="mt-2 space-y-1.5 text-xs text-emerald-950">
                    <li>• Contextual African missions (markets, robot routes, solar power)</li>
                    <li>• Practice in reasoning, communicating, and defending choices</li>
                    <li>• Child-safe, deterministic rules with adaptive AI guidance</li>
                    <li>• Observable learning evidence for parents and educators</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM & PRODUCT THESIS: Respectfully Framed */}
      <section
        id="the-problem"
        aria-labelledby="problem-heading"
        className="mx-auto max-w-6xl px-5 py-16 sm:py-24"
      >
        <div className="text-center max-w-3xl mx-auto">
          <p className="inline-flex items-center gap-2 rounded-full bg-mango/40 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-ink">
            <Brain className="size-3.5 text-berry" aria-hidden="true" />
            The Foundation & The Thesis
          </p>
          <h2 id="problem-heading" className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl text-ink">
            Respecting schools, supporting parents, and building real cognitive strength.
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-ink/75">
            Classrooms work under immense pressure. We believe foundational academic mastery and higher-order thinking are not opposites—they must reinforce one another.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {/* Card A: Evidence-Backed Problem */}
          <div className="rounded-3xl border border-ink/15 bg-white p-7 sm:p-9 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-ink/50">
                1. The Evidence-Backed Challenge
              </span>
              <h3 className="mt-2 font-display text-2xl font-bold text-ink">
                Nigeria faces serious foundational-learning challenges.
              </h3>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-ink/80">
                Building enduring literacy and numeracy foundations remains an urgent priority across Nigeria and the wider continent. Strengthening these basics requires sustained dedication, supportive families, and committed educators.
              </p>
              <div className="mt-6 rounded-2xl bg-paper p-4 border border-ink/10">
                <p className="text-xs font-semibold text-ink/75 italic">
                  Academic foundations are the necessary starting point. The opportunity is ensuring children also have space to connect those foundations to active reasoning and real-world application.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-ink/10">
              <p className="text-[11px] text-ink/60 font-mono">
                [Structure ready for verified foundational-learning empirical data and sourced academic citations.]
              </p>
            </div>
          </div>

          {/* Card B: ThinkLab Product Thesis */}
          <div className="rounded-3xl border-2 border-berry/30 bg-gradient-to-b from-paper via-white to-mango/15 p-7 sm:p-9 shadow-soft flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-berry">
                2. The ThinkLab Product Thesis
              </span>
              <h3 className="mt-2 font-display text-2xl font-bold text-ink">
                Reinforce foundations through repeated real-world reasoning.
              </h3>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-ink/80">
                While children master reading and arithmetic, they must also regularly practise:
              </p>
              
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-semibold text-ink">
                {[
                  "Reasoning & Logic",
                  "Creative Invention",
                  "Verbal Explanation",
                  "Experimentation",
                  "Computational Thinking",
                  "Decision-Making",
                  "Financial Intuition",
                  "Reflective Adaptation",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 rounded-xl bg-white border border-ink/10 p-2.5">
                    <Check className="size-3.5 text-emerald-600 shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-berry/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <p className="text-xs font-bold text-berry">
                School gives the foundation. ThinkLab provides the arena to explore, apply, and explain it.
              </p>
              <Link href="/why" className="inline-flex items-center gap-1 text-xs font-bold text-berry hover:underline shrink-0">
                <span>Read our full thesis</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SHOW THE DIFFERENCE THROUGH AN EXAMPLE */}
      <ExerciseComparison />

      {/* 4. SHOW THE AGES 4–14 JOURNEY */}
      <AgeStages />

      {/* 5. INTRODUCE THE FULL LEARNING WORLDS ARCHITECTURE */}
      <WorldsShowcase />

      {/* 6. EXPLAIN GAMES AND CHALLENGES */}
      <ChallengesSection />

      {/* 7. SHOW PARENT VALUE (OBSERVABLE EVIDENCE PREVIEW) */}
      <ParentEvidencePreview />

      {/* 8. SHOW LIVE / PREVIEW / COMING SOON HONESTLY */}
      <StatusMatrix />

      {/* 9. END WITH A CLEAR DEMO CTA & DEMO LEARNERS */}
      <section
        id="demo-experience"
        aria-labelledby="demo-heading"
        className="border-t border-ink/10 bg-gradient-to-b from-white via-sky/20 to-paper px-5 py-16 sm:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-1.5 text-xs font-bold text-white shadow-soft">
              <Sparkles className="size-3.5 text-mango" aria-hidden="true" />
              Judge & Family Demo Access
            </span>
            <h2 id="demo-heading" className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl text-ink">
              Enter the ThinkLab Demo
            </h2>
            <p className="mt-3 text-base sm:text-lg text-ink/75 leading-relaxed">
              Step directly into our working hackathon prototypes. Try Zara&apos;s adaptive market mission, navigate Tobi&apos;s deterministic robot grid, or inspect our demonstration profiles.
            </p>
          </div>

          {/* Quick Access Action Grid */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Live Card 1: Zara */}
            <div className="flex flex-col justify-between rounded-3xl border-2 border-leaf/80 bg-gradient-to-b from-leaf/25 to-white p-6 shadow-soft">
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 text-xs font-bold text-emerald-900">
                    ● LIVE DEMO
                  </span>
                  <span className="text-xs font-bold text-ink/60 uppercase">Age 7</span>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <div className="rounded-2xl bg-white p-3 border border-ink/10">
                    <Store className="size-6 text-emerald-800" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-ink">Zara</h3>
                    <p className="text-xs font-semibold text-emerald-900">Maths, Reasoning & Decisions</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-ink/80 leading-relaxed">
                  Generate a live, age-aware market dilemma for Zara. Practise balancing food costs, navigating trade-offs, and formulating reasoning.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-leaf/40">
                <Link
                  href="/learn/zara"
                  className="flex items-center justify-between rounded-2xl bg-ink px-5 py-3 font-bold text-white hover:bg-berry transition focus-visible:outline focus-visible:outline-4 focus-visible:outline-berry"
                >
                  <span>Launch Zara&apos;s Mission</span>
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Live Card 2: Tobi */}
            <div className="flex flex-col justify-between rounded-3xl border-2 border-sky-400 bg-gradient-to-b from-sky/35 to-white p-6 shadow-soft">
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 text-xs font-bold text-emerald-900">
                    ● LIVE DEMO
                  </span>
                  <span className="text-xs font-bold text-ink/60 uppercase">Age 6</span>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <div className="rounded-2xl bg-white p-3 border border-ink/10">
                    <Bot className="size-6 text-sky-800" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-ink">Tobi</h3>
                    <p className="text-xs font-semibold text-sky-900">Computational Thinking</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-ink/80 leading-relaxed">
                  Help Tobi guide the robot to the star. A deterministic mini game where clear instruction order is checked directly in normal code.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-sky-300">
                <Link
                  href="/learn/tobi"
                  className="flex items-center justify-between rounded-2xl bg-ink px-5 py-3 font-bold text-white hover:bg-berry transition focus-visible:outline focus-visible:outline-4 focus-visible:outline-berry"
                >
                  <span>Play Tobi&apos;s Sequencing Game</span>
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Hub Card: All Learners */}
            <div className="flex flex-col justify-between rounded-3xl border border-ink/15 bg-white p-6 shadow-sm">
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-mango/40 px-2.5 py-0.5 text-xs font-bold text-ink">
                    5 SYNTHETIC LEARNERS
                  </span>
                  <span className="text-xs font-bold text-ink/60 uppercase">Ages 4–11</span>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <div className="rounded-2xl bg-mango/30 p-3 border border-ink/10">
                    <Compass className="size-6 text-ink" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-ink">Learner Hub</h3>
                    <p className="text-xs font-semibold text-ink/70">Explore All Profiles</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-ink/80 leading-relaxed">
                  Meet Amara (4), David (9), and Favour (11) alongside Zara and Tobi to see how ThinkLab scaffolds across ages.
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {learners.map((l) => (
                    <span
                      key={l.id}
                      className="rounded-lg bg-paper px-2 py-0.5 text-[11px] font-bold text-ink/75 border border-ink/10"
                    >
                      {l.name} ({l.age})
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-ink/10">
                <Link
                  href="/learners"
                  className="flex items-center justify-between rounded-2xl border-2 border-ink/20 px-5 py-3 font-bold text-ink hover:border-berry hover:text-berry transition focus-visible:outline focus-visible:outline-4 focus-visible:outline-berry"
                >
                  <span>Browse All Learners</span>
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER: Responsible AI, Attribution, and Ethics */}
      <footer className="border-t border-ink/10 bg-paper py-12 px-5">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-start md:items-center justify-between gap-8 text-xs text-ink/70">
          <div>
            <p className="font-bold text-ink text-sm">ThinkLab Kids</p>
            <p className="mt-1 max-w-sm">
              AI-assisted learning world for African children ages 4–14. Complements classroom foundations with contextual reasoning.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 font-semibold">
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-ink/40 uppercase tracking-wider text-[10px]">Product:</span>
              <Link href="/why" className="hover:text-berry">Why ThinkLab</Link>
              <Link href="/how-it-works" className="hover:text-berry">How It Works</Link>
              <Link href="/ages" className="hover:text-berry">Ages 4–14</Link>
            </div>
            <div className="flex flex-wrap items-center gap-4 border-t sm:border-t-0 sm:border-l border-ink/10 pt-3 sm:pt-0 sm:pl-6">
              <span className="text-ink/40 uppercase tracking-wider text-[10px]">Experiences:</span>
              <Link href="/learners" className="hover:text-berry">Learners</Link>
              <Link href="/worlds" className="hover:text-berry">Worlds</Link>
              <Link href="/parent" className="hover:text-berry">Parent Preview</Link>
              <Link href="/learn/zara" className="hover:text-berry">Zara (Live)</Link>
              <Link href="/learn/tobi" className="hover:text-berry">Tobi (Live)</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
