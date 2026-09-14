// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/mail", () => ({
  isMailConfigured: vi.fn(),
  sendContactMessage: vi.fn(),
}));

import { POST } from "@/app/api/contact/route";
import { isMailConfigured, sendContactMessage } from "@/lib/mail";
import { resetRateLimits } from "@/lib/rate-limit";

const valid = {
  name: "Jane Santos",
  email: "jane@company.com",
  subject: "Full stack role",
  message: "We are hiring and your case studies were useful reading.",
};

function post(body: unknown, ip = "203.0.113.7") {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": ip },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

beforeEach(() => {
  resetRateLimits();
  vi.mocked(isMailConfigured).mockReset().mockReturnValue(true);
  vi.mocked(sendContactMessage).mockReset().mockResolvedValue({ ok: true });
});

describe("POST /api/contact", () => {
  it("sends a valid message", async () => {
    const response = await POST(post(valid));

    expect(response.status).toBe(200);
    expect(sendContactMessage).toHaveBeenCalledOnce();
  });

  it("rejects a body that is not JSON", async () => {
    const response = await POST(post("{not json"));

    expect(response.status).toBe(400);
    expect(sendContactMessage).not.toHaveBeenCalled();
  });

  it("returns field errors for invalid input", async () => {
    const response = await POST(post({ ...valid, email: "nope" }));
    const payload = await response.json();

    expect(response.status).toBe(422);
    expect(payload.errors).toHaveProperty("email");
    expect(sendContactMessage).not.toHaveBeenCalled();
  });

  it("answers a filled honeypot as a success without sending", async () => {
    const response = await POST(post({ ...valid, company: "Spam Inc" }));

    expect(response.status).toBe(200);
    expect(sendContactMessage).not.toHaveBeenCalled();
  });

  it("reports when email delivery is not configured", async () => {
    vi.mocked(isMailConfigured).mockReturnValue(false);

    const response = await POST(post(valid));
    const payload = await response.json();

    expect(response.status).toBe(503);
    expect(payload.code).toBe("not-configured");
  });

  it("returns 502 when the provider fails", async () => {
    vi.mocked(sendContactMessage).mockResolvedValue({
      ok: false,
      reason: "provider-error",
    });

    const response = await POST(post(valid));

    expect(response.status).toBe(502);
  });

  it("rate limits by address and says when to retry", async () => {
    for (let i = 0; i < 3; i++) {
      expect((await POST(post(valid))).status).toBe(200);
    }

    const blocked = await POST(post(valid));

    expect(blocked.status).toBe(429);
    expect(Number(blocked.headers.get("Retry-After"))).toBeGreaterThan(0);
    expect((await POST(post(valid, "198.51.100.2"))).status).toBe(200);
  });
});
