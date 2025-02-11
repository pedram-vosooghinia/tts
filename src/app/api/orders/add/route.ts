import { NextResponse, NextRequest } from "next/server";
import { query } from "@/db";
import { MoveToShippingRequestProps } from "@/types/preForma";
import { UUID24C } from "@/utils/api/uuid16c";

interface RequestBody {
  data: MoveToShippingRequestProps;
}
export async function POST(req: NextRequest) {
  const body: RequestBody = await req.json();

  const { customer_id, total_price, order_items, status, discount } = body.data;

  if (!customer_id || !order_items || !total_price || !status || !discount) {
    return NextResponse.json({
      success: false,
      message: "تمامی فیلدها الزامی هستند",
      status: 400,
    });
  }

  const document_id = UUID24C();
  const createdAt = new Date().toISOString();
  const orderItemsJson = JSON.stringify(order_items);

  try {
    const sqlQuery = `
      INSERT INTO orders (document_id, customer_id, total_price, order_items, status ,discount, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;

    const result = await query(sqlQuery, [
      document_id,
      customer_id,
      total_price,
      orderItemsJson,
      status,
      discount,
      createdAt,
    ]);
    if (result.rows.length > 0) {
      return NextResponse.json({
        status: 200,
        success: true,
        message: "Save pre_forma successful",
      });
    } else {
      return NextResponse.json({
        status: 500,
        success: false,
        message: "Failed to save pre_forma.",
      });
    }
  } catch  {
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Something went wrong. Please retry later!",
    });
  }
}
