const FORBIDDEN_LEARNING_LABELS = /\b(?:iq|genius|gifted|stupid|incapable|adhd|autism|dyslexia)\b/i;

export function containsForbiddenLearningLabel(values: string[]): boolean {
  return FORBIDDEN_LEARNING_LABELS.test(values.join(" "));
}

export function missionTextForSafetyCheck(mission: {
  title: string;
  story: string;
  question: string;
  capabilities: string[];
}): string[] {
  return [mission.title, mission.story, mission.question, ...mission.capabilities];
}
