// import { NextResponse } from "next/server";
// import db from "@/db";
// const jalaali = require("jalaali-js");

// function getCurrentJalaliDate() {
//   const now = new Date();
//   const { jy, jm, jd } = jalaali.toJalaali(
//     now.getFullYear(),
//     now.getMonth() + 1,
//     now.getDate()
//   );
//   const formattedMonth = jm.toString().padStart(2, "0");
//   const formattedDay = jd.toString().padStart(2, "0");
//   return `${jy}-${formattedMonth}-${formattedDay}`;
// }

// export async function POST(req) {
//   try {
//     const value = await req.json();
//     const maxBarcodeResult = await db.query(
//       "SELECT MAX(barcode) AS max_barcode FROM products"
//     );
//     const maxBarcode = maxBarcodeResult.rows[0].max_barcode || 0;
//     const newBarcode = Number(maxBarcode) + 1;
//     const query = `
//       INSERT INTO products (product_name, price, inventory, number_in_pack, size, images, category, season, validation_value, person, sell_code, detail_color, title, jalali_date_chanell, barcode)
//       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
//       RETURNING *;
//     `;

//     const {
//       product_name,
//       price,
//       inventory,
//       number_in_pack,
//       size,
//       images,
//       category,
//       season,
//       validation_value,
//       person,
//       sell_code,
//       detail_color,
//       title,
//     } = value;

//     const jalali_date_chanell = getCurrentJalaliDate();

//     const result = await db.query(query, [
//       product_name,
//       price,
//       inventory,
//       number_in_pack,
//       size,
//       images,
//       category,
//       season,
//       validation_value,
//       person,
//       sell_code,
//       detail_color,
//       title,
//       jalali_date_chanell,
//       newBarcode,
//     ]);

//     if (result.rows.length > 0) {
//       return NextResponse.json({
//         success: true,
//         message: "Product saved successfully",
//         savedProduct: result.rows[0],
//       });
//     } else {
//       return NextResponse.json({
//         success: false,
//         message: "Failed to save product",
//       });
//     }
//   } catch (error) {
//     console.error("Error in saving product (server) => ", error);
//     return NextResponse.json({
//       success: false,
//       message: "Something went wrong. Please try again later!",
//     });
//   }
// }
