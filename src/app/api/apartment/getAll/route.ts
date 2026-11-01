import { NextResponse } from "next/server";
import { query } from "@/db";
export async function GET() {
  try {
    const result = await query(`SELECT * FROM apartment `, []);
    return NextResponse.json(
      {
        success: true,
        apartments: result.rows,
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "اشتباهی رخ داده است، لطفا دوباره تلاش نمایید",
      },
      { status: 500 },
    );
  }
}
