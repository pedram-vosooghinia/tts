// export const dynamic = 'force-dynamic'

// import db from "@/db";
// import { NextResponse } from "next/server";

// export async function GET(request) {
//   try {
//     const url = new URL(request.url);
//     const offset = parseInt(url.searchParams.get("offset") || "0");
//     const limit = parseInt(url.searchParams.get("limit") || "20");

//     const query = `
//       SELECT * FROM products
//       ORDER BY barcode DESC
//       OFFSET $1
//       LIMIT $2;
//     `;

//     const result = await db.query(query, [offset, limit]);

//     if (result.rows.length > 0) {
//       return NextResponse.json({ success: true, data: result.rows });
//     } else {
//       return NextResponse.json({
//         status: 204,
//         success: false,
//         message: "No products found.",
//       });
//     }
//   } catch (error) {
//     console.error("Error in fetching products (server) => ", error);
//     return NextResponse.json({
//       status: 500,
//       success: false,
//       message: "Something went wrong. Please try again!",
//     });
//   }
// }
