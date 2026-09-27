"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Layers, Compass, Brain, ArrowRight } from "lucide-react";

interface Stage {
  id: string;
  range: string;
  title: string;
  badgeColor: string;
  borderColor: string;
  bgColor: string;
  summary: string;
  interactions: string[];
  keyCapabilities: string[];
  representativeMission: {
    title: string;
    description: string;
  };
}

const stages: Stage[] = [
  {
    id: "explore",
    range: "Ages 4–5",
    title: "Explore",
    badgeColor: "bg-mango text-ink",
    borderColor: "border-mango/60",
    bgColor: "from-mango/15 to-white",
    summary: "Sensory curiosity and foundational pattern noticing. Minimal typing; driven by voice, touch, and guided imagery.",
    interactions: ["Listen & speak", "Tap & drag", "Count & match", "Pattern recognition", "Visual sequencing", "Imaginative play"],
    keyCapabilities: ["Early number sense", "Spatial intuition", "Expressive verbalization", "Curiosity prompts"],
    representativeMission: {
      title: "Amara's Animal Sound & Pattern Parade",
      description: "Match spoken village animal calls to footprints, group fruit in baskets of two, and describe what changed.",
    },
  },
  {
    id: "build",
    range: "Ages 6–8",
    title: "Build",
    badgeColor: "bg-sky text-ink",
    borderColor: "border-sky-300",
    bgColor: "from-sky/20 to-white",
    summary: "Solidifying literacy and numeracy through applied, real-world Nigerian missions and deterministic computational logic.",
    interactions: ["Real-world missions", "Sequence programming", "Guided explanations", "Numeracy in context", "Simple strategy", "Mistake debugging"],
    keyCapabilities: ["Multi-digit practical arithmetic", "Algorithmic sequencing", "Cause-and-effect reasoning", "Explaining tradeoffs verbally"],
    representativeMission: {
      title: "Zara's Market Budget & Tobi's Robot Sequencing",
      description: "Navigate market price changes within a ₦2,000 allowance, then order instructions sequentially to guide Tobi's robot to the goal.",
    },
  },
  {
    id: "challenge",
    range: "Ages 9–11",
    title: "Challenge",
    badgeColor: "bg-leaf/80 text-ink",
    borderColor: "border-leaf",
    bgColor: "from-leaf/20 to-white",
    summary: "Tackling open-ended dilemmas, strategic multi-step planning, scientific predictions, and financial reasoning.",
    interactions: ["Open-ended investigations", "Strategic games (Chess / X-and-O)", "Hypothesis testing", "Constraint budgeting", "Structured writing & speech"],
    keyCapabilities: ["Tactical consequence mapping", "Scientific observation", "Financial reasoning", "Evaluating trade-offs"],
    representativeMission: {
      title: "David & Favour's Community Solar & Strategy Arena",
      description: "Calculate household solar inverter capacity during seasonal outages, and anticipate 3 opponent moves in Strategy Arena.",
    },
  },
  {
    id: "launch",
    range: "Ages 12–14",
    title: "Launch",
    badgeColor: "bg-berry text-white",
    borderColor: "border-berry/40",
    bgColor: "from-berry/15 to-white",
    summary: "Fostering teenage agency, extended project investigations, entrepreneurship, debate, and collaborative building.",
    interactions: ["Deep independent research", "Long-term builds", "Debate & argumentation", "Civic / enterprise simulations", "Portfolio creation"],
    keyCapabilities: ["Computational systems design", "Entrepreneurial modeling", "Collaborative problem solving", "Evidence-based argumentation"],
    representativeMission: {
      title: "Local Logistics Optimization & Civic Project",
      description: "Model waste-collection routes for a local council ward, simulate operating costs, and publish a project brief for peers.",
    },
  },
];

