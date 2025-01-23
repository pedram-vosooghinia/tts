import { NextResponse, NextRequest } from "next/server";
import { query } from "@/db";
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    const sqlQuery = `
      DELETE FROM primery
      WHERE id = $1
      RETURNING *;
    `;

    const result = await query(sqlQuery, [id]);

    if (result.rows.length > 0) {
      return NextResponse.json({
        success: true,
        data: result.rows[0],
        status: 200,
        message: "محصول مورد نظر با موفقیت حذف شد",
      });
    } else {
      return NextResponse.json({
        status: 204,
        success: false,
        message: "محصول مورد نظر یافت نشد",
      });
    }
  } catch {
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Something went wrong. Please try again!",
    });
  }
}
