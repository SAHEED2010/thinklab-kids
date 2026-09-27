import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { getLearner } from "@/data/learners";
import { createLearningAIProvider } from "@/lib/ai";
import { evaluateResponseRequestSchema, responseEvaluationSchema } from "@/lib/ai/schemas";
import { containsForbiddenLearningLabel } from "@/lib/ai/safety";
import { fallbackResponseEvaluation } from "@/lib/learning/fallback";
import { evaluateMissionAnswer } from "@/lib/learning/deterministic";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  try {
    const input = evaluateResponseRequestSchema.parse(body);
    const learner = getLearner(input.learnerId);
    if (!learner) return NextResponse.json({ error: "Learner not found." }, { status: 404 });

    const deterministic = evaluateMissionAnswer(input.mission, input.answer);

    try {
      const provider = createLearningAIProvider();
      const generated = responseEvaluationSchema.parse(await provider.evaluateResponse({
        learner,
        mission: input.mission,
        answer: input.answer,
        deterministic,
      }));
      if (containsForbiddenLearningLabel([generated.feedback, generated.followUpQuestion, generated.possibleMisconception ?? ""])) {
        throw new Error("Generated feedback failed the child-safety content check.");
      }
      return NextResponse.json({
        deterministic,
        evaluation: { ...generated, correctness: deterministic.correctness },
        source: "gemini" as const,
      });
    } catch (error) {
      console.error("Response evaluation failed:", error instanceof Error ? error.message : "Unknown provider error");
      return NextResponse.json({
        deterministic,
        evaluation: fallbackResponseEvaluation(deterministic),
        source: "fallback" as const,
        notice: "Demo feedback used while the learning guide is unavailable.",
      });
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: "Response request did not match the expected shape." }, { status: 400 });
    }
    console.error("Response request failed:", error instanceof Error ? error.message : "Unknown request error");
    return NextResponse.json({ error: "We could not evaluate that answer just now." }, { status: 400 });
  }
}
