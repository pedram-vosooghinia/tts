// import { NextResponse } from "next/server";
// import db from "@/db";

// export async function POST(req) {
//   try {
//     const value = await req.json();
//     const {  images, product_need_text } = value;
//     const s3Images = {};
//     for (const [key, filename] of Object.entries(images)) {
//       const newS3ImageUrl = `${filename}`;
//       s3Images[key] = newS3ImageUrl;
//     }
    
    
//     const query = `
//       INSERT INTO primery ( images, product_need_text )
//       VALUES ($1, $2)
//     `;
//     const values = [ s3Images, product_need_text];

//     await db.query(query, values);

//     return NextResponse.json({
//       success: true,
//       message: "محصول با موفقیت ثبت اولیه شد",
//       status: 200,
//     });
//   } catch (error) {
//     console.error("Error in save product (server) => ", error);
//     return NextResponse.json({
//       success: false,
//       message: "اشتباهی رخ داده است، لطفا دوباره تلاش نمایید",
//       status: 500,
//     });
//   }
// }
