import React from "react";
import {
  Brain,
  MessageSquare,
  Sparkles,
  HelpCircle,
  Compass,
  BookOpen,
  Calendar,
  CheckCircle2,
  Heart,
  Target,
} from "lucide-react";
import type { ParentEvidenceRecord } from "@/data/parent-preview";

interface EvidenceCardProps {
  evidence: ParentEvidenceRecord;
}

export function EvidenceCard({ evidence }: EvidenceCardProps) {
  return (
    <article
      id={`panel-${evidence.learnerId}`}
      role="tabpanel"
      aria-labelledby={`tab-${evidence.learnerId}`}
      className="rounded-3xl border-2 border-ink/10 bg-white p-6 sm:p-9 shadow-soft"
    >
      {/* Header: Session & Activity Meta */}
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-ink/10 pb-6">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-berry/10 px-3 py-1 text-xs font-bold text-berry">
              {evidence.worldName}
            </span>
            <span className="flex items-center gap-1 text-xs font-semibold text-ink/60">
              <Calendar className="size-3.5" aria-hidden="true" />
              {evidence.sessionTime}
            </span>
          </div>
          <h2 className="mt-3 font-display text-2xl sm:text-3xl font-bold text-ink">
            {evidence.activityTitle}
          </h2>
          <p className="mt-1 text-sm font-semibold text-ink/75">
            Learner: <strong className="text-ink">{evidence.learnerName}</strong> (Age {evidence.learnerAge}) · Focus: {evidence.learnerFocus}
          </p>
        </div>

        <span className="rounded-full bg-sky border border-sky-300 px-3.5 py-1 text-xs font-bold text-ink">
          Synthetic Specimen
        </span>
      </div>

      {/* Today's Decision / Problem Faced */}
      <div className="mt-6 rounded-2xl border border-mango/40 bg-mango/15 p-4 sm:p-5">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink">
          <Target className="size-4 text-berry shrink-0" aria-hidden="true" />
          <span>Decision & Challenge Faced Today</span>
        </div>
        <p className="mt-2 text-sm sm:text-base font-semibold leading-relaxed text-ink">
          {evidence.problemFaced}
        </p>
      </div>

      {/* Grid of Evidence Pillars */}
      <div className="mt-6 space-y-6">
        {/* Row 1: Academic Foundation & Approach */}
        <div className="grid gap-5 md:grid-cols-2">
          {/* Foundation */}
          <div className="rounded-2xl border border-ink/10 bg-paper p-5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-berry">
              <BookOpen className="size-4 shrink-0" aria-hidden="true" />
              <span>Academic Foundation Practised</span>
            </div>
            <h3 className="mt-2 text-base font-bold text-ink">
              {evidence.academicFoundation.concept}
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-ink/75 leading-relaxed">
              {evidence.academicFoundation.details}
            </p>
          </div>

          {/* Approach Strategy */}
          <div className="rounded-2xl border border-ink/10 bg-paper p-5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink/70">
              <Compass className="size-4 shrink-0 text-berry" aria-hidden="true" />
              <span>How They Approached the Task</span>
            </div>
            <h3 className="mt-2 text-base font-bold text-ink">Observed Strategy</h3>
            <p className="mt-1.5 text-xs sm:text-sm text-ink/75 leading-relaxed">
              {evidence.approachStrategy}
            </p>
          </div>
        </div>

        {/* Row 2: Observable Reasoning & Explanation */}
        <div className="grid gap-5 md:grid-cols-2">
          {/* Reasoning */}
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
              <Brain className="size-4 shrink-0" aria-hidden="true" />
              <span>Observable Reasoning Evidence</span>
            </div>
            <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-emerald-950 font-medium">
              &ldquo;{evidence.reasoningObserved}&rdquo;
            </p>
          </div>

          {/* Explanation */}
          <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800">
              <MessageSquare className="size-4 shrink-0" aria-hidden="true" />
              <span>Verbal Explanation Captured</span>
            </div>
            <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-amber-950 font-medium italic">
              {evidence.explanationObserved}
            </p>
          </div>
        </div>

        {/* Row 3: Support Needed (Respectful, constructive, non-deficit) */}
        <div className="rounded-2xl border border-sky-300 bg-sky/35 p-5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink/80">
            <HelpCircle className="size-4 text-berry shrink-0" aria-hidden="true" />
            <span>Support & Guidance Needed</span>
          </div>
          <p className="mt-2 text-sm sm:text-base text-ink/85 leading-relaxed">
            {evidence.supportNeeded}
          </p>
          <p className="mt-2 text-xs text-ink/60">
            Prompts and iterative attempts reflect natural learning curves. We describe where assistance was helpful rather than assigning deficit labels.
          </p>
        </div>

        {/* Row 4: Recommended Next Experience */}
        <div className="rounded-2xl border-2 border-leaf/70 bg-gradient-to-r from-leaf/20 to-paper p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-900">
              <Sparkles className="size-4 text-emerald-700 shrink-0" aria-hidden="true" />
              <span>Next Recommended Experience · {evidence.nextRecommendedStep.suggestedWorld}</span>
            </div>
          </div>
          <h3 className="mt-2 font-display text-lg font-bold text-ink">
            {evidence.nextRecommendedStep.action}
          </h3>
          <p className="mt-1 text-sm text-ink/80 leading-relaxed">
            {evidence.nextRecommendedStep.context}
          </p>
        </div>

        {/* Row 5: Conversation Starter for Parents at Home */}
        <div className="rounded-2xl border border-berry/20 bg-berry/5 p-5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-berry">
            <Heart className="size-4 shrink-0" aria-hidden="true" />
            <span>Home Conversation Starter for Parents</span>
          </div>
          <p className="mt-2 text-sm sm:text-base font-semibold text-ink italic leading-relaxed">
            {evidence.homeConversationPrompt}
          </p>
          <p className="mt-1 text-xs text-ink/60">
            A natural question you can ask at dinner or after school to spark your child&apos;s own reflection on their reasoning.
          </p>
        </div>

        {/* Row 6: Recent Interests & Ethics Footer */}
        <div className="border-t border-ink/10 pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-ink/70">Recently engaged with:</span>
            {evidence.recentInterests.map((interest) => (
              <span
                key={interest}
                className="rounded-lg bg-paper border border-ink/10 px-2.5 py-1 text-xs font-semibold text-ink"
              >
                {interest}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1.5 text-xs text-ink/60">
            <CheckCircle2 className="size-4 text-emerald-600 shrink-0" aria-hidden="true" />
            <span>Descriptive activity evidence · Zero permanent labels</span>
          </div>
        </div>
      </div>
    </article>
  );
}
