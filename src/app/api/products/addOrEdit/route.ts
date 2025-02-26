import { NextResponse, NextRequest } from "next/server";
import { query } from "@/db";
import { Product } from "@/types/product";

export async function POST(req: NextRequest) {
  try {
    const {
      id,
      available,
      name,
      brand,
      english_name,
      image,
      omde_price,
      main_category,
      tak_price,
    }: Product = await req.json();

    if (
      !id ||
      !brand ||
      !name ||
      !english_name ||
      !image ||
      !omde_price ||
      !main_category ||
      !tak_price
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "تمامی فیلدها الزامی هستند",
        },
        { status: 400 }
      );
    }

    const sqlQuery = `
      INSERT INTO products (
        id,
        available,  
        brand,
        name,
        english_name,
        image,
        omde_price,
        main_category,
        tak_price
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      ON CONFLICT (id) 
      DO UPDATE SET
        available = EXCLUDED.available,
        brand = EXCLUDED.brand,
        name = EXCLUDED.name,
        english_name = EXCLUDED.english_name,
        image = EXCLUDED.image,
        omde_price = EXCLUDED.omde_price,
        main_category = EXCLUDED.main_category,
        tak_price = EXCLUDED.tak_price
    `;

    const values: (string | number | null | boolean)[] = [
      id,
      available,
      brand,
      name,
      english_name,
      image,
      omde_price,
      main_category,
      tak_price,
    ];

    await query(sqlQuery, values);

    return NextResponse.json(
      {
        success: true,
        message: "محصول با موفقیت ثبت یا بروزرسانی شد",
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "اشتباهی رخ داده است، لطفا دوباره تلاش نمایید",
      },
      { status: 500 }
    );
  }
}
