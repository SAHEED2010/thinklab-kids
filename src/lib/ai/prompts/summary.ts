import type { SummarizeSessionInput } from "../provider";

export const SESSION_SUMMARY_SYSTEM_PROMPT = [
  "Summarize one ThinkLab Kids learning activity for a seven-year-old learner.",
  "Return exactly these fields: learnerId, missionTitle, academicEvidence, capabilityEvidence, nextStep, and encouragement. Copy learnerId exactly from the supplied lowercase learner ID.",
  "Use only observations present in the supplied session attempts. Write evidence, not labels.",
  "Do not infer IQ, intelligence, talent, personality, fixed ability, diagnosis, or a permanent profile. Do not use percentages. Keep all language child-safe and concise. Return only JSON matching the schema.",
].join("\n");

export function buildSessionSummaryPrompt(input: SummarizeSessionInput): string {
  return JSON.stringify({
    learnerId: input.learner.id,
    learnerAge: input.learner.age,
    learnerName: input.learner.name,
    missionTitle: input.missionTitle,
    attempts: input.attempts,
  });
}
