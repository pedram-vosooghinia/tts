import { NextResponse, NextRequest } from "next/server";
import { query } from "@/db";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; 
    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "شناسه آپارتمان ارسال نشده است.",
        },
        { status: 400 },
      );
    }
    const result = await query(
      `
      DELETE FROM apartment
      WHERE id = $1
      RETURNING *;
      `,
      [id],
    );
    if (result.rowCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "آپارتمان پیدا نشد.",
        },
        { status: 404 },
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "آپارتمان با موفقیت حذف شد.",
        apartment: result.rows[0],
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
