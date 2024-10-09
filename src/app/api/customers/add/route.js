// import { NextResponse } from "next/server";
// import db from "@/db";

// export async function POST(req) {
//   try {
//     const value = await req.json();

//     const query = `
//       INSERT INTO customers (gender, total_name, mobile, city ,marketer_name)
//       VALUES ($1, $2, $3, $4, $5)
//       RETURNING *
//     `;
//     const values = [
//       value.gender,
//       value.name,
//       Number(value.mobile),
//       value.city,
//       value?.marketer_name,
//     ];

//     await db.query(query, values);

//     return NextResponse.json({
//       success: true,
//       message: "Save customer successful",
//       status: 200,
//     });
//   } catch (error) {
//     console.error("Error in customer  (server) => ", error);
//     return NextResponse.json({
//       success: false,
//       message: "Something went wrong. Please retry later!",
//       status: 504,

//     });
//   }
// }
