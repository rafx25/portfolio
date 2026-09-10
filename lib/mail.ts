import { Resend } from "resend";

import type { ContactInput } from "./validation";

export type DeliveryResult =
  { ok: true } | { ok: false; reason: "not-configured" | "provider-error" };

// Env is read per call, not at import, so a missing key is something the route
// can report instead of something that breaks the build.
export function isMailConfigured() {
  return Boolean(
    process.env.RESEND_API_KEY &&
    process.env.CONTACT_TO_EMAIL &&
    process.env.CONTACT_FROM_EMAIL,
  );
}

function sanitiseHeader(value: string) {
  return value.replace(/[\r\n]+/g, " ").slice(0, 200);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendContactMessage(input: ContactInput): Promise<DeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    return { ok: false, reason: "not-configured" };
  }

  try {
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from,
      to,
      // Sender address is user input. It belongs in replyTo, not from.
      replyTo: input.email,
      subject: sanitiseHeader(`[Portfolio] ${input.subject}`),
      text: [
        `From: ${input.name} <${input.email}>`,
        `Subject: ${input.subject}`,
        "",
        input.message,
      ].join("\n"),
      html: `
        <p><strong>From:</strong> ${escapeHtml(input.name)} &lt;${escapeHtml(input.email)}&gt;</p>
        <p><strong>Subject:</strong> ${escapeHtml(input.subject)}</p>
        <hr />
        <p style="white-space:pre-wrap">${escapeHtml(input.message)}</p>
      `,
    });

    if (error) {
      console.error("[contact] provider rejected the message:", error.name);
      return { ok: false, reason: "provider-error" };
    }

    return { ok: true };
  } catch (cause) {
    console.error("[contact] delivery failed:", cause);
    return { ok: false, reason: "provider-error" };
  }
}
