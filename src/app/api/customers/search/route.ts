export const dynamic = "force-dynamic";

import { NextResponse, NextRequest } from "next/server";
import { query } from "@/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get("name");

    if (!searchTerm) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Name parameter is required",
      });
    }

    const sqlQuery = `
      SELECT * FROM customers
      WHERE customer_name ILIKE $1;
    `;
    const values = [`%${searchTerm}%`];
    const result = await query(sqlQuery, values);

    return NextResponse.json({
      success: result.rows.length > 0,
      data: result.rows,
      status: result.rows.length > 0 ? 200 : 404,
      message: result.rows.length > 0 ? undefined : "No customers found",
    });
  } catch  {
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Something went wrong. Please try again!",
    });
  }
}
