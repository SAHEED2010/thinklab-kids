import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  School,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  Lightbulb,
  ShieldCheck,
} from "lucide-react";
import { ProductSubNav } from "@/components/product/product-sub-nav";
import { StatusBadge } from "@/components/status-badge";

export const metadata: Metadata = {
  title: "Why ThinkLab · Rationale & Educational Thesis",
  description:
    "Why ThinkLab Kids exists: complementing classroom foundations with repeated opportunities for African children to reason, explain, decide, and create.",
};

export default function WhyPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-10 sm:py-16">
      {/* Product Sub-Navigation */}
      <ProductSubNav currentPath="/why" />

      {/* Hero Header */}
      <header className="max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-berry/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-berry">
          <Sparkles className="size-3.5" aria-hidden="true" />
          The Rationale & Thesis
        </div>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-ink leading-[1.1]">
          Why ThinkLab Kids needs to exist.
        </h1>
        <p className="mt-5 text-lg sm:text-xl leading-relaxed text-ink/80">
          School provides the indispensable academic foundation. ThinkLab creates the arena where children repeatedly apply that foundation to reason through unfamiliar dilemmas, defend their choices, and build lasting confidence.
        </p>
      </header>

      {/* Section A: Foundations Matter Deeply */}
      <section
        aria-labelledby="foundations-heading"
        className="mt-12 sm:mt-16 rounded-3xl border border-ink/10 bg-white p-7 sm:p-10 shadow-sm"
      >
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
          <School className="size-4 shrink-0 text-emerald-700" aria-hidden="true" />
          <span>Foundations Are Essential</span>
        </div>
        <h2 id="foundations-heading" className="mt-3 font-display text-2xl sm:text-3xl font-bold text-ink">
          We start with deep respect for classrooms, curricula, and teachers.
        </h2>
        <div className="mt-4 space-y-4 text-sm sm:text-base leading-relaxed text-ink/80">
          <p>
            Strong literacy, numeracy, oral communication, and basic scientific awareness are the bedrock of all subsequent learning. ThinkLab does not oppose school, dismiss exams, or imagine that foundational drills are unnecessary.
          </p>
          <p>
            Teachers and school leaders work under demanding conditions to build these core competencies. ThinkLab is explicitly designed as a <strong>complementary partner</strong> to the classroom—never a replacement. Where school establishes the rules and facts, ThinkLab provides safe, contextual missions for children to discover what those rules can do.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-ink/10 bg-paper p-4">
            <span className="text-xs font-bold uppercase tracking-wider text-ink/60">Classroom Role</span>
            <h3 className="mt-1 font-bold text-ink">Direct Instruction & Fluency</h3>
            <p className="mt-1 text-xs text-ink/70">
              Systematic teaching of reading, writing, mathematical operations, and national curricula.
            </p>
          </div>
          <div className="rounded-2xl border border-berry/20 bg-berry/5 p-4">
            <span className="text-xs font-bold uppercase tracking-wider text-berry">ThinkLab Role</span>
            <h3 className="mt-1 font-bold text-ink">Application & Reasoning</h3>
            <p className="mt-1 text-xs text-ink/70">
              Scenario-based missions where children make decisions, explain why, and adapt to changing constraints.
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Combined Impact</span>
            <h3 className="mt-1 font-bold text-ink">Enduring Cognitive Agility</h3>
            <p className="mt-1 text-xs text-ink/70">
              Foundational recall reinforced by repeated real-world problem solving and verbal articulation.
            </p>
          </div>
        </div>
      </section>

      {/* Section B: The Additional Opportunity */}
      <section
        aria-labelledby="opportunity-heading"
        className="mt-12 sm:mt-16 rounded-3xl border-2 border-berry/25 bg-gradient-to-b from-white via-sky/10 to-paper p-7 sm:p-10 shadow-soft"
      >
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-berry">
          <Lightbulb className="size-4 shrink-0" aria-hidden="true" />
          <span>The Additional Opportunity</span>
        </div>
        <h2 id="opportunity-heading" className="mt-3 font-display text-2xl sm:text-3xl font-bold text-ink">
          Children need practice using knowledge in unfamiliar situations.
        </h2>
        <p className="mt-4 text-sm sm:text-base leading-relaxed text-ink/80">
          Memorizing an arithmetic method or vocabulary list is only the first step. True intellectual capability emerges when a child can transfer that knowledge into ambiguous, changing contexts. ThinkLab provides continuous, deliberate practice across ten core habits of mind:
        </p>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { title: "Deciding", desc: "Choosing between alternatives under fixed constraints." },
            { title: "Comparing", desc: "Weighing trade-offs, costs, and competing advantages." },
            { title: "Explaining", desc: "Articulating why a solution works in their own words." },
            { title: "Testing Ideas", desc: "Hypothesizing and experimenting without fear of failure." },
            { title: "Changing Strategy", desc: "Adapting gracefully when constraints or prices change." },
            { title: "Asking Questions", desc: "Framing thoughtful inquiries into how systems operate." },
            { title: "Creating", desc: "Designing original sequences, stories, and solutions." },
            { title: "Investigating", desc: "Unpacking underlying patterns in nature and technology." },
            { title: "Researching", desc: "Gathering evidence before committing to a course of action." },
            { title: "Open-Ended Solving", desc: "Tackling challenges with more than one valid answer." },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-ink/10 bg-white p-3.5 shadow-2xs">
              <span className="text-xs font-bold text-berry block">{item.title}</span>
              <p className="mt-1 text-[11px] leading-relaxed text-ink/70">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section C: Responsible Framing on Foundational Learning */}
      <section
        aria-labelledby="gap-heading"
        className="mt-12 sm:mt-16 rounded-3xl border border-ink/10 bg-paper p-7 sm:p-10"
      >
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink/60">
          <ShieldCheck className="size-4 shrink-0 text-berry" aria-hidden="true" />
          <span>Context & Nuance</span>
        </div>
        <h2 id="gap-heading" className="mt-3 font-display text-2xl sm:text-3xl font-bold text-ink">
          Foundational learning is an urgent priority, not a deficit label.
        </h2>
        <div className="mt-4 space-y-4 text-sm sm:text-base leading-relaxed text-ink/80">
          <p>
            Across Nigeria and the wider African continent, strengthening early literacy and basic numeracy remains one of the most critical developmental imperatives of our generation. However, addressing this challenge must never involve blaming dedicated teachers, under-resourced families, or children themselves.
          </p>
          <p className="font-medium text-ink">
            ThinkLab rejects the harmful misconception that foundational practice and higher-order reasoning are in tension. They are mutually reinforcing: a child who understands <em>why</em> a calculation matters in the market or why an ordered sequence drives a robot learns the underlying arithmetic and logic with far greater retention and joy.
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-mango/50 bg-mango/20 p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-ink/75">Our Foundational Principle</p>
          <p className="mt-1 text-sm font-semibold text-ink leading-relaxed">
            Strengthening academic foundations and practising deeper reasoning should reinforce each other rather than compete. When arithmetic connects to real decisions, comprehension transforms into genuine intuition.
          </p>
        </div>
      </section>

      {/* Section D: Show the Difference — Conventional Exercise vs ThinkLab Mission */}
      <section
        aria-labelledby="difference-heading"
        className="mt-12 sm:mt-16 rounded-3xl border border-ink/15 bg-white p-7 sm:p-10 shadow-sm"
      >
        <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-ink/10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-berry">Concrete Example</span>
            <h2 id="difference-heading" className="mt-1 font-display text-2xl sm:text-3xl font-bold text-ink">
              Same core arithmetic. Completely different depth of mind.
            </h2>
          </div>
          <span className="rounded-full bg-leaf/40 px-3 py-1 text-xs font-bold text-ink">
            Knowledge + Context + Choice + Explanation
          </span>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* Card 1: Conventional Exercise */}
          <div className="rounded-2xl border border-ink/10 bg-paper p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-ink/50 uppercase tracking-wider">
                <span>Standard Workbook Problem</span>
                <span>Isolated Recall</span>
              </div>
              <div className="mt-6 rounded-xl bg-white border border-ink/10 p-5 text-center">
                <p className="font-display text-3xl font-bold text-ink">
                  ₦2,000 − ₦1,250 = <span className="text-berry underline">₦750</span>
                </p>
                <p className="mt-2 text-xs text-ink/60">Calculate remainder and write answer in box.</p>
              </div>
              <div className="mt-6 space-y-2 text-xs text-ink/75">
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-600 shrink-0" aria-hidden="true" />
                  <span>Verifies procedural calculation with 4-digit numbers.</span>
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-600 shrink-0" aria-hidden="true" />
                  <span>Single predetermined answer.</span>
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-ink/10 text-xs text-ink/60 italic">
              Validates procedural calculation, but leaves reasoning, purpose, and adaptability untested.
            </div>
          </div>

          {/* Card 2: ThinkLab Mission */}
          <div className="rounded-2xl border-2 border-berry/30 bg-gradient-to-b from-sky/30 to-white p-6 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-berry uppercase tracking-wider">
                <span>ThinkLab Mission · Balogun Market</span>
                <StatusBadge status="live" size="sm" />
              </div>
              <div className="mt-6 rounded-xl bg-white border border-berry/15 p-5">
                <p className="text-xs font-bold text-ink/60">Zara (Age 7) · ₦2,000 Budget</p>
                <p className="mt-2 text-sm sm:text-base font-semibold text-ink leading-relaxed">
                  &ldquo;Zara must buy ingredients for family dinner within ₦2,000, keeping ₦200 for transport. When tomato prices increase by ₦150, what should she adjust?&rdquo;
                </p>
              </div>
              <div className="mt-6 space-y-2 text-xs text-ink/80">
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-berry shrink-0" aria-hidden="true" />
                  <span><strong>Calculates:</strong> ₦600 + ₦700 + ₦450 = ₦1,750 subtracted from ₦2,000.</span>
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-berry shrink-0" aria-hidden="true" />
                  <span><strong>Decides:</strong> Swaps one vegetable to preserve the ₦200 bus reserve.</span>
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-berry shrink-0" aria-hidden="true" />
                  <span><strong>Explains:</strong> Articulates why walking in the sun is unsafe for Zara.</span>
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-berry/20 text-xs font-semibold text-berry">
              Core arithmetic practiced inside living context, conscious trade-offs, and verbal articulation.
            </div>
          </div>
        </div>
      </section>

      {/* Section E: What ThinkLab Is NOT */}
      <section
        aria-labelledby="boundaries-heading"
        className="mt-12 sm:mt-16 rounded-3xl border border-rose-200 bg-rose-50/50 p-7 sm:p-10"
      >
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-800">
          <XCircle className="size-4 shrink-0 text-rose-700" aria-hidden="true" />
          <span>Product Boundaries & Safety</span>
        </div>
        <h2 id="boundaries-heading" className="mt-3 font-display text-2xl sm:text-3xl font-bold text-ink">
          What ThinkLab is explicitly NOT.
        </h2>
        <p className="mt-3 text-sm sm:text-base leading-relaxed text-ink/80">
          Clarifying our boundaries is just as important as stating our vision. To protect children and maintain ethical integrity, ThinkLab firmly excludes:
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {[
            {
              title: "NOT a School Replacement",
              desc: "Classroom instruction, physical community, and teacher guidance are irreplaceable.",
            },
            {
              title: "NOT a Free-Form Chatbot",
              desc: "No open-ended LLM browsing or unsupervised conversational bots for children.",
            },
            {
              title: "NOT an Intelligence / IQ Scorer",
              desc: "We never assign fixed IQ numbers, predictive talent percentages, or ability ceilings.",
            },
            {
              title: "NOT a Labeling System",
              desc: "No pigeonholing terms like 'gifted' or 'weak'. Observations are contextual to each activity.",
            },
            {
              title: "NOT a Digital Worksheet Mill",
              desc: "No endless multiple-choice drills designed for passive clicking or superficial speed.",
            },
            {
              title: "NOT an LMS / Admin Portal",
              desc: "Built around child curiosity and observable evidence, not bureaucratic institutional forms.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-rose-200/80 bg-white p-4 shadow-2xs">
              <span className="text-xs font-bold text-rose-800 block">{item.title}</span>
              <p className="mt-1 text-xs leading-relaxed text-ink/75">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA — Sequence to How It Works */}
      <footer className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-3xl border border-ink/10 bg-white p-6 sm:p-8 shadow-soft">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-berry">Next Chapter</span>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-ink mt-0.5">
            See the 8-Stage Learning Loop in Action
          </h3>
          <p className="text-xs sm:text-sm text-ink/70 mt-1">
            Discover how Explore → Think → Attempt → Explain → Feedback → Adapt → Create → Master works.
          </p>
        </div>

        <Link
          href="/how-it-works"
          className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-berry shrink-0 focus-visible:outline focus-visible:outline-4 focus-visible:outline-berry"
        >
          <span>Explore How It Works</span>
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </footer>
    </div>
  );
}
