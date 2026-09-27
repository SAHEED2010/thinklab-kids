import { describe, expect, it } from "vitest";
import { z } from "zod";
import { parseModelJson } from "./json";

const responseSchema = z.object({ message: z.string() });

describe("parseModelJson", () => {
  it("parses a complete JSON response", () => {
    expect(parseModelJson('{"message":"hello"}', responseSchema)).toEqual({ message: "hello" });
  });

  it("unwraps one outer markdown JSON fence", () => {
    expect(parseModelJson("```json\n{\"message\":\"hello\"}\n```", responseSchema)).toEqual({ message: "hello" });
  });

  it("rejects prose around JSON instead of extracting trusted-looking text", () => {
    expect(() => parseModelJson("Here is the answer: {\"message\":\"hello\"}", responseSchema)).toThrow();
  });

  it("rejects a JSON payload that fails its Zod schema", () => {
    expect(() => parseModelJson('{"message":42}', responseSchema)).toThrow();
  });
});
