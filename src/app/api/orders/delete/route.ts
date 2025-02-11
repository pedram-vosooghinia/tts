import { NextResponse, NextRequest } from "next/server";
import { query } from "@/db";

export async function DELETE(req:NextRequest) {
  try {
    const { orderId } = await req.json();
    const sqlQuery = `
      DELETE FROM pre_forma
      WHERE id = $1
      RETURNING *;
    `;

    const result = await query(sqlQuery, [orderId]);

    if (result.rows.length > 0) {
      return NextResponse.json({ success: true, data: result.rows[0] });
    } else {
      return NextResponse.json({
        status: 404,
        success: false,
        message: "Order not found.",
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
