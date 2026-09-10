import { describe, expect, it } from "vitest";

import { contactSchema, toFieldErrors } from "@/lib/validation";

const valid = {
  name: "Jane Santos",
  email: "jane@company.com",
  subject: "Full stack role",
  message: "We are hiring a full stack developer and your PRAMS write-up was useful.",
  company: "",
};

describe("contactSchema", () => {
  it("accepts a well-formed message", () => {
    const result = contactSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("trims surrounding whitespace before validating", () => {
    const result = contactSchema.safeParse({ ...valid, name: "  Jane Santos  " });
    expect(result.success && result.data.name).toBe("Jane Santos");
  });

  it("rejects a name that is only whitespace", () => {
    const result = contactSchema.safeParse({ ...valid, name: "   " });
    expect(result.success).toBe(false);
  });

  it("rejects a malformed email address", () => {
    const result = contactSchema.safeParse({ ...valid, email: "jane@" });
    expect(result.success).toBe(false);
  });

  it("rejects a message that is too short to reply to", () => {
    const result = contactSchema.safeParse({ ...valid, message: "hi" });
    expect(result.success).toBe(false);
  });

  it("rejects a message beyond the length cap", () => {
    const result = contactSchema.safeParse({ ...valid, message: "a".repeat(4001) });
    expect(result.success).toBe(false);
  });

  it("accepts a filled honeypot so the response cannot fingerprint it", () => {
    // Rejecting here would return a 422 naming the field, which tells a bot
    // exactly what caught it. The route discards the submission instead.
    const result = contactSchema.safeParse({ ...valid, company: "Acme Ltd" });
    expect(result.success && result.data.company).toBe("Acme Ltd");
  });

  it("defaults the honeypot to empty when the field is absent", () => {
    const withoutHoneypot: Record<string, unknown> = { ...valid };
    delete withoutHoneypot.company;
    const result = contactSchema.safeParse(withoutHoneypot);
    expect(result.success && result.data.company).toBe("");
  });
});

describe("toFieldErrors", () => {
  it("returns one message per field", () => {
    const result = contactSchema.safeParse({ ...valid, name: "", email: "nope" });

    expect(result.success).toBe(false);
    if (result.success) return;

    const errors = toFieldErrors(result.error);
    expect(Object.keys(errors).sort()).toEqual(["email", "name"]);
    expect(errors.email).toBeTypeOf("string");
  });
});
