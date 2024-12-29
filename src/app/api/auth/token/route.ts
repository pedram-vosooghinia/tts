import { NextResponse } from "next/server";
import { cookies } from "next/headers";
// export async function POST(req: Request) {
export async function POST() {
  try {
    // const { jwtToken } = await req.json();
    const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjM0NTY3ODkwIiwibmFtZSI6Ik1pbGFkIEtpYW5pIiwiaWF0IjoxNjE2MjY3MjAwLCJleHBpcmF0aW9uIjoxNjE2MjY3ODAwfQ.8cV5Xq3wzTg3YgM3z7H0n1J7D_5Z1F5j7XgD9qA3e3c"; // توکن فرضی

    cookies().set("token", jwtToken, {
      httpOnly: true,
      path: "/",
      sameSite: "strict",
    });

    return NextResponse.json({
      success: true,
      message: "token saved",
      status: 200,
    });
  } catch {
    return NextResponse.json({
      success: false,
      message: "خطای شبکه لطفا دوباره تلاش نمایید",
      status: 500,
    });
  }
}
