import { NextResponse, NextRequest } from "next/server";
import { query } from "@/db";
import { UUID24C } from "@/utils/api/uuid16c";
import { Product } from "@/types/product";

export async function POST(req: NextRequest) {
  const document_id = UUID24C();
  const created_at = new Date().toISOString();

  try {
    const body: Product = await req.json();

    const { product_name, brand, sale_type, price } = body;
    if (!product_name || !brand || !sale_type || !price) {
      return NextResponse.json({
        success: false,
        message: "تمامی فیلدها الزامی هستند",
        status: 400,
      });
    }
    const sqlQuery = `
    INSERT INTO products (document_id, product_name, brand, sale_type, price, created_at)
    VALUES ($1, $2, $3, $4, $5, $6)
  `;
    const values: (string | number | null)[] = [
      document_id,
      product_name,
      brand,
      sale_type,
      price,
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

// const { images, product_need_text } = value;
// const s3Images: Images = {};
// for (const [key, filename] of Object.entries(images)) {
//   const newS3ImageUrl = `${filename}`;
//   s3Images[key] = newS3ImageUrl;
// }
// const jsonString = JSON.stringify(s3Images);

// "use client";

// import { v4 as uuidv4 } from "uuid";

// export const prepareFormData = (
//   files: File[]
// ): { formData: FormData; images: Record<string, string> } => {
//   const formData = new FormData();
//   const images: Record<string, string> = {};
//   for (let i = 0; i < files?.length; i++) {
//     const fileExtension = files[i].name.split(".").pop();
//     const uniqueName = `${uuidv4()}.${fileExtension}`;
//     images[`image${i + 1}`] = uniqueName;
//     formData.append(`files`, files[i], uniqueName);
//   }
//   return { formData, images };
// };
