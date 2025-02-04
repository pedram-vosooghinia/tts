export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { JwtPayload, verify } from "jsonwebtoken";
import { query } from "@/db";

export async function GET() {
  try {
    const token = cookies().get("token");
    if (!token || !token.value) {
      return NextResponse.json({
        success: false,
        message: "لطفا دوباره ورود شوید",
        status: 401,
      });
    }

    let decodedToken: string | JwtPayload;
    try {
      decodedToken = verify(token.value, process.env.SESSION_SECRET || "");
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "لطفا دوباره ورود شوید",
        },
        { status: 402 }
      );
    }

    if (typeof decodedToken !== "object" || !("tokenData" in decodedToken)) {
      return NextResponse.json(
        {
          success: false,
          message: "لطفا دوباره ورود شوید",
        },
        { status: 402 }
      );
    }

    const userResult = await query(
      'SELECT first_name, last_name, mobile, role, "is_active" FROM users WHERE id = $1',
      [(decodedToken as JwtPayload).tokenData.id]
    );

    const user = userResult.rows[0];
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "کاربر یافت نشد",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: user,
      status: 200,
      message: "شما با موفقیت وارد شدید",

    });
  } catch {
    return NextResponse.json({
      success: false,
      message: "خطای شبکه لطفا دوباره تلاش نمایید",
      status: 500,
    });
  }
}
