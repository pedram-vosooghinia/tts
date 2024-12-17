import { NextResponse, NextRequest } from "next/server";
import { query } from "@/db";
import { UUID24C } from "@/utils/api/uuid16c";
interface Images {
  [key: string]: string;
}

interface RequestBody {
  images: Images;
  product_need_text: string;
}

export async function POST(req: NextRequest) {
const document_id= UUID24C()
  try {
    const value: RequestBody = await req.json();
    const { images, product_need_text } = value;
    const s3Images: Images = {};
    for (const [key, filename] of Object.entries(images)) {
      const newS3ImageUrl = `${filename}`;
      s3Images[key] = newS3ImageUrl;
    }
    const jsonString = JSON.stringify(s3Images);
    const sqlQuery = `
      INSERT INTO primeries (document_id, images, product_need_text )
      VALUES ($1, $2, $3)
    `;
    const values: (string | null)[] = [document_id,jsonString, product_need_text];
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
