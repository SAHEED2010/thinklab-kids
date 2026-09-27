import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/app-shell";

export const metadata: Metadata = {
  title: "ThinkLab Kids — Where African Children Practise Thinking, Explaining & Creating (Ages 4–14)",
  description:
    "An AI-assisted learning world for children ages 4–14 that complements school with contextual missions in reasoning, computational thinking, and observable learning evidence.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><AppShell>{children}</AppShell></body></html>;
}
