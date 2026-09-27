# Workstreams

Five people can work in parallel when each owns a small surface and integrates through clear contracts.

## 1. AI Engine

Own src/lib/ai/, prompt versions, schemas, provider adapters, and API route contracts. Coordinate contract changes before changing UI consumers.

## 2. Learner Experience

Own learner profiles, navigation, homepage, learner selection, and learning-world shell. Prefer src/components/ and src/data/learners.ts; do not edit AI internals for visual changes.

## 3. Market Mission

Own Zara's mission flow, answer/follow-up states, and eventual evidence handoff. Consume the AI route contract; do not call a model provider from a component.

## 4. Logic Game

Own Tobi's deterministic sequencing experience. Keep mechanics, rules, and tests in normal code. Do not use AI for a known deterministic game rule.

## 5. Progress + Demo

Own Learning Evidence UI, integration polish, demo reliability, and deployment readiness. Coordinate with AI Engine on the shape of observations and with both experience owners on final flows.

## Integration boundaries

Shared domain types belong in src/lib/types.ts. Synthetic learner data belongs in src/data/. AI contracts belong in src/lib/ai/schemas.ts and provider.ts. If a change crosses a boundary, document the contract in the PR and avoid drive-by formatting or refactors.
