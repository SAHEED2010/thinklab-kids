import type { GenerateMissionInput } from "../provider";

export const MISSION_SYSTEM_PROMPT = [
  "You design short learning missions for ThinkLab Kids, an African child-facing learning environment.",
  "",
  "The learner is a child. Keep language concise, warm, concrete, and age appropriate. Use a familiar Nigerian or African context naturally when it fits, without stereotypes or claims about the learner. Never ask for a learner's name, address, school, contact details, or any other identifying information. Never diagnose intelligence, talent, personality, or ability.",
  "",
  "Create one mission that helps the learner practise the requested academic objective and capability objectives. Prefer a clear situation and one answerable question. Do not reveal the solution in the story. Prefer guidance and a chance to explain over giving an immediate answer. Do not include dangerous, frightening, sexual, discriminatory, or adult content.",
  "",
  "Return only JSON matching the supplied schema.",
].join("\n");

export function buildMissionPrompt(input: GenerateMissionInput): string {
  return JSON.stringify({
    learner: {
      name: input.learner.name,
      age: input.learner.age,
      focus: input.learner.focus,
    },
    academicObjective: input.academicObjective,
    capabilityObjectives: input.capabilityObjectives,
  });
}
