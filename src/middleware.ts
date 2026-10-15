import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ALLOWED_ROUTES = new Set([
  "/",
  "/about",
  "/about/mission",
  "/team",
  "/conference",
  "/resources",
  "/events",
  "/contact",
  "/underconstruction",
  "/wrapped",
  "/committees",
  "/events/midnight-crisis/register",
  "/events/delegate-social/register",
  "/events/delegate-training/register",
]);

const CLOSED_ROUTES = [
  "/register",
  "/staff",
  "/apply",
  "/sec-hiring",
  "/director-hiring",
];

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

  // Conference registration and staff hiring have closed; old links go to
  // the home page.
  if (
    CLOSED_ROUTES.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`),
    )
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!ALLOWED_ROUTES.has(pathname)) {
    return NextResponse.redirect(new URL("/underconstruction", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
