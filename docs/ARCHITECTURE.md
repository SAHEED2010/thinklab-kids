# Architecture

~~~text
Browser
   |
Next.js UI (App Router)
   |
Next.js Server/API
   |
AI Provider Interface
   |--------- NVIDIA Brev + vLLM + Qwen (hackathon primary)
   |--------- Gemini (optional rollback)
   |--------- Local fallback (judge-safe)
~~~

## Responsibilities

- Frontend: navigation, accessible touch-friendly UI, learner state for the current interaction, and rendering validated domain data.
- API/server: input validation, learner lookup, provider construction, error handling, and protection of server-only credentials.
- AI layer: LearningAIProvider defines the application need. The current hackathon implementation is NvidiaQwenLearningAIProvider, with GeminiLearningAIProvider retained as an optional rollback and FallbackLearningAIProvider for a local demo path. Prompts live outside React components.
- Validation: Zod validates request bodies and parsed model responses. Model JSON is not trusted merely because the provider returned it.
- Learner/session state: local mock data and short-lived client state are sufficient for bootstrap. A future persistence layer must be designed with guardian consent, data minimization, retention, and access controls.
- Provider selection is explicit through THINKLAB_AI_PROVIDER=qwen, gemini, or fallback. Provider failures are logged server-side and fall back to deterministic local learning behaviour so the demo does not hang.

The UI does not import Gemini or build prompts. Deterministic mechanics remain ordinary code so that game behaviour is predictable and testable.
