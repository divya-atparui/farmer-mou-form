import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Skip middleware for static files and api routes
  if (
    path.startsWith('/_next') || 
    path.startsWith('/api') ||
    path.includes('.')
  ) {
    return NextResponse.next();
  }

  // Define public paths that don't require authentication
  const isPublicPath = [
    "/login",
    "/login/otp",
    "/register"
  ].includes(path);

  const token = request.cookies.get("authToken")?.value;

  // If there's no token and we're not already on a public path, redirect to login
  if (!token && !isPublicPath) {
    const loginUrl = new URL("/login", request.nextUrl);
    // Preserve the original URL as a redirect parameter
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from login/register pages
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  return NextResponse.next();
}
