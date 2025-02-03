export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { query } from "@/db";
export async function GET() {
  try {
    const sqlQuery = `
      SELECT document_id, product_name, brand, sale_type, price ,  barcode
      FROM products;
    `;
    const result = await query(sqlQuery, []);
    if (result.rows.length > 0) {
      return NextResponse.json({
        success: true,
        data: result.rows,
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
