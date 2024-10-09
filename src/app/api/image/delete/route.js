// import { NextResponse } from "next/server";
// import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

// export async function DELETE(req) {
//   try {
//     const { images } = await req.json();
//     const s3 = new S3Client({
//       region: "default",
//       credentials: {
//         accessKeyId: process.env.BUCKET_ACCESS_KEY,
//         secretAccessKey: process.env.BUCKET_SECRET_KEY,
//       },
//       endpoint:`https://${process.env.BUCKET_ENDPOINT}` ,
//     });

//     for (const key in images) {
//       const imageName = images[key];
//       const params = {
//         Bucket: process.env.BUCKET_NAME,
//         Key: imageName,
//       };

//       const command = new DeleteObjectCommand(params);
//       await s3.send(command);
//     }

//     return NextResponse.json({
//       success: true,
//       message: "تصاویر با موفقیت حذف شدند",
//       status: 200,
//     });
//   } catch (error) {
//     console.error("Error during post creation:", error);
//     return NextResponse.json({
//       message: "اشتباهی رخ داده است، لطفا دوباره تلاش نمایید",
//       status: 500,
//       success: false,
//     });
//   }
// }
