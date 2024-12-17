import { NextResponse, NextRequest } from "next/server";
import { query } from "@/db";
export async function POST(request: NextRequest) {
  try {
    const { barcode } = await request.json();
    if (!barcode) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Barcode parameter is required.",
      });
    }

    const sqlQuery = `SELECT * FROM products WHERE barcode = $1`;
    const values = [barcode];

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
