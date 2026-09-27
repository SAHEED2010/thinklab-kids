# Decisions

This is a lightweight decision log, not a formal ADR system.

## Gemini is the primary AI provider

Gemini is the hackathon provider because the first adaptive mission needs a working structured-generation path. Calls stay server-side.

## Provider-agnostic boundary

The app uses a LearningAIProvider interface so a future provider can be added without coupling UI components to Gemini.

## Next.js full-stack approach

Next.js App Router keeps the mobile-first UI and small server/API surface in one repository, which is appropriate for hackathon speed.

## No database during bootstrap

Mock local data is enough to prove the experience. Persistence would add privacy, consent, retention, and operational decisions before the product needs them.

## No authentication during initial MVP

The demo uses synthetic learners and does not need accounts.

## Mock learners

All five learners are fictional so the team can prototype without collecting real child data.

## Child-safety-first AI behaviour

Prompts, validation, error handling, and documentation treat child safety, privacy, and capability observations as first-class constraints.

## Deterministic games use normal code

Known mechanics such as sequencing should be deterministic, predictable, and testable rather than delegated to a model.

## Two functional experiences

The team will make Zara and Tobi genuinely usable before expanding five incomplete experiences.
