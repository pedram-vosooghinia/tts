
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
//     const { data } = await req.json();
//     const { orderData, orderId } = data;
//     const jalali_date_pay = getCurrentJalaliDate();

//     const maxBarcodeResult = await db.query(
//       "SELECT MAX(barcode) AS max_barcode FROM orders"
//     );
//     const maxBarcode = maxBarcodeResult.rows[0].max_barcode || 0;
//     const newBarcode = Number(maxBarcode) + 1;



//     const {
//       status,
//       total_price,
//       discount_amount,
//       marketer_discount,
//       final_pay,
//       jalali_date_nopay,
//       customer,
//       total_value,
//       buy_type,
//       order_items,
//     } = orderData;
//     const orderItemsJson = JSON.stringify(order_items);
//     await db.query('BEGIN');
//     const queryData = `
//       INSERT INTO orders (status, total_price, discount_amount ,marketer_discount ,final_pay ,jalali_date_nopay, jalali_date_pay ,customer, total_value, buy_type ,order_items ,barcode)
//       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10 , $11 , $12)
//       RETURNING *;
//     `;

//     const orderResult = await db.query(queryData, [
//       status,
//       total_price,
//       discount_amount,
//       marketer_discount,
//       final_pay,
//       jalali_date_nopay,
//       jalali_date_pay,
//       customer,
//       total_value,
//       buy_type,
//       orderItemsJson,
//       newBarcode
//     ]);
//     const deleteQuery = `
//     DELETE FROM pre_forma
//     WHERE id = $1
//     RETURNING *;
//   `;

//     const deleteResult = await db.query(deleteQuery, [orderId]);

//     if (orderResult.rows.length > 0 && deleteResult.rowCount > 0) {
//       await db.query("COMMIT");
//       return NextResponse.json({
//         status: 200,
//         success: true,
//         message: "Save order successful",
//       });
//     } else {
//       return NextResponse.json({
//         status: 500,
//         success: false,
//         message: "Failed to save order.",
//       });
//     }
//   } catch (error) {
//     console.error("Error in save order (server) => ", error);
//     return NextResponse.json({
//       status: 500,
//       success: false,
//       message: "Something went wrong. Please retry later!",
//     });
//   }
// }
