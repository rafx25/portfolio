// In-memory fixed window. On Vercel each instance keeps its own map, so the
// limit is per instance and resets on cold start. Good enough to stop a flood
// on a contact form. Swap in Redis behind these same functions if it ever
// needs to be a real limit.

type Entry = { count: number; resetAt: number };

const buckets = new Map<string, Entry>();

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 3;

function evictExpired(now: number) {
  if (buckets.size < 500) return;

  for (const [key, entry] of buckets) {
    if (entry.resetAt <= now) buckets.delete(key);
  }
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  /** Seconds until the window resets. Sent as Retry-After. */
  retryAfter: number;
}

export function rateLimit(
  key: string,
  { windowMs = WINDOW_MS, max = MAX_REQUESTS } = {},
): RateLimitResult {
  const now = Date.now();
  evictExpired(now);

  const entry = buckets.get(key);

  if (!entry || entry.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: max - 1, retryAfter: 0 };
  }

  entry.count += 1;

  return {
    allowed: entry.count <= max,
    remaining: Math.max(0, max - entry.count),
    retryAfter: Math.ceil((entry.resetAt - now) / 1000),
  };
}

export function resetRateLimits() {
  buckets.clear();
}

export function clientKey(headers: Headers): string {
  const ip = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return ip && ip.length > 0 ? ip : "unknown";
}
