import { z } from "zod";

// Imported by both the form and the API route so the two cannot drift.
// The client runs it for feedback; the server's run is the one that decides.
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "That name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .max(160, "That email address is too long.")
    .email("That does not look like a valid email address."),
  subject: z
    .string()
    .trim()
    .min(3, "Please add a subject.")
    .max(120, "Please keep the subject under 120 characters."),
  message: z
    .string()
    .trim()
    .min(20, "Please write at least 20 characters so I can reply usefully.")
    .max(4000, "Please keep the message under 4000 characters."),

  // Honeypot. Left permissive on purpose: rejecting it here returns a 422
  // naming the field, which tells a bot what caught it. The route discards
  // the submission and answers 200 instead.
  company: z.string().max(200).optional().default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type FieldErrors = Partial<Record<keyof ContactInput, string>>;

/** One message per field, for rendering. */
export function toFieldErrors(error: z.ZodError<ContactInput>): FieldErrors {
  const errors: FieldErrors = {};

  for (const issue of error.issues) {
    const field = issue.path[0];
    if (typeof field === "string" && !(field in errors)) {
      errors[field as keyof ContactInput] = issue.message;
    }
  }

  return errors;
}
