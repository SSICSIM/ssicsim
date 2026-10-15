// Server-only: asks the admin portal whether an event is closed or full.
// Reads ADMIN_API_TOKEN, so never import this from a client component.

import type { EventSlug } from "@/lib/event-forms";

const BACKEND = process.env.BACKEND_API_URL ?? "http://localhost:8000";
const TOKEN = process.env.ADMIN_API_TOKEN ?? "";
const TIMEOUT_MS = 5000;

interface BackendEvent {
  slug: string;
  capacity: number | null;
  registration_open: boolean;
  registration_deadline: string | null;
  filled: number;
  sessions: { key: string; capacity: number | null; filled: number }[];
}

export interface EventStatus {
  // Closed by SEC or past the deadline: the form can't be submitted.
  closed: boolean;
  // New sign-ups join the waitlist (for Training: every session is full).
  full: boolean;
  // Training sessions whose in-person spots are taken.
  fullSessions: string[];
}

function toStatus(event: BackendEvent): EventStatus {
  const pastDeadline =
    !!event.registration_deadline &&
    new Date(event.registration_deadline).getTime() < Date.now();
  const fullSessions = event.sessions
    .filter((s) => s.capacity != null && s.filled >= s.capacity)
    .map((s) => s.key);
  return {
    closed: !event.registration_open || pastDeadline,
    // Midnight Crisis is selective (every application is reviewed), so it's
    // never "full" from the form's point of view.
    full:
      event.slug !== "midnight-crisis" &&
      (event.sessions.length > 0
        ? fullSessions.length === event.sessions.length
        : event.capacity != null && event.filled >= event.capacity),
    fullSessions,
  };
}

async function fetchJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${BACKEND}${path}`, {
      headers: { "X-Admin-Token": TOKEN },
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) {
      console.error(`Event status fetch failed: ${res.status}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (error) {
    console.error("Event status fetch failed:", error);
    return null;
  }
}

/**
 * Returns the event's status, or null if the admin portal can't be reached.
 * Callers should treat null as "open, not full": the backend still enforces
 * the deadline and waitlists sign-ups past capacity.
 */
export async function getEventStatus(
  slug: EventSlug,
): Promise<EventStatus | null> {
  const event = await fetchJson<BackendEvent>(`/api/events/${slug}`);
  return event ? toStatus(event) : null;
}

export async function getAllEventStatuses(): Promise<
  Partial<Record<string, EventStatus>>
> {
  const events = await fetchJson<BackendEvent[]>("/api/events");
  return Object.fromEntries((events ?? []).map((e) => [e.slug, toStatus(e)]));
}
