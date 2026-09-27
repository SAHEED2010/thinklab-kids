"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Check, Compass, Home, Map, Sparkles, UserRound, WandSparkles } from "lucide-react";
import { useState } from "react";

type Reflection = "new" | "tricky" | "proud";

const activities = [
  {
    id: "zara",
    title: "Zara's Market Mission",
    description: "Choose wisely at the market and explain your thinking.",
    focus: "Maths + decisions",
    status: "Live",
    href: "/learn/zara",
    image: "/child-world/zara-market.webp",
    accent: "border-coral/40 bg-[#fff3ee]",
    arrow: "bg-coral",
  },
  {
    id: "tobi",
    title: "Tobi's Robot Route",
    description: "Give Tobi the clearest steps to find the star.",
    focus: "Logic + sequencing",
    status: "Live",
    href: "/learn/tobi",
    image: "/child-world/tobi-robot.webp",
    accent: "border-sky-300 bg-[#effaff]",
    arrow: "bg-sky-500",
  },
  {
    id: "garden",
    title: "Wonder Garden",
    description: "Notice tiny details and grow a world of ideas.",
    focus: "Explore + create",
    status: "Coming soon",
    href: "#coming-soon",
    image: "/child-world/wonder-garden.webp",
    accent: "border-violet-200 bg-[#f7f2ff]",
    arrow: "bg-violet-300",
  },
] as const;

const reflections: { id: Reflection; label: string; icon: string; color: string }[] = [
  { id: "new", label: "Something new", icon: "★", color: "bg-mango" },
  { id: "tricky", label: "Something tricky", icon: "⌁", color: "bg-leaf" },
  { id: "proud", label: "Something I’m proud of", icon: "♥", color: "bg-violet-200" },
];

