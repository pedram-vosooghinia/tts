import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
export async function proxy(request: NextRequest) {
  const tokenValue = (await cookies()).get("token");
  const path = request.nextUrl.pathname;

  if (tokenValue && ["/login", "/signin"].includes(path)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!tokenValue && path.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signin", "/dashboard/:path*"],
};
