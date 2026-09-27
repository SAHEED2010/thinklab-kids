import { ChallengePreviews } from "@/components/challenge-previews";
import { SeedGameChallenge } from "@/components/seed-game-challenge";
import { StatusBadge } from "@/components/status-badge";

// Challenge Arena is a preview: the Seed Game is a playable sample,
// the other experiences are static previews or coming soon.
export function ChallengeArena() {
  return (
    <section className="rounded-3xl border border-ink/10 bg-white p-5 shadow-soft sm:p-8" aria-labelledby="challenge-heading">
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-berry">Strategy &amp; Persistence</p>
          <StatusBadge status="preview" />
        </div>
        <h2 id="challenge-heading" className="mt-2 font-display text-3xl font-bold">Challenge Arena</h2>
        <p className="mt-2 leading-7 text-ink/70">
          A first look at the arena. The Seed Game is ready to play. The other challenges are previews.
        </p>
      </div>
      <div className="space-y-10">
        <SeedGameChallenge />
        <ChallengePreviews />
      </div>
    </section>
  );
}
