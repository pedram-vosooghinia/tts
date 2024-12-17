export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { sortData } from "@/utils/api/sortData";
import { query } from "@/db";
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") || "";
    const month = parseInt(searchParams.get("month") || "0", 10);
    const jalaliMonth = `1403-${month.toString().padStart(2, "0")}-%`;
    const result = await query(
      `SELECT * FROM orders 
      WHERE status = $1 
      AND jalali_date_pay LIKE $2
      LIMIT $3`,
      [status, jalaliMonth, month]
    );

    if (result.rows.length > 0) {
      const sortedDataDate = sortData(result.rows, "jalali_date_pay", "desc");
      const sortedDataId = sortData(sortedDataDate, "id", "desc");
      return NextResponse.json({
        status: 200,
        success: true,
        message: "get order successful",
        data: sortedDataId,
      });
    } else {
      return NextResponse.json({
        status: 200,
        data: [],
        success: false,
        message: "Failed to get order.",
      });
    }
  } catch {
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Something went wrong. Please retry later!",
    });
  }
}
