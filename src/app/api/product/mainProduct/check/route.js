// import { NextResponse } from "next/server";
// import db from "@/db";

// export async function GET(request) {
//   const { searchParams } = new URL(request.url);
//   const barcodes = searchParams.get("barcode")?.split(",").map(barcode => parseInt(barcode));

//   try {
//     const query = `
//       SELECT barcode, inventory
//       FROM products
//       WHERE barcode = ANY($1);
//     `;

//     const result = await db.query(query, [barcodes]);

//     if (result.rows.length > 0) {
//       return NextResponse.json({ success: true, data: result.rows });
//     } else {
//       return NextResponse.json({
//         status: 204,
//         success: false,
//         message: "No products found for the specified barcode.",
//       });
//     }
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     return NextResponse.json({
//       status: 500,
//       success: false,
//       message: "Something went wrong. Please try again!",
//     });
//   }
// }
