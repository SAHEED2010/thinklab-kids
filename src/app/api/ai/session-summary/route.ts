import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { getLearner } from "@/data/learners";
import { createLearningAIProvider } from "@/lib/ai";
import { sessionSummaryRequestSchema, sessionSummarySchema } from "@/lib/ai/schemas";
import { containsForbiddenLearningLabel } from "@/lib/ai/safety";
import { fallbackSessionSummary } from "@/lib/learning/fallback";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  try {
    const input = sessionSummaryRequestSchema.parse(body);
    const learner = getLearner(input.learnerId);
    if (!learner) return NextResponse.json({ error: "Learner not found." }, { status: 404 });

    try {
      const provider = createLearningAIProvider();
      const summary = sessionSummarySchema.parse(await provider.summarizeSession({
        learner,
        missionTitle: input.missionTitle,
        attempts: input.attempts,
      }));
      if (containsForbiddenLearningLabel([
        summary.nextStep,
        summary.encouragement,
        ...summary.academicEvidence.flatMap((item) => [item.skill, item.observation]),
        ...summary.capabilityEvidence.flatMap((item) => [item.capability, item.observation]),
      ])) {
        throw new Error("Generated session summary failed the child-safety content check.");
      }
      return NextResponse.json({
        summary,
        source: provider.source,
        notice: provider.source === "fallback" ? "Demo evidence used while the learning guide is unavailable." : undefined,
      });
    } catch (error) {
      console.error("Session summary failed:", error instanceof Error ? error.message : "Unknown provider error");
      return NextResponse.json({
        summary: fallbackSessionSummary(input.learnerId, input.missionTitle, input.attempts),
        source: "fallback" as const,
        notice: "Demo evidence used while the learning guide is unavailable.",
      });
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: "Session summary request did not match the expected shape." }, { status: 400 });
    }
    console.error("Session summary request failed:", error instanceof Error ? error.message : "Unknown request error");
    return NextResponse.json({ error: "We could not prepare learning evidence just now." }, { status: 400 });
  }
}
