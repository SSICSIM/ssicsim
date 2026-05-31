import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getIp } from "@/lib/rate-limit";

const BACKEND = process.env.BACKEND_API_URL ?? "http://localhost:8000";
const TOKEN = process.env.ADMIN_API_TOKEN ?? "";
const REGISTRATION_OPEN = process.env.REGISTRATION_OPEN !== "false";

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
    return NextResponse.json({ error: "Registration is currently closed" }, { status: 403 });
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
    const email = (body.email ?? "").toLowerCase().trim();
    if (email && checkRateLimit(`delegates:email:${email}`, 2)) {
      return NextResponse.json(
        { error: "This email has already been used to register. Contact registration@ssicsim.ca if you need help." },
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
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: "Backend unavailable" }, { status: 503 });
  }
}
