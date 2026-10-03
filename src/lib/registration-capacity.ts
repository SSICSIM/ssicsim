// Server-only: asks the admin portal whether delegate registration is full.
// Reads ADMIN_API_TOKEN, so never import this from a client component.

const BACKEND = process.env.BACKEND_API_URL ?? "http://localhost:8000";
const TOKEN = process.env.ADMIN_API_TOKEN ?? "";
const TIMEOUT_MS = 5000;

export interface RegistrationCapacity {
  capacity: number;
  registered: number;
  waitlisted: number;
  is_full: boolean;
}

/**
 * Returns the current capacity, or null if the admin portal can't be reached.
 * Callers should treat null as "not full": the backend still rejects
 * non-waitlist registrations once capacity is reached.
 */
export async function getRegistrationCapacity(): Promise<RegistrationCapacity | null> {
  try {
    const res = await fetch(`${BACKEND}/api/delegates/capacity`, {
      headers: { "X-Admin-Token": TOKEN },
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) {
      console.error(`Registration capacity fetch failed: ${res.status}`);
      return null;
    }
    return (await res.json()) as RegistrationCapacity;
  } catch (error) {
    console.error("Registration capacity fetch failed:", error);
    return null;
  }
}
