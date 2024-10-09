// import { NextResponse } from "next/server";
// import { hash } from "bcryptjs";
// import db from "@/db";

// export async function POST(req) {
//   try {
//     const values = await req.json();
//     const mobile = values.phoneNumber;
//     const password = values.password;
//     const address = values.address;
//     const first_name = values.firstName;
//     const last_name = values.lastName;
//     const role = "marketer";
//     const is_active = false;

//     if (!first_name || !last_name || !password || !mobile || !address) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "مقادیر نامعتبر است لطفا دوباره تلاش نمایید",
//         },
//         { status: 400 }
//       );
//     }

//     const userResult = await db.query("SELECT * FROM users WHERE mobile = $1", [
//       mobile,
//     ]);
//     const existingUser = userResult.rows[0];
//     if (existingUser) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "شما قبلا ثبت نام کرده اید",
//         },
//         { status: 400 }
//       );
//     }

//     const hashedPassword = await hash(password, 12);
//     const newUserResult = await db.query(
//       "INSERT INTO users (first_name, last_name, mobile, password, role, is_active, address) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
//       [first_name, last_name, mobile, hashedPassword, role, is_active, address]
//     );

//     const newUser = newUserResult.rows[0];
//     if (!newUser) {
//       return NextResponse.json({
//         success: false,
//         message: "ثبت نام موفق نبود دوباره تلاش نمایید",
//         status: 404,
//       });
//     }
//     return NextResponse.json(
//       {
//         success: true,
//         message:
//           "شما با موفقیت ثبت نام کرده اید، لطفا منتظر تایید مدیریت باشید",
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Error during user registration:", error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: "اشتباهی رخ داده است، لطفا دوباره تلاش نمایید",
//       },
//       { status: 500 }
//     );
//   }
// }
