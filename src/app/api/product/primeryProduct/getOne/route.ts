export const dynamic = "force-dynamic";

import { NextResponse, NextRequest } from "next/server";
import { query } from "@/db";
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "id parameter is required.",
      });
    }

    const sqlQuery = "SELECT * FROM primeries WHERE id = $1";
    const values = [id];

    const result = await query(sqlQuery, values);

    if (result.rows.length > 0) {
      return NextResponse.json({ success: true, data: result.rows });
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
