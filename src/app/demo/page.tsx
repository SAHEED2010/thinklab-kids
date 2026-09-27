import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Brain, Bot, Compass, HeartHandshake, Sparkles, Store } from "lucide-react";
import { StatusBadge } from "@/components/status-badge";

export const metadata: Metadata = {
  title: "Judge Demo · ThinkLab Kids",
  description: "A guided route through ThinkLab Kids' live learning experiences, evidence preview, and product vision.",
};

const linkClass = "inline-flex min-h-12 items-center justify-between gap-3 rounded-2xl bg-ink px-5 py-3 font-bold text-white transition hover:bg-berry focus-visible:outline focus-visible:outline-4 focus-visible:outline-berry";

export default function DemoPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
      <div className="max-w-3xl">
        <p className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-white">
          <Sparkles className="size-3.5 text-mango" aria-hidden="true" />
          Judge &amp; family route
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">See the ThinkLab idea in one guided run.</h1>
        <p className="mt-5 text-lg leading-8 text-ink/70">
          Follow the steps in order. Start with the learning problem, try the working child experiences, inspect the evidence view, then explore the broader product direction.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl border border-ink/10 bg-white p-4 shadow-2xs" aria-label="Demo status legend">
        <span className="text-sm font-bold text-ink/70">Status:</span>
        <StatusBadge status="live" size="sm" />
        <StatusBadge status="preview" size="sm" />
        <StatusBadge status="coming-soon" size="sm" />
      </div>

      <nav aria-label="Guided demo route" className="mt-10 space-y-5">
        <article className="rounded-3xl border border-ink/10 bg-white p-5 shadow-soft sm:p-7">
          <div className="flex items-start gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-mango"><Brain aria-hidden="true" size={24} /></span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3"><p className="text-sm font-bold uppercase tracking-[0.18em] text-berry">Step 1 · Start with the problem</p><StatusBadge status="live" size="sm" /></div>
              <h2 className="mt-2 font-display text-2xl font-bold">Why ThinkLab exists</h2>
              <p className="mt-2 leading-7 text-ink/70">See the foundation gap, the ThinkLab thesis, and why reasoning belongs beside ordinary maths practice.</p>
              <Link href="/why" className={`${linkClass} mt-5 w-full sm:w-auto`}><span>Read the problem &amp; thesis</span><ArrowRight aria-hidden="true" size={18} /></Link>
            </div>
          </div>
        </article>

        <article className="rounded-3xl border-2 border-leaf/50 bg-leaf/15 p-5 shadow-soft sm:p-7">
          <div className="flex items-start gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-leaf"><Store aria-hidden="true" size={24} /></span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3"><p className="text-sm font-bold uppercase tracking-[0.18em] text-berry">Step 2 · Try the child journey</p><StatusBadge status="live" size="sm" /></div>
              <h2 className="mt-2 font-display text-2xl font-bold">Zara&apos;s Market Mission</h2>
              <p className="mt-2 leading-7 text-ink/70">Solve a contextual money problem, explain your thinking, see the next challenge adapt, and finish on Learning Evidence. The journey has a safe local fallback when Qwen is unavailable.</p>
              <Link href="/learn/zara" className={`${linkClass} mt-5 w-full sm:w-auto`}><span>Run Zara&apos;s mission</span><ArrowRight aria-hidden="true" size={18} /></Link>
            </div>
          </div>
        </article>

        <article className="rounded-3xl border-2 border-sky-400 bg-sky/25 p-5 shadow-soft sm:p-7">
          <div className="flex items-start gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-sky"><Bot aria-hidden="true" size={24} /></span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3"><p className="text-sm font-bold uppercase tracking-[0.18em] text-berry">Step 3 · Continue with thinking games</p><StatusBadge status="live" size="sm" /></div>
              <h2 className="mt-2 font-display text-2xl font-bold">Tobi&apos;s Code Quest</h2>
              <p className="mt-2 leading-7 text-ink/70">Guide a robot with deterministic instructions, then see the Strategy &amp; Word Arena preview and its playable Word Chain sample.</p>
              <Link href="/learn/tobi" className={`${linkClass} mt-5 w-full sm:w-auto`}><span>Play Tobi &amp; explore arenas</span><ArrowRight aria-hidden="true" size={18} /></Link>
            </div>
          </div>
        </article>

        <article className="rounded-3xl border border-ink/10 bg-white p-5 shadow-soft sm:p-7">
          <div className="flex items-start gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-berry text-white"><HeartHandshake aria-hidden="true" size={24} /></span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3"><p className="text-sm font-bold uppercase tracking-[0.18em] text-berry">Step 4 · Inspect the evidence</p><StatusBadge status="preview" size="sm" /></div>
              <h2 className="mt-2 font-display text-2xl font-bold">Parent Preview</h2>
              <p className="mt-2 leading-7 text-ink/70">Review a synthetic, fictional learner view focused on observable strategies, explanations, and next steps rather than permanent ability labels.</p>
              <Link href="/parent" className={`${linkClass} mt-5 w-full sm:w-auto`}><span>Open Parent Preview</span><ArrowRight aria-hidden="true" size={18} /></Link>
            </div>
          </div>
        </article>

        <article className="rounded-3xl border border-ink/10 bg-paper p-5 shadow-soft sm:p-7">
          <div className="flex items-start gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-mango"><Compass aria-hidden="true" size={24} /></span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3"><p className="text-sm font-bold uppercase tracking-[0.18em] text-berry">Step 5 · Look ahead</p><StatusBadge status="preview" size="sm" /><StatusBadge status="coming-soon" size="sm" /></div>
              <h2 className="mt-2 font-display text-2xl font-bold">From today&apos;s slices to a wider learning world</h2>
              <p className="mt-2 leading-7 text-ink/70">See the learning loop, developmental stages, learning worlds, and honest boundaries between what works now and what remains future work.</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <Link href="/how-it-works" className="inline-flex min-h-12 items-center justify-between gap-2 rounded-2xl border-2 border-ink/15 px-4 py-3 font-bold text-ink transition hover:border-berry focus-visible:outline focus-visible:outline-4 focus-visible:outline-berry"><span>How it works</span><ArrowRight aria-hidden="true" size={17} /></Link>
                <Link href="/ages" className="inline-flex min-h-12 items-center justify-between gap-2 rounded-2xl border-2 border-ink/15 px-4 py-3 font-bold text-ink transition hover:border-berry focus-visible:outline focus-visible:outline-4 focus-visible:outline-berry"><span>Ages 4–14</span><ArrowRight aria-hidden="true" size={17} /></Link>
                <Link href="/worlds" className="inline-flex min-h-12 items-center justify-between gap-2 rounded-2xl border-2 border-ink/15 px-4 py-3 font-bold text-ink transition hover:border-berry focus-visible:outline focus-visible:outline-4 focus-visible:outline-berry"><span>Learning worlds</span><ArrowRight aria-hidden="true" size={17} /></Link>
              </div>
            </div>
          </div>
        </article>
      </nav>
    </div>
  );
}
