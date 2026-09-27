# ThinkLab Kids

ThinkLab Kids is a mobile-first learning environment for African children that makes room for curiosity, reasoning, communication, creativity, and problem-solving alongside academic foundations.

## Why it exists

Children need opportunities to explain ideas, make decisions, test approaches, and learn from feedback—not only recall answers. ThinkLab Kids complements school with playful, contextual learning experiences.

## Hackathon MVP

The foundation supports five fictional demo learners. Zara's adaptive market mission and Tobi's robot sequencing game are the first functional experiences; the other learners are intentionally lightweight demonstrations.

## Demo learners

| Learner | Age | Focus | Status |
| --- | ---: | --- | --- |
| Amara | 4 | Early foundations | Demonstration |
| Tobi | 6 | Computational thinking | Functional |
| Zara | 7 | Maths, reasoning and decisions | Functional |
| David | 9 | Strategy and planning | Demonstration |
| Favour | 11 | Open-ended problem solving | Demonstration |

## Tech stack

Next.js, React, TypeScript, App Router, Tailwind CSS, ESLint, Vitest, Zod, Lucide React, and a swappable LearningAIProvider boundary. The hackathon primary is NVIDIA Brev + vLLM + Qwen; Gemini remains an optional rollback.

## Quick start

~~~bash
git clone https://github.com/SAHEED2010/thinklab-kids.git
cd thinklab-kids
npm install
cp .env.example .env.local
npm run dev
~~~

On Windows PowerShell, use Copy-Item .env.example .env.local instead of cp. For the live Zara path, start the secure NVIDIA Brev tunnel described in ops/brev/README.md. To rehearse without external AI, set THINKLAB_AI_PROVIDER=fallback.

## Environment variables

THINKLAB_AI_BASE_URL, THINKLAB_AI_MODEL, and THINKLAB_AI_TOKEN are server-only configuration. Never rename provider credentials to NEXT_PUBLIC_* variables. .env.local is ignored by Git. See .env.example.

## Project structure

~~~text
src/app/              App Router pages and /api routes
src/components/       Reusable UI and client interactions
src/data/             Synthetic learner data
src/lib/ai/            Provider boundary, Qwen/Gemini/fallback adapters, schemas, prompts
src/lib/types.ts       Shared domain types
docs/                  Product and engineering context
~~~

## Development workflow

Use a scoped branch such as feature/zara-follow-up, keep commits focused, and open a pull request instead of pushing to main.

~~~bash
npm run lint
npm run typecheck
npm run build
npm test
~~~

## Documentation

- Product: docs/PRODUCT.md
- MVP scope: docs/MVP.md
- Architecture: docs/ARCHITECTURE.md
- AI approach: docs/AI.md
- Responsible AI: docs/RESPONSIBLE_AI.md
- Development setup: docs/DEVELOPMENT.md
- Workstreams: docs/WORKSTREAMS.md
- Demo script: docs/DEMO.md
- Decision log: docs/DECISIONS.md

## AI safety

The current learners are fictional and no production child data is stored. Read docs/RESPONSIBLE_AI.md before adding child-facing behaviour.

## Hackathon status

This repository is actively being developed as a hackathon MVP. The bootstrap is an engineering foundation, not the complete product.
