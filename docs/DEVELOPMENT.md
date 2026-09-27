# Development

## Prerequisites

Use a current Node.js LTS release and npm. The project expects Node 20 or newer; confirm the exact version with the team if the deployment target differs.

## Install and run

~~~bash
npm install
cp .env.example .env.local
npm run dev
~~~

PowerShell equivalent:

~~~powershell
Copy-Item .env.example .env.local
npm run dev
~~~

The default Zara path uses the local NVIDIA/Qwen endpoint configured in `.env.local`. Start the secure Brev tunnel first, then use `THINKLAB_AI_PROVIDER=qwen`. Set `THINKLAB_AI_PROVIDER=fallback` to rehearse the local judge-safe path, or configure `GEMINI_API_KEY` only when deliberately using the optional Gemini rollback. Never commit `.env.local`.

## Quality commands

~~~bash
npm run lint
npm run typecheck
npm run build
npm test
~~~

## Branch and pull requests

Create a focused branch from the shared base, keep commits scoped, and open a PR using the repository template. Do not push directly to main. Describe AI prompt/schema/provider changes and responsible-AI considerations.

## Troubleshooting

- Mission unavailable: check that `.env.local` exists, the Brev tunnel is running, `THINKLAB_AI_BASE_URL` points at its local `/v1` endpoint, and the dev server was restarted after changing environment variables. The app should still complete the journey through fallback if Qwen is unavailable.
- Dependency mismatch: remove node_modules and reinstall only if the lockfile and local install are inconsistent; do not commit generated dependencies.
- Type errors after route edits: run npm run typecheck and check App Router parameter types.
- Styling looks absent: confirm Tailwind content paths include the changed file and restart the dev server.
- Build differs from dev: run npm run build locally before opening the PR.
- Production builds use Webpack and one Next.js worker (`next.config.ts`) to keep the hackathon workspace reliable when disk or memory is constrained. Use `npm run build`; do not remove this setting without validating on the shared environment.
