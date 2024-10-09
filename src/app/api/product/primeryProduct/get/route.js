// export const dynamic = "force-dynamic";
// import { NextResponse } from "next/server";
// import { sortData } from "@/utils/api/sortData";

// import db from "@/db";
// export async function GET(request) {
//   try {
//     const query = `
//     SELECT id, images, product_need_text FROM primery;
//   `;
//     const result = await db.query(query);
//     if (result.rows.length > 0) {
//       const sortedData = sortData(result.rows, 'id', 'desc');

//       return NextResponse.json({
//         success: true,
//         data: sortedData,
//         status: 200,
//       });
//     } else {
//       return NextResponse.json({
//         status: 204,
//         success: false,
//         message: "هیج محصولی یافت نشد",
//       });
//     }
//   } catch (error) {
//     return NextResponse.json({
//       status: 500,
//       success: false,
//       message: "خطایی رخ داده است لطفا دوباره تلاش نمایید",
//     });
//   }
// }
