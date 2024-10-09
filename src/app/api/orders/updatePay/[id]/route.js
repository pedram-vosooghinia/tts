// import { NextResponse } from "next/server";
// import db from "@/db";

// export async function PUT(req) {
//   try {
//     const {id, payStatus} = await req.json();
//     if (!id || payStatus === undefined) {
//       return NextResponse.json({
//         status: 400,
//         success: false,
//         message: "id and payStatus are required.",
//       });
//     }
//     const query = `
//     UPDATE orders
//     SET status = $1
//     WHERE id = $2
//     RETURNING *;
//   `;
//   const values = [payStatus, id];
//   const result = await db.query(query, values);

//     if (result.rows.length > 0) {
//       return NextResponse.json({ success: true, data: result.rows[0] });
//     } else {
//       return NextResponse.json({
//         status: 404,
//         success: false,
//         message: "Order not found or could not be updated.",
//       });
//     }
//   } catch (error) {
//     console.error("Error in updating order (server) => ", error);
//     return NextResponse.json({
//       status: 500,
//       success: false,
//       message: "Something went wrong. Please try again!",
//     });
//   }
// }
