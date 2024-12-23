import { NextResponse, NextRequest } from "next/server";
import { query } from "@/db";
import { v4 as uuidv4 } from "uuid"; // Import UUID generator
interface RequestBody {
  data: {
    hashatg_name: string;
    hashatg_type: "tts" | "rain.g" | "hebe";
    hashatg_count: number;
  };
}

export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json();

    const { hashatg_name, hashatg_type, hashatg_count } = body.data;
    if (!hashatg_name || !hashatg_type || typeof hashatg_count !== "number") {
      return NextResponse.json({
        success: false,
        message: "تمامی فیلدها الزامی هستند و مقدار count باید عدد باشد",
        status: 400,
      });
    }

    if (hashatg_count < 0) {
      return NextResponse.json({
        success: false,
        message: "مقدار count نمی‌تواند منفی باشد",
        status: 400,
      });
    }

    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const published_at = createdAt;
    const documentId = uuidv4();
    const sqlQuery = `
INSERT INTO hashtags (
  document_id, created_at, updated_at, published_at, created_by_id, updated_by_id, locale, name, type, count
  )
  VALUES (
    $1, $2, $3, $4, 1, 1, 'en', $5, $6, $7
    )
    `;
    const values = [
      documentId,
      createdAt,
      updatedAt,
      published_at,
      hashatg_name,
      hashatg_type,
      hashatg_count,
    ];
    await query(sqlQuery, values);
    return NextResponse.json({
      success: true,
      message: "هشتگ با موفقیت ثبت شد",
      status: 200,
    });
  } catch {
    return NextResponse.json({
      success: false,
      message: "خطایی رخ داده است، لطفا دوباره تلاش نمایید",
      status: 500,
    });
  }
}
