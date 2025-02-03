export const dynamic = 'force-dynamic'

import { NextResponse } from "next/server";
import db from "@/db";

export async function GET(request) {
  try {
    const { searchParams }  = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "id parameter is required.",
      });
    }

    const query = `SELECT * FROM pre_forma WHERE id = $1`;
    const values = [id];

    const result = await db.query(query, values);

    if (result.rows.length > 0) {
      return NextResponse.json({ success: true, data: result.rows });
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
