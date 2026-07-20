import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// FastAPI returns validation errors as detail: [{ loc, msg, type }, ...]
// rather than a plain string, so `new Error(data.detail)` renders as
// "[object Object]" unless we unpack it first.
export function apiErrorMessage(data: unknown, fallback: string): string {
  const detail = (data as { detail?: unknown } | null)?.detail;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) {
    const msgs = detail
      .map((d) => (d && typeof d === "object" && "msg" in d ? String((d as { msg: unknown }).msg) : null))
      .filter((m): m is string => !!m);
    if (msgs.length) return msgs.join(" ");
  }
  return fallback;
}
