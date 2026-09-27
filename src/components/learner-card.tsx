import Link from "next/link";
import type { Route } from "next";
import { ArrowRight, CircleCheck, Sparkles } from "lucide-react";
import type { Learner } from "@/lib/types";

const colorClasses: Record<Learner["color"], string> = {
  mango: "bg-mango",
  sky: "bg-sky",
  leaf: "bg-leaf",
  berry: "bg-berry text-white",
  coral: "bg-coral text-white",
};

export function LearnerCard({ learner }: { learner: Learner }) {
  const isFunctional = learner.status === "functional";

  return (
    <article className={"flex h-full flex-col rounded-3xl p-5 shadow-soft " + colorClasses[learner.color]}>
      <div className="flex items-start justify-between gap-3">
        <div><p className="text-sm font-bold uppercase tracking-[0.18em] opacity-70">Age {learner.age}</p><h2 className="mt-1 font-display text-2xl font-bold">{learner.name}</h2></div>
        {isFunctional ? <CircleCheck aria-label="Functional demo" size={23} /> : <Sparkles aria-label="Demo concept" size={23} />}
      </div>
      <p className="mt-5 font-semibold">{learner.focus}</p>
      <p className="mt-2 flex-1 text-sm leading-6 opacity-80">{learner.description}</p>
      <Link href={("/learn/" + learner.id) as Route} className="mt-5 flex min-h-12 items-center justify-between rounded-2xl bg-white/80 px-4 py-3 font-bold text-ink transition hover:bg-white focus-visible:outline focus-visible:outline-4 focus-visible:outline-berry">
        {isFunctional ? "Explore experience" : "See possibility"} <ArrowRight aria-hidden="true" size={19} />
      </Link>
    </article>
  );
}
