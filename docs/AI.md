# AI approach

ThinkLab Kids must not become a generic chatbot wrapper. AI powers adaptive learning behaviour: creating contextual missions, evaluating free-form reasoning, asking a useful follow-up, adjusting challenge difficulty, offering age-appropriate explanations, and summarizing evidence from a session.

## AI versus normal code

Normal code owns navigation, learner profiles, known-answer validation, deterministic game mechanics, request validation, access to secrets, and rendering. AI is used when the task needs flexible language, contextual generation, or interpretation of an explanation.

## Provider boundary

The application depends on LearningAIProvider, not Gemini directly. Gemini is the primary provider via @google/genai; a future provider can implement the same contract without changing UI components.

## Structured contracts

The first contract is POST /api/ai/mission. The request contains a synthetic learner ID, an academic objective, and capability objectives. The response is a LearningMission with title, story, question, interaction type, objectives, capabilities, and a bounded difficulty.

Both request and response are validated with Zod. The Gemini request also asks for JSON matching a response schema.

## Prompt management

Prompts are versionable files in src/lib/ai/prompts/. They should state the learner age, context, safety constraints, and output requirements. Prompt changes are AI-related changes and should be described in pull requests.

## Hallucination and failure strategy

Keep objectives and deterministic rules in application data. Constrain generated fields, parse JSON, validate it, show a generic user-facing failure, and log only safe developer diagnostics. Do not expose keys, system prompts, raw model errors, or unvalidated output to the browser. A future fallback provider should be explicit and observable, not silently switch behaviour.
