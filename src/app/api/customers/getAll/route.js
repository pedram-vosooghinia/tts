// export const dynamic = 'force-dynamic'

// import { NextResponse } from "next/server";
// import db from "@/db";

// export async function GET(request) {
//   try {
//     const query = `
//       SELECT * FROM customers;
//     `;

//     const result = await db.query(query);

//     if (result.rows.length > 0) {
//       return NextResponse.json({
//         success: true,
//         data: result.rows,
//         status: 200,
//       });
//     } 
//   } catch (error) {
//     console.error("Error fetching customer items:", error);
//     return NextResponse.json({
//       status: 500,
//       success: false,
//       message: "Something went wrong. Please try again!",
//     });
//   }
// }
