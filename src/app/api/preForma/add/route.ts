import { NextResponse, NextRequest } from "next/server";
import { query } from "@/db";
import { MoveToShippingProps } from "@/types/preForma";

interface RequestBody {
  data: MoveToShippingProps;  // اینجا MoveToShippingProps رو مستقیم استفاده می‌کنیم
}
export async function POST(req:NextRequest) {
  const body: RequestBody = await req.json();

  const { exceptionsPrice, totalInvoice, discountAmount, finalPay } = body.data;

  if (!exceptionsPrice || totalInvoice == null || discountAmount == null || finalPay == null) {
    return NextResponse.json({
      success: false,
      message: "تمامی فیلدها الزامی هستند",
      status: 400,
    });
  }

  const createdAt = new Date().toISOString();
  try {
    const {
      order_items,
      total_price,
      status,
      customer,
      discount_amount,
      marketer_discount,
      final_pay,
      buy_type
    } = await req.json();
    const orderItemsJson = JSON.stringify(order_items);

    const sqlQuery = `
      INSERT INTO pre_forma (order_items, total_price, status , customer , jalali_date_nopay  ,discount_amount, marketer_discount,final_pay, buy_type)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8 ,$9)
      RETURNING *;
    `;

    const result = await query(sqlQuery, [
      orderItemsJson,
      total_price,
      status,
      customer,
      discount_amount,
      marketer_discount,
      final_pay,
      buy_type,
      createdAt
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
  } catch (error) {
    console.error("Error in save pre_forma (server) => ", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Something went wrong. Please retry later!",
    });
  }
}
