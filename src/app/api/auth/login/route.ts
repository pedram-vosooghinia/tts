import { compare } from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import { sign } from "jsonwebtoken";
import { query } from "@/db";

const allowedOrigin = "http://localhost:4200"; // آدرس Angular در حالت توسعه


export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": allowedOrigin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
export async function POST(req: NextRequest) {
  try {
    const { mobile, password } = await req.json();
    if (!mobile || !password)
      return NextResponse.json(
        {
          success: false,
          message: "لطفا مقادیر فرم را پر نمایید",
        },

        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": allowedOrigin,
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        }
      );

    const userResult = await query("SELECT * FROM users WHERE mobile = $1", [
      mobile,
    ]);
    const user = userResult.rows[0];
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "کاربر یافت نشد",
        },
        {
          status: 404,
          headers: {
            "Access-Control-Allow-Origin": allowedOrigin,
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        }
      );
    }

    if (!user.is_active) {
      return NextResponse.json(
        {
          success: false,
          message: "حساب کاربری شما غیرفعال است",
        },
        {
          status: 403,
          headers: {
            "Access-Control-Allow-Origin": allowedOrigin,
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        }
      );
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          message: "پسورد صحیح نمی باشد",
        },

        {
          status: 404,
          headers: {
            "Access-Control-Allow-Origin": allowedOrigin,
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        }
      );
    }

    const tokenData = { id: user.id };
    const secret = process.env.SESSION_SECRET || "";
    const token = sign({ tokenData }, secret, { expiresIn: "1d" });

    cookies().set({
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      sameSite: "strict",
    });

    return NextResponse.json(
      {
        success: true,
        message: "شما با موفقیت وارد شدید",
        user,
      },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": allowedOrigin,
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "خطای شبکه لطفا دوباره تلاش نمایید",
      },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": allowedOrigin,
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  }
}
