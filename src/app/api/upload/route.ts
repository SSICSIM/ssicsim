import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getIp } from "@/lib/rate-limit";
import { uploadFileToDrive, type DriveUploadKind } from "@/lib/google-drive";

const REGISTRATION_OPEN = process.env.REGISTRATION_OPEN !== "false";

// Vercel's default Node.js serverless function body limit is 4.5MB, well
// under what the old Google Form allowed — cap here so we fail with a clear
// error instead of a generic platform 413.
const MAX_FILE_BYTES = 4 * 1024 * 1024;

const ALLOWED_KINDS: DriveUploadKind[] = ["code_of_conduct", "payment_receipt"];
const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "image/png",
  "image/jpeg",
]);

const EXTENSION_BY_MIME: Record<string, string> = {
  "application/pdf": "pdf",
  "image/png": "png",
  "image/jpeg": "jpg",
};

const LABEL_BY_KIND: Record<DriveUploadKind, string> = {
  code_of_conduct: "Code of Conduct",
  payment_receipt: "Payment",
};

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
  if (checkRateLimit(`upload:ip:${ip}`, 15)) {
    return NextResponse.json(
      { error: "Too many uploads. Please try again later." },
      { status: 429 },
    );
  }

  const formData = await req.formData();
  const file = formData.get("file");
  const kind = formData.get("kind");
  const name = formData.get("name");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (
    typeof kind !== "string" ||
    !ALLOWED_KINDS.includes(kind as DriveUploadKind)
  ) {
    return NextResponse.json({ error: "Invalid upload kind" }, { status: 400 });
  }
  if (typeof name !== "string" || !name.trim()) {
    return NextResponse.json(
      { error: "Missing delegate name" },
      { status: 400 },
    );
  }
  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: "Only PDF, PNG, or JPEG files are accepted" },
      { status: 400 },
    );
  }
  if (file.size > MAX_FILE_BYTES) {
    return NextResponse.json(
      {
        error: `File too large. Max size is ${MAX_FILE_BYTES / (1024 * 1024)}MB.`,
      },
      { status: 400 },
    );
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const safeName = name.trim().replace(/[^\w.\- ]/g, "_");
    const ext = EXTENSION_BY_MIME[file.type] ?? "pdf";
    const fileName = `${LABEL_BY_KIND[kind as DriveUploadKind]} - ${safeName}.${ext}`;
    const { url } = await uploadFileToDrive(
      kind as DriveUploadKind,
      fileName,
      file.type,
      buffer,
    );
    return NextResponse.json({ url });
  } catch (err) {
    console.error("Drive upload failed", err);
    // Surfaced to the client so config issues (bad folder id, missing share,
    // etc.) are visible without digging through server logs. Drive's error
    // text doesn't leak secrets — just resource ids/permissions state.
    const detail = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: `Upload failed: ${detail}` },
      { status: 502 },
    );
  }
}
