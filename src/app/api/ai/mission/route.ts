import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { getLearner } from "@/data/learners";
import { createLearningAIProvider } from "@/lib/ai";
import { learningMissionSchema, missionRequestSchema } from "@/lib/ai/schemas";
import { containsForbiddenLearningLabel, missionTextForSafetyCheck } from "@/lib/ai/safety";
import { fallbackMarketMission } from "@/lib/learning/fallback";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  try {
    const input = missionRequestSchema.parse(body);
    const learner = getLearner(input.learnerId);

    if (!learner) {
      return NextResponse.json({ error: "Learner not found." }, { status: 404 });
    }

    try {
      const provider = createLearningAIProvider();
      const mission = learningMissionSchema.parse(await provider.generateMission({ ...input, learner }));
      if (containsForbiddenLearningLabel(missionTextForSafetyCheck(mission))) throw new Error("Generated mission failed the child-safety content check.");
      return NextResponse.json({ mission, source: "gemini" as const });
    } catch (error) {
      console.error("Mission generation failed:", error instanceof Error ? error.message : "Unknown provider error");
      return NextResponse.json({
        mission: fallbackMarketMission,
        source: "fallback" as const,
        notice: "Demo mission used while the learning guide is unavailable.",
      });
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: "Mission request did not match the expected shape." }, { status: 400 });
    }

    console.error("Mission request failed:", error instanceof Error ? error.message : "Unknown request error");
    return NextResponse.json(
      { error: "Mission generation is unavailable right now. Check the server configuration and try again." },
      { status: 503 },
    );
  }
}
