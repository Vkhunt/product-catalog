import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    console.log(`[Middleware] Admin Access: ${request.nextUrl.pathname} at ${new Date().toISOString()}`);

    const adminToken = request.cookies.get("admin_token");
    if (!adminToken) {
      return NextResponse.redirect(new URL("/?error=admin_only", request.url));
    }

    const response = NextResponse.next();
    response.headers.set("X-Admin-Visit", "true");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
