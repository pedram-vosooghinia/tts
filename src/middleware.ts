import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const tokenValue = cookies().get("token");

  // If user has a token, prevent access to "/" or "/signin" and redirect to "/dashboard"
  if (tokenValue && ["/", "/signin"].includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If user has no token, prevent access to "/dashboard/*" and redirect to "/"
  if (!tokenValue && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/signin", "/dashboard/:path*"], // Apply middleware to these routes
};
