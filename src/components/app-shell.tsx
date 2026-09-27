import Link from "next/link";
import { Compass, Sparkles, HeartHandshake } from "lucide-react";
import type { ReactNode } from "react";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="border-b border-ink/10 bg-paper/90 sticky top-0 z-40 backdrop-blur-xs">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-3 sm:px-5 py-2.5 sm:py-4">
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3 rounded-xl shrink-0 focus-visible:outline focus-visible:outline-4 focus-visible:outline-berry"
            aria-label="ThinkLab Kids Home"
          >
            <span className="grid size-8 sm:size-10 place-items-center rounded-xl sm:rounded-2xl bg-berry text-white shadow-soft shrink-0">
              <Sparkles aria-hidden="true" className="size-4 sm:size-5" />
            </span>
            <span className="font-display text-base sm:text-lg font-bold tracking-tight">
              ThinkLab<span className="hidden sm:inline"> Kids</span>
            </span>
          </Link>
          <nav
            aria-label="Main navigation"
            className="flex min-w-0 max-w-[calc(100vw-7.5rem)] items-center gap-1 overflow-x-auto scrollbar-none text-xs font-semibold shrink-0 sm:max-w-none sm:gap-2 sm:overflow-visible sm:text-sm"
          >
            <Link
              className="rounded-full px-2 sm:px-3 py-1.5 sm:py-2 hover:bg-sky focus-visible:outline focus-visible:outline-4 focus-visible:outline-berry"
              href="/learners"
            >
              Learners
            </Link>
            <Link
              className="rounded-full px-2 sm:px-3 py-1.5 sm:py-2 hover:bg-sky focus-visible:outline focus-visible:outline-4 focus-visible:outline-berry"
              href="/demo"
            >
              Demo
            </Link>
            <Link
              className="flex items-center gap-1 sm:gap-1.5 rounded-full px-2 sm:px-3 py-1.5 sm:py-2 hover:bg-sky focus-visible:outline focus-visible:outline-4 focus-visible:outline-berry"
              href="/worlds"
              aria-label="Learning Worlds"
            >
              <Compass aria-hidden="true" className="size-3.5 sm:size-4 shrink-0" />
              <span className="hidden min-[380px]:inline">Worlds</span>
            </Link>
            <Link
              className="flex items-center gap-1 sm:gap-1.5 rounded-full px-2 sm:px-3 py-1.5 sm:py-2 hover:bg-sky focus-visible:outline focus-visible:outline-4 focus-visible:outline-berry"
              href="/parent"
              aria-label="Parent Preview"
            >
              <HeartHandshake aria-hidden="true" className="size-3.5 sm:size-4 text-berry shrink-0" />
              <span>
                <span className="hidden sm:inline">Parent </span>Preview
              </span>
            </Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
