// import { NextResponse } from "next/server";
// import db from "@/db";
// export async function PUT(request) {
//   try {
//     const {
//       id,
//       product_name,
//       price,
//       inventory,
//       barcode,
//       number_in_pack,
//       size,
//       category,
//       season,
//       detail_color,
//     } = await request.json();

//     if (!id) {
//       return NextResponse.json({
//         status: 400,
//         success: false,
//         message: "Product ID is required.",
//       });
//     }

//     const query = `
//       UPDATE products
//       SET product_name = $1, price = $2, inventory = $3, barcode = $4, number_in_pack = $5, size = $6, category = $7, season = $8, detail_color = $9
//       WHERE id = $10
//       RETURNING *;
//     `;
//     const values = [
//       product_name,
//       price,
//       inventory,
//       barcode,
//       number_in_pack,
//       size,
//       category,
//       season,
//       detail_color,
//       id,
//     ];

//     const result = await db.query(query, values);

//     if (result.rows.length > 0) {
//       return NextResponse.json({ success: true, data: result.rows[0] });
//     } else {
//       return NextResponse.json({
//         status: 404,
//         success: false,
//         message: "Product not found.",
//       });
//     }
//   } catch (error) {
//     console.error("Error in updating product (server) => ", error);
//     return NextResponse.json({
//       status: 500,
//       success: false,
//       message: "Something went wrong. Please try again!",
//     });
//   }
// }
