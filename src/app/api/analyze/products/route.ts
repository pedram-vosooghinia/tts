export const dynamic = "force-dynamic";
import { sortData } from "@/utils/api/sortData";
import { NextResponse } from "next/server";
import { query } from "@/db";
export async function GET() {
  try {
    const sqlQuery = `
    SELECT 
      price,
      barcode,
      category,
      jalali_date_chanell
    FROM products;
  `;

    const result = await query(sqlQuery,[]);

    if (result.rows.length > 0) {
      const sortedData = sortData(result.rows, "jalali_date_chanell", "desc");

      return NextResponse.json({ success: true, data: sortedData });
    } else {
      return NextResponse.json({
        status: 204,
        success: false,
        message: "No products found.",
      });
    }
  } catch (error) {
    console.error("Error in fetching products (server) => ", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Something went wrong. Please try again!",
    });
  }
}
