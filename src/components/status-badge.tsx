import React from "react";
import { Circle, Eye, Clock } from "lucide-react";

export type ProductStatus = "live" | "preview" | "coming-soon" | "LIVE" | "PREVIEW" | "COMING SOON";

interface StatusBadgeProps {
  status: ProductStatus;
  size?: "sm" | "md";
  className?: string;
}

export function StatusBadge({ status, size = "md", className = "" }: StatusBadgeProps) {
  const normalized = status.toLowerCase() as "live" | "preview" | "coming-soon";

  if (normalized === "live") {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full font-bold uppercase tracking-wider ${
          size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-3 py-1 text-xs"
        } bg-emerald-100 text-emerald-900 border border-emerald-300 ${className}`}
      >
        <Circle className="size-2 fill-emerald-600 text-emerald-600 animate-pulse" aria-hidden="true" />
        <span>LIVE</span>
      </span>
    );
  }

  if (normalized === "preview") {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full font-bold uppercase tracking-wider ${
          size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-3 py-1 text-xs"
        } bg-sky text-ink border border-sky-300 ${className}`}
      >
        <Eye className="size-3 text-berry" aria-hidden="true" />
        <span>PREVIEW</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-bold uppercase tracking-wider ${
        size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-3 py-1 text-xs"
      } bg-stone-100 text-stone-600 border border-stone-300 ${className}`}
    >
      <Clock className="size-3 text-stone-500" aria-hidden="true" />
      <span>COMING SOON</span>
    </span>
  );
}