export function AgeStages() {
  const [activeStageId, setActiveStageId] = useState<string>("build");

  const currentStage = stages.find((s) => s.id === activeStageId) ?? stages[1];

  return (
    <section aria-labelledby="stages-heading" className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
      <div className="text-center max-w-3xl mx-auto">
        <p className="inline-flex items-center gap-2 rounded-full bg-berry/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-berry">
          <Layers className="size-3.5" aria-hidden="true" />
          The Developmental Continuum
        </p>
        <h2 id="stages-heading" className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl text-ink">
          One continuous world growing with the child from ages 4 to 14.
        </h2>
        <p className="mt-4 text-base sm:text-lg leading-relaxed text-ink/75">
          Children do not learn the same way at age 5 as they do at age 13. ThinkLab evolves cognitive depth, typing demands, autonomy, and collaboration across four integrated stages.
        </p>
      </div>

      {/* Stage Selector Tabs for all viewports */}
      <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stages.map((stage) => {
          const isActive = stage.id === activeStageId;
          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => setActiveStageId(stage.id)}
              className={`rounded-2xl p-4 text-left transition-all border ${
                isActive
                  ? `${stage.borderColor} bg-white shadow-soft ring-2 ring-berry/20 -translate-y-0.5`
                  : "border-ink/10 bg-white/60 hover:bg-white hover:border-ink/20"
              }`}
            >
              <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${stage.badgeColor}`}>
                {stage.range}
              </span>
              <p className="mt-2 font-display text-lg font-bold text-ink">{stage.title}</p>
              <p className="mt-1 text-xs text-ink/65 line-clamp-2">{stage.summary}</p>
            </button>
          );
        })}
      </div>

      {/* Expanded Active Stage Detail Card */}
      <div
        className={`mt-6 rounded-3xl border-2 ${currentStage.borderColor} bg-gradient-to-b ${currentStage.bgColor} p-6 sm:p-10 shadow-soft transition-all`}
      >
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-ink/10">
          <div>
            <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${currentStage.badgeColor}`}>
              {currentStage.range} Stage
            </span>
            <h3 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-ink">
              Stage {stages.findIndex((s) => s.id === currentStage.id) + 1}: {currentStage.title}
            </h3>
          </div>
          <p className="max-w-md text-sm sm:text-base text-ink/80">{currentStage.summary}</p>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {/* Column 1: Interaction modalities */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-berry flex items-center gap-1.5">
              <Compass className="size-4" aria-hidden="true" />
              Interaction Modalities
            </h4>
            <div className="mt-4 flex flex-wrap gap-2">
              {currentStage.interactions.map((item) => (
                <span
                  key={item}
                  className="rounded-xl border border-ink/10 bg-white/90 px-3 py-1.5 text-xs font-semibold text-ink shadow-2xs"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Column 2: Cognitive Foundations */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-berry flex items-center gap-1.5">
              <Brain className="size-4" aria-hidden="true" />
              Cognitive Focus
            </h4>
            <ul className="mt-4 space-y-2 text-xs sm:text-sm text-ink/80">
              {currentStage.keyCapabilities.map((cap) => (
                <li key={cap} className="flex items-start gap-2">
                  <span className="size-1.5 rounded-full bg-berry mt-2 shrink-0" />
                  <span>{cap}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Representative Experience */}
          <div className="rounded-2xl border border-ink/10 bg-white/90 p-5 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-ink/50">Example Experience</span>
            <h4 className="mt-1 font-display text-base font-bold text-ink">{currentStage.representativeMission.title}</h4>
            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-ink/75">
              {currentStage.representativeMission.description}
            </p>
          </div>
        </div>

        {/* Link to full ages page */}
        <div className="mt-8 pt-6 border-t border-ink/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
          <span className="text-ink/70 font-medium">Explore interactions, capabilities, and canonical worlds across all 4 stages.</span>
          <Link
            href="/ages"
            className="inline-flex items-center gap-1.5 font-bold text-berry hover:underline shrink-0"
          >
            <span>View complete Ages 4–14 developmental deep dive</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
