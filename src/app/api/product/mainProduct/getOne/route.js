// export const dynamic = 'force-dynamic'

// import { NextResponse } from "next/server";
// import db from "@/db";

// export async function GET(req) {
//   try {
//     const { searchParams  } = new URL(req.url);
//     const barcode =searchParams.get("barcode")
//     if (!barcode) {
//       return NextResponse.json({
//         status: 400,
//         success: false,
//         message: "barcode parameter is required.",
//       });
//     }

//     const query = `SELECT * FROM products WHERE barcode = $1`;
//     const values = [barcode];

//     const result = await db.query(query, values);

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
