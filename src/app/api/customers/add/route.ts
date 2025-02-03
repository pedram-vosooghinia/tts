import { NextResponse, NextRequest } from "next/server";
import { query } from "@/db";
import { UUID24C } from "@/utils/api/uuid16c";
import { Customer } from "@/types/customer";
export async function POST(req: NextRequest) {
  const document_id = UUID24C();
  const created_at = new Date().toISOString();

  try {
    const body: Customer = await req.json();

    const { customer_name, mobile, city, seller_name } = body;
    if (!customer_name || !mobile || !city || !seller_name) {
      return NextResponse.json({
        success: false,
        message: "تمامی فیلدها الزامی هستند",
        status: 400,
      });
    }
    const sqlQuery = `
    INSERT INTO customers (document_id, customer_name, mobile, city, seller_name, created_at)
    VALUES ($1, $2, $3, $4, $5, $6)
  `;
    const values: (string | number | null)[] = [
      document_id,
      customer_name,
      mobile,
      city,
      seller_name,
      created_at,
    ];

    await query(sqlQuery, values);
    return NextResponse.json({
      success: true,
      message: "محصول با موفقیت ثبت اولیه شد",
      status: 200,
    });
  } catch {
    return NextResponse.json({
      success: false,
      message: "اشتباهی رخ داده است، لطفا دوباره تلاش نمایید",
      status: 500,
    });
  }
}
