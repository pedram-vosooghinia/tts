// import { NextResponse } from "next/server";
// import db from "@/db";

// export async function DELETE(req) {
//   try {
//     const { id } = await req.json();
//     const query = `
//       DELETE FROM products
//       WHERE id = $1
//       RETURNING *;
//     `;
    
//     const result = await db.query(query, [id]);

//     if (result.rowCount > 0) {
//       return NextResponse.json({
//         success: true,
//         data: result.rows[0],
//         status: 200,
//         message: "محصول مورد نظر با موفقیت حذف شد",
//       });
//     } else {
//       return NextResponse.json({
//         status: 204,
//         success: false,
//         message: "محصول مورد نظر یافت نشد",
//       });
//     }
//   } catch (error) {
//     return NextResponse.json({
//       status: 500,
//       success: false,
//       message: "Something went wrong. Please try again!",
//     });
//   } 
// }
