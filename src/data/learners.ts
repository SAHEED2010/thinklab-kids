import type { Learner } from "@/lib/types";

export const learners: Learner[] = [
  {
    id: "amara",
    name: "Amara",
    age: 4,
    focus: "Early foundations",
    interaction: "Counting, pictures, voice and matching",
    description: "A playful starting point for noticing patterns and quantities.",
    status: "demo",
    color: "mango",
  },
  {
    id: "tobi",
    name: "Tobi",
    age: 6,
    focus: "Computational thinking",
    interaction: "Robot sequencing and coding logic",
    description: "A functional logic game about giving a robot clear instructions.",
    status: "functional",
    color: "sky",
  },
  {
    id: "zara",
    name: "Zara",
    age: 7,
    focus: "Maths, reasoning and decisions",
    interaction: "Nigerian market mission",
    description: "A functional adaptive mission where every explanation helps shape the next challenge.",
    status: "functional",
    color: "leaf",
  },
  {
    id: "david",
    name: "David",
    age: 9,
    focus: "Strategy and planning",
    interaction: "Chess-inspired reasoning",
    description: "A demonstration of planning several moves ahead.",
    status: "demo",
    color: "berry",
  },
  {
    id: "favour",
    name: "Favour",
    age: 11,
    focus: "Open-ended problem solving",
    interaction: "Real-world design challenges",
    description: "A glimpse of how learners might create and explain their own solutions.",
    status: "demo",
    color: "coral",
  },
];

export function getLearner(learnerId: string): Learner | undefined {
  return learners.find((learner) => learner.id === learnerId);
}
