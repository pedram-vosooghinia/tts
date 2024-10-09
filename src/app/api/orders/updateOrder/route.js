// import { NextResponse } from "next/server";
// import db from "@/db";

// export async function PUT(req) {
//   try {
//     const { id, formValues, final_pay, clear_profit } = await req.json();

//     if (!id || !formValues) {
//       return NextResponse.json({
//         status: 400,
//         success: false,
//         message: "id and formValues are required.",
//       });
//     }

//     const discountAmount = parseFloat(formValues.discount_amount);
//     const marketerDiscount = parseFloat(formValues.marketer_discount);

//     const query = `
//       UPDATE orders
//       SET 
//         discount_amount = $1,
//         marketer_discount = $2,
//         final_pay = $3,
//         clear_profit = $4,
//         jalali_date_nopay = $5,
//         jalali_date_pay = $6
//       WHERE id = $7
//       RETURNING *;
//     `;

//     const values = [
//       discountAmount,
//       marketerDiscount,
//       final_pay,
//       clear_profit,
//       formValues.jalali_date_nopay,
//       formValues.jalali_date_pay,
//       id,
//     ];

//     const result = await db.query(query, values);

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
