import React from "react";
import { Gamepad2, Award, Shield, Sparkles, Brain, Users, Compass } from "lucide-react";

export function ChallengesSection() {
  return (
    <section aria-labelledby="challenges-heading" className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
      <div className="rounded-3xl border border-ink/15 bg-gradient-to-br from-paper via-white to-sky/20 p-8 sm:p-12 shadow-sm">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full bg-berry/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-berry">
            <Gamepad2 className="size-3.5" aria-hidden="true" />
            Games as Thinking Environments
          </p>
          <h2 id="challenges-heading" className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl text-ink">
            Puzzles and challenges: mental training grounds, not just entertainment.
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-ink/75">
            In ThinkLab, chess, X-and-O, word puzzles, and sequencing games are not frivolous time-wasters. They are controlled sandboxes where children learn to anticipate consequences, test hypotheses, and debug their own errors.
          </p>
        </div>

        {/* The 4 Challenge Formats */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-ink/10 bg-white p-5 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-berry">
              <Brain className="size-4" aria-hidden="true" />
              <span>Practice Problems</span>
            </div>
            <p className="mt-2 text-sm font-semibold text-ink">Voluntary & Self-Paced</p>
            <p className="mt-1.5 text-xs leading-relaxed text-ink/70">
              Low-stakes exploration with zero time pressure. Try alternative solutions without penalty.
            </p>
          </div>

          <div className="rounded-2xl border border-ink/10 bg-white p-5 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
              <Users className="size-4" aria-hidden="true" />
              <span>Community Problems</span>
            </div>
            <p className="mt-2 text-sm font-semibold text-ink">Shared Contexts</p>
            <p className="mt-1.5 text-xs leading-relaxed text-ink/70">
              Regional, culturally grounded challenges with multiple valid approaches solved by peer cohorts.
            </p>
          </div>

          <div className="rounded-2xl border border-ink/10 bg-white p-5 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-mango-800">
              <Compass className="size-4" aria-hidden="true" />
              <span>Daily / Weekly</span>
            </div>
            <p className="mt-2 text-sm font-semibold text-ink">Bite-Sized Missions</p>
            <p className="mt-1.5 text-xs leading-relaxed text-ink/70">
              Short 5-minute thinking prompts to build deliberate, consistent reasoning habits over time.
            </p>
          </div>

          <div className="rounded-2xl border border-ink/10 bg-white p-5 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-700">
              <Award className="size-4" aria-hidden="true" />
              <span>Competitions (Optional)</span>
            </div>
            <p className="mt-2 text-sm font-semibold text-ink">Beyond Mere Speed</p>
            <p className="mt-1.5 text-xs leading-relaxed text-ink/70">
              Future team challenges where strategy and justification are weighted far above reaction speed.
            </p>
          </div>
        </div>

        {/* Why Speed-Alone Competitions are Avoided */}
        <div className="mt-8 rounded-2xl border border-berry/20 bg-berry/5 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="font-display text-lg font-bold text-ink flex items-center gap-2">
                <Shield className="size-5 text-berry" aria-hidden="true" />
                How ThinkLab evaluates challenges: We reward depth, not fast clicking.
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-ink/75 max-w-2xl leading-relaxed">
                Conventional competitive games often reward response speed alone. ThinkLab recognizes other vital dimensions:
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 sm:gap-3">
            {[
              "Reasoning & Proof",
              "Creative Strategy",
              "Verbal Explanation",
              "Practical Feasibility",
              "Evidence Search",
              "Collaborative Teamwork",
            ].map((pillar) => (
              <span
                key={pillar}
                className="inline-flex items-center gap-1.5 rounded-xl border border-berry/30 bg-white px-3 py-1.5 text-xs font-bold text-ink shadow-2xs"
              >
                <Sparkles className="size-3 text-berry" aria-hidden="true" />
                {pillar}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
