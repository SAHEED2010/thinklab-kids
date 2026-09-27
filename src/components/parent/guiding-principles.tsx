import React from "react";
import { ShieldCheck, XCircle, CheckCircle2, MessageCircle } from "lucide-react";

export function GuidingPrinciples() {
  return (
    <section
      aria-labelledby="principles-heading"
      className="mt-16 rounded-3xl border border-ink/10 bg-paper p-6 sm:p-10"
    >
      <div className="max-w-3xl">
        <p className="inline-flex items-center gap-1.5 rounded-full bg-berry/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.16em] text-berry">
          <ShieldCheck className="size-3.5" aria-hidden="true" />
          Our Ethical Promise to Families
        </p>
        <h2
          id="principles-heading"
          className="mt-3 font-display text-2xl sm:text-3xl font-bold text-ink"
        >
          Why we show observable evidence rather than single-number grades.
        </h2>
        <p className="mt-3 text-sm sm:text-base leading-relaxed text-ink/75">
          Traditional report cards reduce an entire week of mental effort into a sterile number like &ldquo;Maths: 82%&rdquo;. That tells a parent nothing about whether their child guessed, froze under pressure, or developed a clever problem-solving approach.
        </p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {/* What We Refuse to Do */}
        <div className="rounded-2xl border border-rose-200 bg-rose-50/70 p-5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-800">
            <XCircle className="size-4 shrink-0" aria-hidden="true" />
            <span>What ThinkLab NEVER does:</span>
          </div>
          <ul className="mt-3 space-y-2 text-xs sm:text-sm text-rose-950">
            <li>• <strong>No IQ scores or intelligence rankings:</strong> Intelligence is not a single, fixed number.</li>
            <li>• <strong>No &ldquo;gifted&rdquo; or &ldquo;weak&rdquo; labels:</strong> We never permanently pigeonhole any child.</li>
            <li>• <strong>No fake capability percentages:</strong> No arbitrary &ldquo;85% creativity&rdquo; or &ldquo;72% reasoning&rdquo; metrics.</li>
            <li>• <strong>No surveillance or data selling:</strong> Built with data minimization; hackathon testing uses synthetic data only.</li>
          </ul>
        </div>

        {/* What We Provide Instead */}
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-900">
            <CheckCircle2 className="size-4 shrink-0" aria-hidden="true" />
            <span>What ThinkLab provides instead:</span>
          </div>
          <ul className="mt-3 space-y-2 text-xs sm:text-sm text-emerald-950">
            <li>• <strong>Specific, observed actions:</strong> What choices were considered and tested during this activity.</li>
            <li>• <strong>Captured explanations:</strong> How your child articulated their thinking in their own words.</li>
            <li>• <strong>Constructive support areas:</strong> Where a prompt was needed, framed as guidance, not failure.</li>
            <li>• <strong>Home conversation starters:</strong> Thoughtful, natural questions you can ask together at home.</li>
          </ul>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-white p-4 sm:p-5 border border-ink/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-ink/75">
        <div className="flex items-center gap-2">
          <MessageCircle className="size-4 text-berry shrink-0" aria-hidden="true" />
          <span>
            <strong>Parent Tip:</strong> Ask your child about their reasoning rather than whether they got the right answer. Notice how their confidence grows when explaining <em>why</em>.
          </span>
        </div>
      </div>
    </section>
  );
}
