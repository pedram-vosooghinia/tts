import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];

    const accessKeyId = process.env.BUCKET_ACCESS_KEY;
    const secretAccessKey = process.env.BUCKET_SECRET_KEY;

    if (!accessKeyId || !secretAccessKey) {
      return NextResponse.json({
        message: "اشتباه در تنظیمات S3",
        status: 500,
        success: false,
      });
    }

    const s3 = new S3Client({
      region: "default",
      credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      },
      endpoint: `https://${process.env.BUCKET_ENDPOINT}`,
    });

    for (const file of files) {
      if (file instanceof File) {
        // بررسی اینکه فایل معتبر است
        const imageBuffer = await file.arrayBuffer();
        const imageFileName = file.name;

        const params = {
          Bucket: process.env.BUCKET_NAME,
          Key: imageFileName,
          Body: Buffer.from(imageBuffer),
        };

        const command = new PutObjectCommand(params);
        await s3.send(command);
      } else {
        return NextResponse.json({
          message: "یک فایل معتبر بارگذاری نشده است",
          status: 400,
          success: false,
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: "محصول با موفقیت ثبت اولیه شد",
      status: 200,
    });
  } catch {
    return NextResponse.json({
      message: "اشتباهی رخ داده است، لطفا دوباره تلاش نمایید",
      status: 500,
      success: false,
    });
  }
}
