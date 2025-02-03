export const dynamic = 'force-dynamic'

import { NextResponse } from "next/server";
import db from "@/db";

export async function POST(req) {
  try {
    const { status } = await req.json();
    const result = await db.query("SELECT * FROM pre_forma WHERE status = $1", [
      status,
    ]);
    if (result.rows.length > 0) {
      return NextResponse.json({
        status: 200,
        success: true,
        message: "get order successful",
        data: result.rows,
      });
    } else {
      return NextResponse.json({
        status: 500,
        success: false,
        message: "Failed to get order.",
      });
    }
  } catch (error) {
    console.error("Error in get order (server) => ", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Something went wrong. Please retry later!",
    });
  }
}
