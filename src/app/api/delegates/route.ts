import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getIp } from "@/lib/rate-limit";

const BACKEND = process.env.BACKEND_API_URL ?? "http://localhost:8000";
const TOKEN = process.env.ADMIN_API_TOKEN ?? "";
const REGISTRATION_OPEN = process.env.REGISTRATION_OPEN !== "false";

// The only statuses a public registration may start in. Anything else (e.g.
// "Assigned") is set by the Secretariat in the admin portal.
const PUBLIC_STATUSES = new Set([
  "Waitlist",
  "Awaiting Payment",
  "Verify Payment",
]);

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

export async function POST(req: NextRequest) {
  if (!REGISTRATION_OPEN) {
    return NextResponse.json(
      { error: "Registration is currently closed" },
      { status: 403 },
    );
  }
  if (!isSameOrigin(req)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const ip = getIp(req);
  if (checkRateLimit(`delegates:ip:${ip}`, 5)) {
    return NextResponse.json(
      { error: "Too many registration attempts. Please try again later." },
      { status: 429 },
    );
  }

  try {
    const body = await req.json();
    if (!PUBLIC_STATUSES.has(body.delegate_status)) {
      return NextResponse.json(
        { error: "Invalid registration status" },
        { status: 400 },
      );
    }
    // Waitlisted delegates haven't paid, so never store a receipt for them.
    if (body.delegate_status === "Waitlist") body.payment_receipt_url = null;
    const email = (body.email ?? "").toLowerCase().trim();
    if (email && checkRateLimit(`delegates:email:${email}`, 2)) {
      return NextResponse.json(
        {
          error:
            "This email has already been used to register. Contact registration@ssicsim.ca if you need help.",
        },
        { status: 429 },
      );
    }
    const res = await fetch(`${BACKEND}/api/delegates`, {
      method: "POST",
      headers: {
        "X-Admin-Token": TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    // The backend refuses non-waitlist registrations once capacity is reached;
    // tell the form so it can switch to waitlist mode.
    if (res.status === 409 && data?.detail?.code === "registration_full") {
      return NextResponse.json(
        { code: "registration_full", detail: data.detail.message },
        { status: 409 },
      );
    }
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: "Backend unavailable" }, { status: 503 });
  }
}
