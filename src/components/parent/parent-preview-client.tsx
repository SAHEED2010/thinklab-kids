"use client";

import React, { useState } from "react";
import type { LearnerId } from "@/lib/types";
import { syntheticParentEvidence } from "@/data/parent-preview";
import { LearnerSwitcher } from "@/components/parent/learner-switcher";
import { EvidenceCard } from "@/components/parent/evidence-card";
import { GuidingPrinciples } from "@/components/parent/guiding-principles";
import { StatusBadge } from "@/components/status-badge";
import { HeartHandshake } from "lucide-react";

export function ParentPreviewClient() {
  const [selectedLearnerId, setSelectedLearnerId] = useState<LearnerId>("zara");

  const learnerOptions = syntheticParentEvidence.map((e) => ({
    id: e.learnerId,
    name: e.learnerName,
    age: e.learnerAge,
    focus: e.learnerFocus,
    colorClass: e.learnerColor,
  }));

  const activeEvidence =
    syntheticParentEvidence.find((e) => e.learnerId === selectedLearnerId) ??
    syntheticParentEvidence[0];

  return (
    <div className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
      {/* Top Banner: Status Transparency */}
      <div className="rounded-2xl border border-sky-300 bg-sky/40 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-3">
          <StatusBadge status="preview" size="md" />
          <p className="text-xs sm:text-sm text-ink/85 font-medium">
            <strong>Synthetic Parent Preview:</strong> Illustrative demonstration of observable learning evidence using fictional profiles. No real children&apos;s data or production tracking is active.
          </p>
        </div>
      </div>

      {/* Main Header */}
      <div className="mt-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-berry/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-berry">
          <HeartHandshake className="size-3.5" aria-hidden="true" />
          Parent & Guardian Insights
        </div>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl font-bold tracking-tight text-ink">
          What your child learned, reasoned, and explained today.
        </h1>
        <p className="mt-4 max-w-3xl text-base sm:text-lg leading-relaxed text-ink/75">
          See specific, observable evidence from today&apos;s learning sessions. Discover the strategies they tried, the explanations they gave, and how you can support their thinking at home.
        </p>
      </div>

      {/* Learner Switcher */}
      <div className="mt-10">
        <span className="text-xs font-bold uppercase tracking-wider text-ink/60 block mb-3">
          Select Fictional Demo Learner:
        </span>
        <LearnerSwitcher
          learners={learnerOptions}
          selectedLearnerId={selectedLearnerId}
          onSelect={setSelectedLearnerId}
        />
      </div>

      {/* Active Evidence Card */}
      <div className="mt-8">
        <EvidenceCard evidence={activeEvidence} />
      </div>

      {/* Guiding Principles & Ethics */}
      <GuidingPrinciples />
    </div>
  );
}
