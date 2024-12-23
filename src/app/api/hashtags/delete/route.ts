import { NextResponse, NextRequest } from "next/server";
import { query } from "@/db";

export async function DELETE(req: NextRequest) {
  try {
    const { document_id } = await req.json();

    const sqlQuery = `
      DELETE FROM hashtags
      WHERE document_id = $1
      RETURNING *;
    `;

    const result = await query(sqlQuery, [document_id]);

    if (result.rows.length > 0) {
      return NextResponse.json({
        success: true,
        data: result.rows[0],
        status: 200,
        message: "هشتگ مورد نظر با موفقیت حذف شد",
      });
    } else {
      return NextResponse.json({
        status: 204,
        success: false,
        message: "هشتگ مورد نظر یافت نشد",
      });
    }
  } catch  {
    return NextResponse.json({
      status: 500,
      success: false,
      message: "خطایی رخ داده است لطفا دوباره تلاش نمایید",
    });
  }
}
