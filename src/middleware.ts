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

  const isPublicPath = path === "/login" || path === "/register";
  const token = request.cookies.get("authToken")?.value;

  // Redirect authenticated users away from login/register pages
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  // Redirect unauthenticated users to login
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  return NextResponse.next();
}
