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
//     const {
//       order_items,
//       total_price,
//       status,
//       customer,
//       discount_amount,
//       marketer_discount,
//       final_pay,
//       buy_type
//     } = await req.json();
//     const orderItemsJson = JSON.stringify(order_items);

//     const query = `
//       INSERT INTO pre_forma (order_items, total_price, status , customer , jalali_date_nopay  ,discount_amount, marketer_discount,final_pay, buy_type)
//       VALUES ($1, $2, $3, $4, $5, $6, $7, $8 ,$9)
//       RETURNING *;
//     `;
//     const jalali_date_nopay = getCurrentJalaliDate();

//     const result = await db.query(query, [
//       orderItemsJson,
//       total_price,
//       status,
//       customer,
//       jalali_date_nopay,
//       discount_amount,
//       marketer_discount,
//       final_pay,
//       buy_type
//     ]);

//     if (result.rows.length > 0) {
//       return NextResponse.json({
//         status: 200,
//         success: true,
//         message: "Save pre_forma successful",
//       });
//     } else {
//       return NextResponse.json({
//         status: 500,
//         success: false,
//         message: "Failed to save pre_forma.",
//       });
//     }
//   } catch (error) {
//     console.error("Error in save pre_forma (server) => ", error);
//     return NextResponse.json({
//       status: 500,
//       success: false,
//       message: "Something went wrong. Please retry later!",
//     });
//   }
// }
