import { NextResponse } from "next/server";
import { cookies } from "next/headers";
export async function POST(req: Request) {
  try {
    const { jwtToken } = await req.json();
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
