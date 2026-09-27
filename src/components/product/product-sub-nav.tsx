import React from "react";
import Link from "next/link";
import { Sparkles, Compass, Layers, ArrowRight } from "lucide-react";

interface ProductSubNavProps {
  currentPath: "/why" | "/how-it-works" | "/ages";
}

export function ProductSubNav({ currentPath }: ProductSubNavProps) {
  const tabs = [
    {
      href: "/why",
      label: "Why ThinkLab",
      badge: "The Rationale",
      icon: Sparkles,
      isActive: currentPath === "/why",
    },
    {
      href: "/how-it-works",
      label: "How It Works",
      badge: "The Learning Loop",
      icon: Compass,
      isActive: currentPath === "/how-it-works",
    },
    {
      href: "/ages",
      label: "Ages 4–14",
      badge: "The Journey",
      icon: Layers,
      isActive: currentPath === "/ages",
    },
  ];

  return (
    <nav
      aria-label="Product explanation sub-navigation"
      className="mb-8 sm:mb-12 border-b border-ink/10 pb-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none w-full sm:w-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                aria-current={tab.isActive ? "page" : undefined}
                className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-bold transition min-h-[44px] shrink-0 focus-visible:outline focus-visible:outline-4 focus-visible:outline-berry ${
                  tab.isActive
                    ? "bg-ink text-white shadow-soft"
                    : "bg-paper text-ink/70 hover:bg-sky/50 hover:text-ink border border-ink/10"
                }`}
              >
                <Icon className={`size-4 shrink-0 ${tab.isActive ? "text-mango" : "text-berry"}`} aria-hidden="true" />
                <span>{tab.label}</span>
                <span
                  className={`hidden md:inline-block rounded-md px-1.5 py-0.5 text-[10px] uppercase tracking-wider font-semibold ${
                    tab.isActive ? "bg-white/20 text-white" : "bg-ink/5 text-ink/60"
                  }`}
                >
                  {tab.badge}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center gap-2 text-xs font-semibold text-ink/60">
          <span>Explore ThinkLab&apos;s product philosophy</span>
          <ArrowRight className="size-3.5 text-berry" aria-hidden="true" />
        </div>
      </div>
    </nav>
  );
}
