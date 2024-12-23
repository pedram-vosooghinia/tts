export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { sortData } from "@/utils/api/sortData";
import { query } from "@/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    const sqlQuery = type
      ? `SELECT * FROM hashtags WHERE type = $1;`
      : `SELECT * FROM hashtags;`;
    const queryParams = type ? [type] : [];

    const result = await query(sqlQuery, queryParams);

    if (!result?.rows?.length) {
      return NextResponse.json(
        {
          success: false,
          message: "هیچ هشتگی یافت نشد",
          data: [],
        },
        { status: 200 }
      );
    }

    const sortedData = sortData(result.rows, "id", "desc");

    return NextResponse.json(
      {
        success: true,
        data: sortedData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching hashtags:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطایی رخ داده است لطفا دوباره تلاش نمایید",
      },
      { status: 500 }
    );
  }
}
