import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Sparkles } from "lucide-react";
import { LogicGame } from "@/components/logic-game";
import { MissionDemo } from "@/components/mission-demo";
import { getLearner } from "@/data/learners";

export default async function LearnerExperiencePage({ params }: { params: Promise<{ learnerId: string }> }) {
  const { learnerId } = await params;
  const learner = getLearner(learnerId);
  if (!learner) notFound();
  return <div className="mx-auto max-w-5xl px-5 py-12 sm:py-16"><Link href="/learners" className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-bold text-berry hover:bg-sky focus-visible:outline focus-visible:outline-4 focus-visible:outline-berry"><ArrowLeft aria-hidden="true" size={17} /> All learners</Link><div className="mt-8"><p className="text-sm font-bold uppercase tracking-[0.18em] text-berry">Age {learner.age} · {learner.focus}</p><h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">{learner.name}&apos;s learning world</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-ink/70">{learner.interaction}. {learner.description}</p></div><div className="mt-10 space-y-6">{learner.id === "zara" && <MissionDemo learner={learner} />}{learner.id === "tobi" && <LogicGame />}{learner.status === "demo" && <div className="rounded-3xl bg-mango p-6 sm:p-8"><Sparkles aria-hidden="true" size={25} /><h2 className="mt-4 font-display text-2xl font-bold">A demo possibility</h2><p className="mt-3 max-w-2xl leading-7">This learner is part of the product direction. The hackathon keeps the experience intentionally small so Zara and Tobi can be genuinely functional first.</p></div>}</div></div>;
}
