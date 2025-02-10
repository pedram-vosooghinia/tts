import { NextResponse, NextRequest } from "next/server";
import { apiTetisan } from "@/services/api";

export async function POST(req: NextRequest) {
  try {
    const { pk, english_name, price } = await req.json();

    if (!pk || !english_name || !price) {
      return NextResponse.json(
        {
          success: false,
          message: "تمامی فیلدهای لازم ارسال نشده‌اند",
        },
        { status: 400 }
      );
    }

    const { data } = await apiTetisan.put(`products/${pk}`, { english_name, price });

    if (!data) {
      return NextResponse.json(
        {
          success: false,
          message: "محصول مورد نظر یافت نشد",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data,
        message: "محصول مورد نظر با موفقیت ویرایش شد",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating product:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطایی رخ داد. لطفاً دوباره تلاش کنید.",
      },
      { status: 500 }
    );
  }
}