export function ChildHome() {
  const [reflection, setReflection] = useState<Reflection | null>(null);

  return (
    <div className="child-world min-h-screen overflow-hidden bg-paper pb-24">
      <div className="mx-auto max-w-7xl px-4 pt-5 sm:px-8 sm:pt-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Hi, Sam! <span className="text-mango">✦</span></p>
            <p className="mt-1 text-sm font-semibold text-ink/60 sm:text-base">Great to see you.</p>
          </div>
          <Link href="/learners" className="hidden min-h-12 items-center gap-2 rounded-full border-2 border-ink/10 bg-white px-4 text-sm font-bold shadow-sm transition hover:border-berry hover:text-berry sm:flex">
            <UserRound className="size-4" aria-hidden="true" /> Meet the learners
          </Link>
        </div>

        <nav aria-label="Child space navigation" className="mt-6 flex justify-center sm:mt-0 sm:justify-end">
          <div className="flex w-full max-w-2xl items-center justify-between gap-1 rounded-full border border-ink/10 bg-white p-1.5 shadow-soft sm:w-auto sm:gap-2 sm:px-2">
            <ChildNavItem active icon={<Home />} label="Home" href="/child" />
            <ChildNavItem icon={<Map />} label="Journey" href="#journey" />
            <ChildNavItem icon={<Compass />} label="Worlds" href="#worlds" />
            <ChildNavItem icon={<UserRound />} label="Me" href="#reflection" />
          </div>
        </nav>

        <section className="relative mt-6 overflow-hidden rounded-[2rem] border-2 border-white bg-white shadow-soft sm:mt-8">
          <Image src="/child-world/hero-landscape.webp" alt="A winding path through Sam's learning world" width={2048} height={683} priority className="h-52 w-full object-cover sm:h-72 lg:h-80" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/65 to-transparent p-5 pt-24 sm:p-8 sm:pt-32">
            <div className="max-w-xl text-white">
              <div className="flex items-center gap-2 text-sm font-bold text-mango"><Sparkles className="size-4" aria-hidden="true" /> Your world is ready</div>
              <h1 className="mt-1 font-display text-4xl font-extrabold leading-tight sm:text-6xl">My Learning World</h1>
              <p className="mt-2 max-w-md text-sm font-semibold text-white/90 sm:text-lg">Big questions. Kind choices. A brighter tomorrow.</p>
            </div>
          </div>
        </section>

        <section id="journey" aria-labelledby="journey-heading" className="mt-9 sm:mt-12">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-berry">Small steps · Big discoveries</p>
              <h2 id="journey-heading" className="mt-2 font-display text-3xl font-extrabold sm:text-5xl">Today&apos;s Journey <span className="text-coral">✦</span></h2>
            </div>
            <p className="max-w-xs text-sm font-semibold leading-6 text-ink/60">Pick one path to explore today. You can always come back for another.</p>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {activities.map((activity) => (
              <article key={activity.id} className={`group overflow-hidden rounded-[1.75rem] border-2 ${activity.accent} shadow-sm transition hover:-translate-y-1 hover:shadow-soft`}>
                <Image src={activity.image} alt="" width={1024} height={1024} className="h-48 w-full object-cover sm:h-56" />
                <div className="flex min-h-48 flex-col justify-between p-5 sm:p-6">
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-extrabold ${activity.status === "Live" ? "bg-emerald-100 text-emerald-900" : "bg-violet-200 text-violet-900"}`}>{activity.status}</span>
                      <span className="text-xs font-bold uppercase tracking-wide text-ink/45">{activity.focus}</span>
                    </div>
                    <h3 className="mt-4 font-display text-2xl font-extrabold leading-tight sm:text-3xl">{activity.title}</h3>
                    <p className="mt-2 text-sm font-medium leading-6 text-ink/65">{activity.description}</p>
                  </div>
                  <Link href={activity.href} className={`mt-5 flex min-h-12 items-center justify-between rounded-2xl px-4 font-extrabold text-white transition hover:brightness-95 focus-visible:outline focus-visible:outline-4 focus-visible:outline-berry ${activity.status === "Coming soon" ? "pointer-events-none opacity-80" : ""} ${activity.arrow}`} aria-disabled={activity.status === "Coming soon"}>
                    <span>{activity.status === "Live" ? "Start exploring" : "Not ready yet"}</span><ArrowRight className="size-5" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="reflection" aria-labelledby="reflection-heading" className="mt-10 rounded-[2rem] border-2 border-ink/10 bg-white p-5 shadow-sm sm:mt-14 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-sm">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-berry">A moment to think</p>
              <h2 id="reflection-heading" className="mt-2 font-display text-3xl font-extrabold">What did you notice?</h2>
              <p className="mt-2 text-sm font-medium leading-6 text-ink/60">There is no wrong answer. Choose the stepping stone that feels true today.</p>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {reflections.map((item) => {
                const selected = reflection === item.id;
                return <button key={item.id} type="button" onClick={() => setReflection(item.id)} aria-pressed={selected} className={`min-h-28 min-w-24 rounded-[1.6rem] border-2 border-ink/10 px-3 py-4 text-center font-display text-sm font-extrabold shadow-sm transition hover:-translate-y-1 sm:min-h-32 sm:min-w-32 sm:px-5 ${item.color} ${selected ? "ring-4 ring-berry/30" : ""}`}><span className="block text-2xl" aria-hidden="true">{selected ? <Check className="mx-auto size-7" /> : item.icon}</span><span className="mt-2 block">{selected ? "Saved!" : item.label}</span></button>;
              })}
            </div>
          </div>
        </section>

        <section id="worlds" className="mt-10 grid gap-5 sm:mt-14 sm:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[2rem] bg-ink p-6 text-white sm:p-8">
            <div className="flex items-start justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-[0.18em] text-mango">World navigation</p><h2 className="mt-2 font-display text-3xl font-extrabold">Where will you wander next?</h2></div><WandSparkles className="size-8 text-mango" aria-hidden="true" /></div>
            <div className="mt-6 grid grid-cols-2 gap-3"><WorldLink icon={<BookOpen />} label="Market town" status="Live" href="/learn/zara" /><WorldLink icon={<Compass />} label="Robot valley" status="Live" href="/learn/tobi" /><WorldLink icon={<Sparkles />} label="Wonder garden" status="Soon" href="#coming-soon" /><WorldLink icon={<Map />} label="More worlds" status="Preview" href="#coming-soon" /></div>
          </div>
          <div id="coming-soon" className="rounded-[2rem] border-2 border-mango/50 bg-mango/25 p-6 sm:p-8"><p className="text-sm font-bold uppercase tracking-[0.18em] text-ink/65">A note for explorers</p><h2 className="mt-2 font-display text-3xl font-extrabold">New paths are growing.</h2><p className="mt-3 text-sm font-semibold leading-6 text-ink/70">Wonder Garden and the other paths are still being made. We&apos;ll show you when they&apos;re ready to explore.</p><div className="mt-7 flex items-center gap-3 text-sm font-extrabold"><span className="grid size-10 place-items-center rounded-2xl bg-white"><Sparkles className="size-5 text-berry" /></span> Keep being curious.</div></div>
        </section>
      </div>
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-ink/10 bg-white/95 px-4 py-2.5 shadow-[0_-8px_24px_rgba(23,35,56,0.08)] backdrop-blur sm:hidden"><div className="mx-auto flex max-w-md justify-around"><ChildNavItem active icon={<Home />} label="Home" href="/child" /><ChildNavItem icon={<Map />} label="Journey" href="#journey" /><ChildNavItem icon={<Compass />} label="Worlds" href="#worlds" /><ChildNavItem icon={<UserRound />} label="Me" href="#reflection" /></div></div>
    </div>
  );
}

function ChildNavItem({ icon, label, href, active = false }: { icon: React.ReactNode; label: string; href: string; active?: boolean }) {
  return <Link href={href} className={`flex min-h-11 min-w-16 flex-1 flex-col items-center justify-center gap-0.5 rounded-full px-2 py-1 text-[11px] font-extrabold transition sm:min-w-24 sm:flex-row sm:gap-2 sm:px-4 sm:text-sm ${active ? "bg-mango text-ink shadow-sm" : "text-ink/70 hover:bg-sky"}`}>{<span className="[&>svg]:size-4">{icon}</span>}<span>{label}</span></Link>;
}

function WorldLink({ icon, label, status, href }: { icon: React.ReactNode; label: string; status: string; href: string }) {
  return <Link href={href} className="flex min-h-20 items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-3 transition hover:bg-white/20"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/15 text-mango [&>svg]:size-5">{icon}</span><span className="min-w-0"><span className="block truncate text-sm font-extrabold">{label}</span><span className="mt-0.5 block text-xs font-semibold text-white/60">{status}</span></span></Link>;
}
