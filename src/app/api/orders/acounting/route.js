// import { NextResponse } from "next/server";
// import db from "@/db";
// export async function PUT(request) {
//   try {
//     const { id, status, order_items, no_clear_profit, clear_profit } =
//       await request.json();
//     const query = `
//     UPDATE orders
//     SET 
//       status = $1,
//       order_items = $2,
//       no_clear_profit = $3,
//       clear_profit = $4
//     WHERE id = $5
//     RETURNING *;
//   `;
//     const values = [
//       status,
//       JSON.stringify(order_items),
//       no_clear_profit,
//       clear_profit,
//       id,
//     ];

//     const result = await db.query(query, values);

//     if (result.rows.length > 0) {
//       return NextResponse.json({ success: true, data: result.rows[0] });
//     } else {
//       return NextResponse.json({
//         status: 404,
//         success: false,
//         message: "Order  not found.",
//       });
//     }
//   } catch (error) {
//     console.error("Error in updating Order  (server) => ", error);
//     return NextResponse.json({
//       status: 500,
//       success: false,
//       message: "Something went wrong. Please try again!",
//     });
//   }
// }
