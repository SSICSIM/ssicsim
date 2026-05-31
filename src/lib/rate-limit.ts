// In-memory rate limiter. Resets on cold starts, which is acceptable for
// a low-traffic conference registration site. No external services required.

const WINDOW_MS = 60 * 60 * 1000; // 1 hour

interface Entry {
  count: number;
  windowStart: number;
}

const store = new Map<string, Entry>();

export function checkRateLimit(key: string, max: number): boolean {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now - entry.windowStart > WINDOW_MS) {
    store.set(key, { count: 1, windowStart: now });
    return false; // not limited
  }

  if (entry.count >= max) return true; // limited

  entry.count++;
  return false;
}

export function getIp(req: Request): string {
  return (
    (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() ||
    (req.headers.get("x-real-ip") ?? "") ||
    "unknown"
  );
}
