// export const dynamic = 'force-dynamic'

// import { NextResponse } from "next/server";
// import db from "@/db";

// export async function GET(req) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const name = searchParams.get("name");
//     if (!name) {
//       return NextResponse.json({
//         status: 400,
//         success: false,
//         message: "Name parameter is required",
//         data: [],
//       });
//     }

//     const query = `
//       SELECT * FROM customers
//       WHERE total_name ILIKE $1;
//     `;
//     const values = [`%${name}%`];
//     const result = await db.query(query, values);

//     if (result.rows.length > 0) {
//       return NextResponse.json({
//         success: true,
//         data: result.rows,
//         status: 200,
//       });
//     } else {
//       return NextResponse.json({
//         success: false,
//         message: "No customers found",
//         status: 404,
//       });
//     }
//   } catch (error) {
//     console.error("Error fetching customer:", error);
//     return NextResponse.json({
//       status: 500,
//       success: false,
//       message: "Something went wrong. Please try again!",
//     });
//   }
// }
