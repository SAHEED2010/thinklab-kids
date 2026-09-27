import React from "react";
import Link from "next/link";
import {
  Compass,
  ArrowRight,
  Calculator,
  BookOpen,
  Bot,
  Gamepad2,
  Sparkles,
  FlaskConical,
  Palette,
  Store,
  HelpCircle,
  FolderGit2,
} from "lucide-react";
import { StatusBadge, type ProductStatus } from "@/components/status-badge";

interface WorldItem {
  id: string;
  name: string;
  category: string;
  status: ProductStatus;
  sliceBadge?: string;
  description: string;
  thinkingPillars: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  href?: string;
  ctaText?: string;
}

const worldsData: WorldItem[] = [
  {
    id: "number-lab",
    name: "Number Lab",
    category: "Maths & Quantitative Reasoning",
    status: "preview",
    sliceBadge: "Zara Mission Functional",
    description: "Multi-digit arithmetic, real budgeting, estimation, and numerical relationships applied to everyday life.",
    thinkingPillars: "Quantitative estimation · Calculation fluency · Number sense",
    icon: Calculator,
    accentColor: "bg-leaf/30 border-leaf/40",
    href: "/learn/zara",
    ctaText: "Try Zara's Math Slice",
  },
  {
    id: "code-quest",
    name: "Code Quest",
    category: "Computational Thinking",
    status: "preview",
    sliceBadge: "Tobi Game Functional",
    description: "Step-by-step sequencing and logic fundamentals, teaching children to give clear instructions to machines.",
    thinkingPillars: "Algorithmic thinking · Sequence precision · Step order",
    icon: Bot,
    accentColor: "bg-sky/50 border-sky-300",
    href: "/learn/tobi",
    ctaText: "Play Tobi's Sequencing Game",
  },
  {
    id: "life-missions",
    name: "Life Missions",
    category: "Real-World Decisions",
    status: "preview",
    sliceBadge: "Zara Mission Functional",
    description: "Everyday African contexts: market trade-offs, transportation choices, household budgeting, and everyday planning.",
    thinkingPillars: "Constraint reasoning · Trade-off analysis · Decision-making",
    icon: Store,
    accentColor: "bg-mango/40 border-mango/60",
    href: "/learn/zara",
    ctaText: "Try Zara's Market Slice",
  },
  {
    id: "strategy-arena",
    name: "Strategy Arena",
    category: "Consequence & Planning",
    status: "preview",
    description: "Multi-step puzzles, chess-inspired reasoning, X-and-O variants, and predicting an opponent's subsequent moves.",
    thinkingPillars: "Forward planning · Consequence mapping · Tactical depth",
    icon: Gamepad2,
    accentColor: "bg-purple-50 border-purple-200",
  },
  {
    id: "word-arena",
    name: "Word Arena",
    category: "Language & Scrabble Logic",
    status: "preview",
    description: "Scrabble-inspired tile play, root words, semantic puzzles, and playful vocabulary expansion in context.",
    thinkingPillars: "Vocabulary architecture · Word morphology · Verbal precision",
    icon: BookOpen,
    accentColor: "bg-amber-50 border-amber-200",
  },
  {
    id: "discovery-lab",
    name: "Discovery Lab",
    category: "Scientific Inquiry",
    status: "preview",
    description: "Testing hypotheses through prediction, controlled simulated experimentation, and systematic observation.",
    thinkingPillars: "Hypothesis testing · Empirical observation · Cause & effect",
    icon: FlaskConical,
    accentColor: "bg-emerald-50 border-emerald-200",
  },
  {
    id: "creator-studio",
    name: "Creator Studio",
    category: "Invention & Making",
    status: "preview",
    description: "Design prompts, visual invention, mechanism sketching, storytelling, and articulating why an artifact was designed.",
    thinkingPillars: "Design synthesis · Spatial creation · Expressive articulation",
    icon: Palette,
    accentColor: "bg-rose-50 border-rose-200",
  },
  {
    id: "story-studio",
    name: "Story Studio",
    category: "Narrative & Expression",
    status: "preview",
    description: "Cultural folk narratives, perspective-taking, creative writing branches, and explaining characters' motives.",
    thinkingPillars: "Narrative structure · Empathy & perspective · Expressive voice",
    icon: Sparkles,
    accentColor: "bg-indigo-50 border-indigo-200",
  },
  {
    id: "wonder",
    name: "Wonder",
    category: "Inquiry Engine",
    status: "preview",
    description: "Turns a child's spontaneous question ('Why does it rain only in the afternoon?') into an interactive thinking trail.",
    thinkingPillars: "Autonomous curiosity · Question formulation · Evidence search",
    icon: HelpCircle,
    accentColor: "bg-sky/30 border-sky-200",
  },
  {
    id: "projects",
    name: "Projects",
    category: "Extended Real-World Builds",
    status: "coming-soon",
    description: "Multi-week community investigations, micro-enterprise simulations, and building tangible proof-of-concept solutions.",
    thinkingPillars: "Longitudinal stamina · Systems thinking · Portfolio building",
    icon: FolderGit2,
    accentColor: "bg-stone-50 border-stone-200",
  },
];

