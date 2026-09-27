import { ArenaPreviews } from "@/components/arena-previews";
import { StatusBadge } from "@/components/status-badge";
import { WordChainGame } from "@/components/word-chain-game";

// Strategy & Word Arena is a preview: Word Chain is a playable sample,
// the other activities are static previews.
export function StrategyArena() {
  return (
    <section className="rounded-3xl border border-ink/10 bg-white p-5 shadow-soft sm:p-8" aria-labelledby="strategy-heading">
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-berry">Strategy &amp; Words</p>
          <StatusBadge status="preview" />
        </div>
        <h2 id="strategy-heading" className="mt-2 font-display text-3xl font-bold">Strategy &amp; Word Arena</h2>
        <p className="mt-2 leading-7 text-ink/70">
          A first look at the arena. Word Chain is ready to play. The other activities are previews.
        </p>
      </div>
      <div className="space-y-10">
        <WordChainGame />
        <ArenaPreviews />
      </div>
    </section>
  );
}
