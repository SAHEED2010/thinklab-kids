import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { getLearner } from "@/data/learners";
import { createLearningAIProvider } from "@/lib/ai";
import { missionRequestSchema } from "@/lib/ai/schemas";

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

    const provider = createLearningAIProvider();
    const mission = await provider.generateMission({ ...input, learner });

    return NextResponse.json({ mission });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: "Mission request did not match the expected shape." }, { status: 400 });
    }

    console.error("Mission generation failed:", error);
    return NextResponse.json(
      { error: "Mission generation is unavailable right now. Check the server configuration and try again." },
      { status: 503 },
    );
  }
}
