import { z } from "zod";

/**
 * Parse only a complete JSON response or a complete markdown JSON fence.
 * We intentionally do not search arbitrary prose for a JSON-looking substring.
 */
export function parseModelJson<T>(text: string, schema: z.ZodType<T>): T {
  const trimmed = text.trim();
  const fenced = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
  const candidate = (fenced?.[1] ?? trimmed).trim();

  let parsed: unknown;
  try {
    parsed = JSON.parse(candidate) as unknown;
  } catch {
    throw new Error("Model returned invalid JSON.");
  }

  return schema.parse(parsed);
}
