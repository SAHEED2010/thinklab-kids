import type { LucideIcon } from "lucide-react";
import { Award, CalendarDays, Lightbulb, UsersRound } from "lucide-react";
import { StatusBadge, type ProductStatus } from "@/components/status-badge";

// Static previews of planned Challenge Arena experiences.
// Nothing here is interactive, and no sharing, community or team features exist yet.

interface ChallengePreview {
  title: string;
  status: ProductStatus;
  icon: LucideIcon;
  childDoes: string;
  thinking: string;
  tags: string[];
}

const PREVIEWS: ChallengePreview[] = [
  {
    title: "Daily Problem",
    status: "preview",
    icon: CalendarDays,
    childDoes: "Try one short thinking puzzle, whenever you like.",
    thinking: "Building a steady thinking habit.",
    tags: ["Your choice", "Short", "No scores"],
  },
  {
    title: "Community Problem",
    status: "preview",
    icon: Lightbulb,
    childDoes: "Pick a real problem, find out more about it, then share your own idea and explain why it works.",
    thinking: "Researching, deciding for yourself and explaining it.",
    tags: ["Research welcome", "Your own idea", "Explain why"],
  },
  {
    title: "Competition",
    status: "preview",
    icon: Award,
    childDoes: "Join only if you want to. Awards go to how you think, not how fast you answer.",
    thinking: "Showing your reasoning clearly.",
    tags: ["Best Reasoning", "Most Creative Approach", "Best Explanation", "Most Practical Solution"],
  },
  {
    title: "Team Challenge",
    status: "coming-soon",
    icon: UsersRound,
    childDoes: "Solve a bigger problem together with a small team.",
    thinking: "Sharing ideas and working together.",
    tags: ["Teamwork"],
  },
];

export function ChallengePreviews() {
  return (
    <div>
      <h3 className="font-display text-2xl font-bold">Coming to the arena</h3>
      <p className="mt-1 leading-7 text-ink/70">These are previews. They show what you will do here later.</p>
      <ul className="mt-5 grid gap-4 sm:grid-cols-2">
        {PREVIEWS.map(({ title, status, icon: Icon, childDoes, thinking, tags }) => (
          <li key={title} className="rounded-3xl border border-ink/10 bg-paper p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sky" aria-hidden="true">
                  <Icon size={22} className="text-berry" />
                </span>
                <h4 className="font-display text-xl font-bold">{title}</h4>
              </div>
              <StatusBadge status={status} size="sm" className="shrink-0" />
            </div>
            <p className="mt-4 leading-7">
              <strong>You would:</strong> {childDoes}
            </p>
            <p className="mt-1 leading-7 text-ink/75">
              <strong className="text-ink">Thinking:</strong> {thinking}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${title} features`}>
              {tags.map((tag) => (
                <li key={tag} className="rounded-full bg-white px-3 py-1 text-sm font-bold text-ink/80 ring-1 ring-ink/10">
                  {tag}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
