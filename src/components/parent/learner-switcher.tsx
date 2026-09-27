"use client";

import React from "react";
import type { LearnerId } from "@/lib/types";

export interface LearnerOption {
  id: LearnerId;
  name: string;
  age: number;
  focus: string;
  colorClass: string;
}

interface LearnerSwitcherProps {
  learners: LearnerOption[];
  selectedLearnerId: LearnerId;
  onSelect: (id: LearnerId) => void;
}

const colorDotMap: Record<LearnerId, string> = {
  zara: "bg-emerald-500",
  tobi: "bg-sky-500",
  david: "bg-purple-600",
  amara: "bg-amber-500",
  favour: "bg-orange-500",
};

export function LearnerSwitcher({
  learners,
  selectedLearnerId,
  onSelect,
}: LearnerSwitcherProps) {
  return (
    <div
      className="flex flex-wrap gap-2.5"
      role="tablist"
      aria-label="Select learner profile"
    >
      {learners.map((learner) => {
        const isSelected = learner.id === selectedLearnerId;
        const dotColor = colorDotMap[learner.id] ?? "bg-stone-500";
        return (
          <button
            key={learner.id}
            id={`tab-${learner.id}`}
            role="tab"
            aria-selected={isSelected}
            aria-controls={`panel-${learner.id}`}
            type="button"
            onClick={() => onSelect(learner.id)}
            className={`flex items-center gap-2.5 rounded-2xl px-4 py-3 text-left transition-all border min-h-[48px] focus-visible:outline focus-visible:outline-4 focus-visible:outline-berry ${
              isSelected
                ? "border-ink bg-white shadow-soft ring-2 ring-berry/30 text-ink font-bold scale-[1.02]"
                : "border-ink/10 bg-white/70 hover:bg-white text-ink/75 font-medium hover:border-ink/20"
            }`}
          >
            <span
              className={`size-3 rounded-full ${dotColor} shrink-0`}
              aria-hidden="true"
            />
            <div>
              <span className="text-sm font-bold text-ink">{learner.name}</span>
              <span className="ml-1.5 text-xs text-ink/60">Age {learner.age}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
