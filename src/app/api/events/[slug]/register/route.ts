import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getIp } from "@/lib/rate-limit";
import {
  TRAINING_SESSIONS,
  getEventForm,
  type EventFormConfig,
} from "@/lib/event-forms";

const BACKEND = process.env.BACKEND_API_URL ?? "http://localhost:8000";
const TOKEN = process.env.ADMIN_API_TOKEN ?? "";

type RegistrationStatus = "Pending" | "Registered" | "Waitlist";

interface RegisterResult {
  status: RegistrationStatus;
  event_name: string;
  delegate_first_name: string;
  delegate_preferred_name: string | null;
  delegate_email: string;
}

function isSameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function confirmationEmail(
  event: EventFormConfig,
  result: RegisterResult,
  session: string | undefined,
): { subject: string; body: string } {
  // Strip pronouns etc. ("Alex (they/them)" → "Alex") for the greeting.
  const preferred = result.delegate_preferred_name
    ?.replace(/\(.*?\)/g, "")
    .trim();
  const name = preferred || result.delegate_first_name;
  const sessionLabel = TRAINING_SESSIONS.find((s) => s.key === session)?.label;
  const details = [
    `**Event:** ${event.title}`,
    `**Date:** ${event.date}`,
    `**Time:** ${sessionLabel ?? event.time}`,
    ...(sessionLabel ? [] : [`**Location:** ${event.location}`]),
  ].join("\n");
  const signoff =
    "If you have any questions, please contact us at [registration@ssicsim.ca](mailto:registration@ssicsim.ca).\n\nSincerely,\nThe SSICSIM Secretariat";

  if (result.status === "Pending") {
    return {
      subject: `SSICSIM 2026 ${event.title} Application Received`,
      body: `Dear ${name},\n\nThank you for applying to ${event.title} at SSICSIM 2026! Your application has been received.\n\n${details}\n\nDue to highly limited availability, we cannot guarantee admittance to everyone who applies. We will email you if you are selected, so please check your inbox and spam folder for emails from us.\n\n${signoff}`,
    };
  }
  if (result.status === "Waitlist") {
    return {
      subject: `SSICSIM 2026 ${event.title} Waitlist`,
      body: `Dear ${name},\n\nThank you for registering for ${event.title} at SSICSIM 2026! ${sessionLabel ? "This session" : "The event"} is currently full, so you have been added to the waitlist.\n\n${details}\n\nIf a spot opens up, we will email you to confirm your place.\n\n${signoff}`,
    };
  }
  return {
    subject: `SSICSIM 2026 ${event.title} Registration Confirmed`,
    body: `Dear ${name},\n\nThank you for registering for ${event.title} at SSICSIM 2026! Your spot is confirmed.\n\n${details}\n\nIf you can no longer attend, please let us know as soon as possible so we can offer your spot to another delegate.\n\n${signoff}`,
  };
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const event = getEventForm(slug);
  if (!event) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }
  if (!isSameOrigin(req)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const ip = getIp(req);
  if (checkRateLimit(`events:ip:${ip}`, 10)) {
    return NextResponse.json(
      { error: "Too many registration attempts. Please try again later." },
      { status: 429 },
    );
  }

  let body: {
    first_name?: unknown;
    last_name?: unknown;
    email?: unknown;
    answers?: unknown;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const email = String(body.email ?? "")
    .toLowerCase()
    .trim();
  if (email && checkRateLimit(`events:${slug}:email:${email}`, 5)) {
    return NextResponse.json(
      {
        error:
          "Too many attempts with this email. Contact registration@ssicsim.ca if you need help.",
      },
      { status: 429 },
    );
  }

  const answers =
    body.answers && typeof body.answers === "object"
      ? (body.answers as Record<string, unknown>)
      : {};

  let res: Response;
  try {
    res = await fetch(`${BACKEND}/api/events/${slug}/register`, {
      method: "POST",
      headers: { "X-Admin-Token": TOKEN, "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        answers,
      }),
    });
  } catch {
    return NextResponse.json({ error: "Backend unavailable" }, { status: 503 });
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    // The backend explains why (not a registered delegate, name mismatch,
    // waitlisted, already registered, closed, ...) — pass that through.
    const detail = data?.detail;
    if (detail && typeof detail === "object" && "message" in detail) {
      return NextResponse.json(
        { code: detail.code, error: detail.message },
        { status: res.status },
      );
    }
    return NextResponse.json(data, { status: res.status });
  }

  const result = data as RegisterResult;
  const { subject, body: emailBody } = confirmationEmail(
    event,
    result,
    typeof answers.session === "string" ? answers.session : undefined,
  );
  // Sent from here rather than the browser so the confirmation always matches
  // what the backend recorded. A queue failure shouldn't fail the sign-up.
  await fetch(`${BACKEND}/api/email/queue`, {
    method: "POST",
    headers: { "X-Admin-Token": TOKEN, "Content-Type": "application/json" },
    body: JSON.stringify({
      recipients: [
        {
          email: result.delegate_email,
          name: result.delegate_first_name,
        },
      ],
      subject,
      body: emailBody,
    }),
  }).catch(() => {});

  // Only what the form needs; the delegate record never reaches the browser.
  return NextResponse.json(
    { status: result.status, event_name: result.event_name },
    { status: 201 },
  );
}
