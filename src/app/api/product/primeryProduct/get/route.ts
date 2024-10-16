export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { sortData } from "@/utils/api/sortData";
import { query } from "@/db";
export async function GET() {
  try {
    const sqlQuery = `
    SELECT id, images, product_need_text FROM primery;
  `;
    const result = await query(sqlQuery, []);
    if (result.rows.length > 0) {
      const sortedData = sortData(result.rows, "id", "desc");
      return NextResponse.json({
        success: true,
        data: sortedData,
        status: 200,
      });
    } else {
      return NextResponse.json({
        status: 204,
        success: false,
        message: "هیج محصولی یافت نشد",
      });
    }
  } catch {
    return NextResponse.json({
      status: 500,
      success: false,
      message: "خطایی رخ داده است لطفا دوباره تلاش نمایید",
    });
  }
}
