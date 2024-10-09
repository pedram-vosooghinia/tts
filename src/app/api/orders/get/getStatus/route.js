// export const dynamic = 'force-dynamic'

// import { NextResponse } from "next/server";
// import db from "@/db";
// import { sortData } from "@/utils/api/sortData";
// export async function GET(req) {
//   try {
//     const { searchParams  } = new URL(req.url);
//     const status =searchParams.get("status")
//     const result = await db.query("SELECT * FROM orders WHERE status = $1", [
//       status,
//     ]);
    
//     if (result.rows.length > 0) {
//       const sortedDataDate= sortData(result.rows, 'jalali_date_pay', 'desc');
//       const sortedDataId = sortData(sortedDataDate, 'id', 'desc');
//       return NextResponse.json({
//         status: 200,
//         success: true,
//         message: "get order successful",
//         data: sortedDataId,
//       });
//     } else {
//       return NextResponse.json({
//         status: 200,
//         data: [],
//         success: false,
//         message: "Failed to get order.",
//       });
//     }
//   } catch (error) {
//     console.error("Error in get order (server) => ", error);
//     return NextResponse.json({
//       status: 500,
//       success: false,
//       message: "Something went wrong. Please retry later!",
//     });
//   }
// }
