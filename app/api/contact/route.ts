import { NextResponse } from "next/server";

import { contactSchema, toFieldErrors } from "@/lib/validation";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { isMailConfigured, sendContactMessage } from "@/lib/mail";

// Rate limit first so a flood is cheap to reject, then validate, then the
// spam check, then send.
export async function POST(request: Request) {
  const limit = rateLimit(clientKey(request.headers));

  if (!limit.allowed) {
    return NextResponse.json(
      { message: "Too many messages from this address. Please try again later." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Please check the highlighted fields.",
        errors: toFieldErrors(parsed.error),
      },
      { status: 422 },
    );
  }

  // Answer as if it worked. A bot gets nothing useful back.
  if (parsed.data.company) {
    return NextResponse.json({ message: "Thanks — your message has been sent." });
  }

  if (!isMailConfigured()) {
    return NextResponse.json(
      {
        message:
          "Email delivery is not configured on this deployment. Please use the email link instead.",
        code: "not-configured",
      },
      { status: 503 },
    );
  }

  const result = await sendContactMessage(parsed.data);

  if (!result.ok) {
    return NextResponse.json(
      { message: "The message could not be sent right now. Please email me directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ message: "Thanks — your message has been sent." });
}
