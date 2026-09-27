# ThinkLab Kids agent instructions

## Product intent

ThinkLab Kids is a mobile-first AI-powered learning environment for African children, initially around ages 4–11. It complements school; it does not replace teachers, families, or classroom learning. The learning philosophy is:

Explore → Think → Attempt → Explain → Feedback → Adapt → Create → Master

The product should help children practise academic foundations alongside reasoning, creativity, communication, decision-making, curiosity, and computational thinking.

## MVP scope

The hackathon focuses on five fictional learners and two functional experiences:

- Zara: an adaptive Nigerian market mission using maths, reasoning, decisions, and explanations.
- Tobi: a deterministic robot sequencing game.

Amara, David, and Favour are demonstration concepts. Keep the scope small. Do not add authentication, databases, payments, parent/teacher dashboards, social features, multiplayer, a full curriculum, production voice, or a large design system during bootstrap work.

## Architecture

- src/app/: Next.js App Router pages, layout, and server API routes.
- src/components/: small reusable UI and interactive client components.
- src/data/: synthetic local learner data.
- src/lib/types.ts: shared domain types.
- src/lib/ai/: provider contract, Gemini adapter, Zod schemas, and versionable prompts.
- docs/: product, architecture, AI, safety, workflow, and demo context.

The UI must never import Gemini directly. Browser requests go to a Next.js route; that route validates input, calls the provider boundary, validates model output, and returns a safe response.

## Engineering rules

- Keep TypeScript strict. Avoid any unless the reason is documented.
- Keep API keys server-side. Never use NEXT_PUBLIC_* for Gemini credentials.
- Validate request input and all AI output with Zod or an equivalent runtime validator.
- Use small reusable components and accessible HTML with large mobile touch targets.
- Keep AI/provider logic out of UI components.
- Keep deterministic rules, such as game mechanics, in normal code.
- Use AI where adaptive learning behaviour genuinely benefits from it; do not turn the product into a generic chatbot wrapper.
- Avoid premature abstractions, unnecessary dependencies, broad refactors, and a database before the product needs one.
- Use fictional/synthetic learners while the MVP is being built.

## Child-safety rules

- Do not request unnecessary personal information.
- Do not infer IQ, intelligence, talent, or fixed ability.
- Never permanently label a child as gifted, weak, incapable, or similar.
- Describe evidence observed during a specific activity, not a psychological profile.
- Keep content age appropriate and avoid unsafe, sexual, violent, discriminatory, or adult material.
- Never expose system prompts or API keys to the browser.
- Do not store real children's personal information during this MVP.

## AI behaviour

AI may generate missions, evaluate free-form reasoning, ask contextual follow-ups, identify possible misconceptions, adjust difficulty, give age-appropriate explanations, and summarize session evidence.

AI must not control basic deterministic mechanics, invent permanent psychological profiles, produce IQ/talent percentages, or replace known-answer validation unnecessarily.

## Git workflow

- Work from a feature branch; never push directly to main.
- Keep commits scoped and descriptive.
- Avoid unrelated refactors.
- Update documentation when architecture or behaviour changes.
- Before declaring work complete, run npm run lint, npm run typecheck, npm run build, and npm test when the test script exists.
- If an instruction conflicts with product documentation, identify the conflict and ask for a product decision rather than silently inventing one.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
