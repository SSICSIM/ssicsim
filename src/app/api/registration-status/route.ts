import { NextResponse } from "next/server";
import { getRegistrationCapacity } from "@/lib/registration-capacity";

export const dynamic = "force-dynamic";

// Public: only exposes whether we're in waitlist mode, not the raw counts.
export async function GET() {
  const capacity = await getRegistrationCapacity();
  return NextResponse.json({ waitlist: capacity?.is_full ?? false });
}
