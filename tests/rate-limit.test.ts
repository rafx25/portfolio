import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { clientKey, rateLimit, resetRateLimits } from "@/lib/rate-limit";

describe("rateLimit", () => {
  beforeEach(() => {
    resetRateLimits();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("allows requests up to the limit", () => {
    expect(rateLimit("1.1.1.1", { max: 3 }).allowed).toBe(true);
    expect(rateLimit("1.1.1.1", { max: 3 }).allowed).toBe(true);
    expect(rateLimit("1.1.1.1", { max: 3 }).allowed).toBe(true);
  });

  it("blocks the request after the limit is reached", () => {
    for (let i = 0; i < 3; i++) rateLimit("1.1.1.1", { max: 3 });

    const blocked = rateLimit("1.1.1.1", { max: 3 });
    expect(blocked.allowed).toBe(false);
    expect(blocked.remaining).toBe(0);
    expect(blocked.retryAfter).toBeGreaterThan(0);
  });

  it("keeps separate counters per key", () => {
    for (let i = 0; i < 3; i++) rateLimit("1.1.1.1", { max: 3 });

    expect(rateLimit("2.2.2.2", { max: 3 }).allowed).toBe(true);
  });

  it("allows again once the window has passed", () => {
    for (let i = 0; i < 3; i++) rateLimit("1.1.1.1", { max: 3, windowMs: 1000 });
    expect(rateLimit("1.1.1.1", { max: 3, windowMs: 1000 }).allowed).toBe(false);

    vi.advanceTimersByTime(1001);

    expect(rateLimit("1.1.1.1", { max: 3, windowMs: 1000 }).allowed).toBe(true);
  });
});

describe("clientKey", () => {
  it("uses the first address in x-forwarded-for", () => {
    const headers = new Headers({ "x-forwarded-for": "203.0.113.5, 70.41.3.18" });
    expect(clientKey(headers)).toBe("203.0.113.5");
  });

  it("falls back to a shared bucket when the header is missing", () => {
    expect(clientKey(new Headers())).toBe("unknown");
  });
});
