import { NextResponse,NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request:NextRequest) {

  const tokenValue = cookies().get('token')
  if (!(tokenValue)) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};

