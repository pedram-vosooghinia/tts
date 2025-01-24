export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { query } from "@/db";
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const seller_name = searchParams.get("seller_name");

    const sqlQuery = seller_name
      ? `SELECT * FROM customers WHERE seller_name = $1;`
      : `SELECT * FROM customers;`;
    const queryParams = seller_name ? [seller_name] : [];

    const result = await query(sqlQuery, queryParams);
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
        message: "هیج کاربری یافت نشد",
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
