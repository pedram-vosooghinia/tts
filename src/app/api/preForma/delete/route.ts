import { NextResponse } from "next/server";
import db from "@/db";

export async function DELETE(req) {
  try {
    const { orderId } = await req.json();
    const query = `
      DELETE FROM pre_forma
      WHERE id = $1
      RETURNING *;
    `;

    const result = await db.query(query, [orderId]);

    if (result.rowCount > 0) {
      return NextResponse.json({ success: true, data: result.rows[0] });
    } else {
      return NextResponse.json({
        status: 404,
        success: false,
        message: "Order not found.",
      });
    }
  } catch (error) {
    console.error("Error in deleting order (server) => ", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Something went wrong. Please try again!",
    });
  }
}
