import Link from "next/link";
import { Compass, Sparkles } from "lucide-react";
import type { ReactNode } from "react";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="border-b border-ink/10 bg-paper/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link href="/" className="flex items-center gap-3 rounded-xl focus-visible:outline focus-visible:outline-4 focus-visible:outline-berry">
            <span className="grid size-10 place-items-center rounded-2xl bg-berry text-white shadow-soft"><Sparkles aria-hidden="true" size={21} /></span>
            <span className="font-display text-lg font-bold tracking-tight">ThinkLab Kids</span>
          </Link>
          <nav aria-label="Main navigation" className="flex items-center gap-2 text-sm font-semibold">
            <Link className="rounded-full px-3 py-2 hover:bg-sky focus-visible:outline focus-visible:outline-4 focus-visible:outline-berry" href="/learners">Learners</Link>
            <Link className="flex items-center gap-2 rounded-full px-3 py-2 hover:bg-sky focus-visible:outline focus-visible:outline-4 focus-visible:outline-berry" href="/worlds"><Compass aria-hidden="true" size={16} /> Worlds</Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
