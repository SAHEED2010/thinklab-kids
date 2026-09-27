import { LearnerCard } from "@/components/learner-card";
import { learners } from "@/data/learners";

export default function LearnersPage() {
  return <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16"><p className="text-sm font-bold uppercase tracking-[0.18em] text-berry">Choose your adventure</p><h1 className="mt-3 max-w-2xl font-display text-4xl font-bold tracking-tight sm:text-5xl">Meet the ThinkLab learners</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-ink/70">These fictional learners help us prototype different kinds of learning experiences while keeping hackathon testing synthetic and safe.</p><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{learners.map((learner) => <LearnerCard key={learner.id} learner={learner} />)}</div></div>;
}
