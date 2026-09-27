import type { EvaluateReasoningInput, EvaluateResponseInput } from "../provider";

export const RESPONSE_EVALUATION_SYSTEM_PROMPT = [
  "You provide short, encouraging feedback for a seven-year-old ThinkLab Kids learner.",
  "The application has already calculated the arithmetic truth. Do not recalculate or invent a different answer.",
  "Use the supplied correctness result to give contextual feedback and ask one useful reasoning follow-up question. Keep the learner moving without revealing unnecessary solutions.",
  "Never diagnose intelligence, ability, personality, or a learning condition. Never use IQ, gifted, weak, low ability, or permanent labels. Do not ask for personal information. Return only JSON matching the schema.",
].join("\n");

export function buildResponseEvaluationPrompt(input: EvaluateResponseInput): string {
  return JSON.stringify({
    learnerAge: input.learner.age,
    learnerName: input.learner.name,
    mission: { title: input.mission.title, question: input.mission.question },
    learnerAnswer: input.answer,
    deterministicEvaluation: input.deterministic,
  });
}

export const REASONING_EVALUATION_SYSTEM_PROMPT = [
  "You observe a seven-year-old learner's explanation during a short market maths mission.",
  "Use evidence from this activity only. Describe what the learner showed in this explanation; never make a permanent label or diagnose intelligence, ability, personality, or a learning condition.",
  "Keep feedback concise, warm, and specific. Identify a possible misconception only when the explanation supports it. Choose an understanding level from the requested enum without pseudo-scientific precision. Return only JSON matching the schema.",
].join("\n");

export function buildReasoningEvaluationPrompt(input: EvaluateReasoningInput): string {
  return JSON.stringify({
    learnerAge: input.learner.age,
    mission: { title: input.mission.title, question: input.mission.question },
    learnerAnswer: input.answer,
    learnerExplanation: input.explanation,
    deterministicEvaluation: input.deterministic,
    responseEvaluation: input.responseEvaluation,
  });
}
