// import { NextResponse } from "next/server";
// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// export async function POST(req, res) {
//   try {
//     const formData = await req.formData();
//     const files = formData.getAll("files");
//     const s3 = new S3Client({
//       region: "default",
//       credentials: {
//         accessKeyId: process.env.BUCKET_ACCESS_KEY,
//         secretAccessKey: process.env.BUCKET_SECRET_KEY,
//         },
//         endpoint:`https://${process.env.BUCKET_ENDPOINT}` ,
//         });
        
//     for (const file of files) {
//       const imageBuffer = await file.arrayBuffer();
//       const imageFileName = file.name;
//       const params = {
//         Bucket: process.env.BUCKET_NAME,
//         Key: imageFileName,
//         Body: Buffer.from(imageBuffer),
//       };

//       const command = new PutObjectCommand(params);
//       await s3.send(command);
//     }
//     return NextResponse.json({
//       success: true,
//       message: "محصول با موفقیت ثبت اولیه شد",
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
