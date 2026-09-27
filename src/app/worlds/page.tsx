import Link from "next/link";
import type { Route } from "next";
import { ArrowRight, Bot, Store, Telescope } from "lucide-react";

const worlds = [
  { icon: Store, title: "Market mission", text: "Zara uses maths, reasons through choices and explains her thinking.", href: "/learn/zara", color: "bg-leaf" },
  { icon: Bot, title: "Robot route", text: "Tobi practises sequencing by giving a robot a precise program.", href: "/learn/tobi", color: "bg-sky" },
  { icon: Telescope, title: "More worlds ahead", text: "Creative, strategic and real-world challenges will grow with the team.", href: "/learners", color: "bg-mango" },
];

export default function WorldsPage() {
  return <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16"><p className="text-sm font-bold uppercase tracking-[0.18em] text-berry">Learning worlds</p><h1 className="mt-3 max-w-2xl font-display text-4xl font-bold tracking-tight sm:text-5xl">Different ways to learn by doing.</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-ink/70">A world is a context for a learner to explore, make choices and show their thinking.</p><div className="mt-10 grid gap-5 md:grid-cols-3">{worlds.map(({ icon: Icon, title, text, href, color }) => <Link key={title} href={href as Route} className={"rounded-3xl p-6 shadow-soft transition hover:-translate-y-1 focus-visible:outline focus-visible:outline-4 focus-visible:outline-berry " + color}><Icon aria-hidden="true" size={27} /><h2 className="mt-8 font-display text-2xl font-bold">{title}</h2><p className="mt-3 min-h-20 leading-7">{text}</p><span className="mt-5 inline-flex items-center gap-2 font-bold">Explore <ArrowRight aria-hidden="true" size={18} /></span></Link>)}</div></div>;
}
