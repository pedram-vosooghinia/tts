export const dynamic = "force-dynamic";
import { sortData } from "@/utils/api/sortData";

import { NextResponse, NextRequest } from "next/server";
import { query } from "@/db";
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const offset = parseInt(url.searchParams.get("offset") || "0");
    const limit = parseInt(url.searchParams.get("limit") || "20");

    const sqlQuery = `
      SELECT * FROM products
      ORDER BY barcode DESC
      OFFSET $1
      LIMIT $2;
    `;

    const result = await query(sqlQuery, [offset, limit]);

    if (result.rows.length > 0) {
      const sortedDataId = sortData(result.rows, "barcode", "desc");

      return NextResponse.json({
        status: 200,
        success: true,
        data: sortedDataId,
      });
    } else {
      return NextResponse.json({
        status: 204,
        success: false,
        message: "No products found.",
      });
    }
  } catch  {
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Something went wrong. Please try again!",
    });
  }
}