export function WorldsShowcase() {
  return (
    <section aria-labelledby="worlds-heading" className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full bg-leaf/40 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-ink">
            <Compass className="size-3.5 text-emerald-800" aria-hidden="true" />
            Learning Worlds Architecture
          </p>
          <h2 id="worlds-heading" className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl text-ink">
            10 purpose-built arenas for deliberate practice.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-ink/75 leading-relaxed">
            In ThinkLab, capabilities are not abstract drills—they exist within rich, culturally respectful worlds. The broader worlds are preview architectures, with specific functional slices testable today through Zara and Tobi.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/worlds"
            className="inline-flex items-center gap-2 rounded-full border-2 border-ink/15 px-5 py-2.5 text-sm font-bold hover:border-berry focus-visible:outline focus-visible:outline-4 focus-visible:outline-berry transition"
          >
            <span>View Worlds Overview</span>
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {worldsData.map((world) => {
          const Icon = world.icon;

          return (
            <div
              key={world.id}
              className={`flex flex-col justify-between rounded-3xl border p-6 shadow-sm transition hover:shadow-soft ${world.accentColor}`}
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="rounded-2xl bg-white p-3 shadow-2xs border border-ink/10">
                    <Icon className="size-6 text-ink" />
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <StatusBadge status={world.status} size="sm" />
                    {world.sliceBadge && (
                      <span className="rounded-full bg-emerald-100 border border-emerald-300 px-2 py-0.5 text-[10px] font-bold text-emerald-900">
                        {world.sliceBadge}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-ink/60">
                    {world.category}
                  </span>
                  <h3 className="mt-1 font-display text-2xl font-bold text-ink">{world.name}</h3>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-ink/80">{world.description}</p>
              </div>

              <div className="mt-6 border-t border-ink/10 pt-4">
                <p className="text-[11px] font-semibold text-ink/65 italic">
                  Focus: {world.thinkingPillars}
                </p>

                {world.href ? (
                  <Link
                    href={world.href}
                    className="mt-4 flex items-center justify-between rounded-xl bg-ink px-4 py-2.5 text-xs font-bold text-white hover:bg-berry transition focus-visible:outline focus-visible:outline-4 focus-visible:outline-berry"
                  >
                    <span>{world.ctaText ?? "Explore Slice"}</span>
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                ) : (
                  <div className="mt-4 flex items-center justify-between rounded-xl bg-white/60 px-4 py-2 text-xs font-medium text-ink/60 border border-ink/10">
                    <span>{world.status === "preview" ? "Prototype in preview" : "Roadmap phase"}</span>
                    <span className="text-[10px] font-mono uppercase tracking-wider">Demo scope</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
