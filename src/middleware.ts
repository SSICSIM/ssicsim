import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ALLOWED_ROUTES = new Set([
  "/",
  "/about",
  "/about/mission",
  "/team",
  "/conference",
  "/resources",
  "/staff",
  "/apply",
  "/contact",
  "/staff/openings",
  "/underconstruction",
  "/wrapped",
  "/committees",
]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow Next.js internals, static files, and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/assets") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  if (!ALLOWED_ROUTES.has(pathname)) {
    return NextResponse.redirect(new URL("/underconstruction", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
