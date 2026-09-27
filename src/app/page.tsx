import Link from "next/link";
import { ArrowRight, Brain, Lightbulb, Orbit } from "lucide-react";

const principles = [
  { icon: Brain, title: "Think deeply", text: "Practice reasoning, communication and problem-solving alongside academic foundations." },
  { icon: Lightbulb, title: "Make it matter", text: "Meet ideas inside familiar stories, decisions and creative challenges." },
  { icon: Orbit, title: "Grow through feedback", text: "Try, explain, adapt and create—not just complete a score." },
];

export default function HomePage() {
  return <div>
    <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-16 md:grid-cols-[1.1fr_0.9fr] md:items-center md:pt-24">
      <div><p className="inline-flex rounded-full bg-mango px-4 py-2 text-sm font-bold">Explore · Think · Create</p><h1 className="mt-6 max-w-3xl font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl">A brighter way to practise thinking.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-ink/70">ThinkLab Kids is a mobile-first learning environment for African children. It complements school by making space for curiosity, reasoning, communication and creative problem-solving.</p><div className="mt-8 flex flex-wrap gap-3"><Link href="/learners" className="inline-flex min-h-12 items-center gap-3 rounded-full bg-ink px-5 py-3 font-bold text-white hover:bg-berry focus-visible:outline focus-visible:outline-4 focus-visible:outline-berry">Choose a learner <ArrowRight aria-hidden="true" size={19} /></Link><Link href="/worlds" className="inline-flex min-h-12 items-center rounded-full border-2 border-ink/15 px-5 py-3 font-bold hover:border-berry focus-visible:outline focus-visible:outline-4 focus-visible:outline-berry">See learning worlds</Link></div></div>
      <div className="relative rounded-[2.5rem] bg-sky p-7 shadow-soft sm:p-10"><div className="absolute -right-3 -top-4 rotate-3 rounded-2xl bg-coral px-4 py-3 text-sm font-bold text-white">Big questions welcome</div><div className="rounded-[2rem] bg-white p-6"><p className="text-sm font-bold uppercase tracking-[0.18em] text-berry">The learning loop</p><p className="mt-5 font-display text-3xl font-bold leading-tight">Explore → Think → Attempt → Explain → Adapt</p><p className="mt-5 leading-7 text-ink/70">Every answer is a chance to understand how an idea is growing.</p></div></div>
    </section>
    <section className="mx-auto grid max-w-6xl gap-4 px-5 pb-20 md:grid-cols-3">{principles.map(({ icon: Icon, title, text }) => <div key={title} className="rounded-3xl border border-ink/10 bg-white p-6"><Icon aria-hidden="true" className="text-berry" size={25} /><h2 className="mt-5 font-display text-xl font-bold">{title}</h2><p className="mt-2 leading-7 text-ink/70">{text}</p></div>)}</section>
  </div>;
}
