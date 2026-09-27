# Architecture

~~~text
Browser
   |
Next.js UI (App Router)
   |
Next.js Server/API
   |
AI Provider Interface
   |
Gemini
~~~

## Responsibilities

- Frontend: navigation, accessible touch-friendly UI, learner state for the current interaction, and rendering validated domain data.
- API/server: input validation, learner lookup, provider construction, error handling, and protection of server-only credentials.
- AI layer: LearningAIProvider defines the application need. GeminiLearningAIProvider is the current implementation. Prompts live outside React components.
- Validation: Zod validates request bodies and parsed model responses. Model JSON is not trusted merely because the provider returned it.
- Learner/session state: local mock data and short-lived client state are sufficient for bootstrap. A future persistence layer must be designed with guardian consent, data minimization, retention, and access controls.
- Provider fallback: future providers can implement the same interface. Routing, retries, fallback policy, and observability should be added only when a real second provider is needed.

The UI does not import Gemini or build prompts. Deterministic mechanics remain ordinary code so that game behaviour is predictable and testable.
