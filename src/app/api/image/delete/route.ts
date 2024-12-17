import { NextResponse, NextRequest } from "next/server";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

export async function DELETE(req: NextRequest) {
  try {
    const { images } = await req.json();

    const accessKeyId = process.env.BUCKET_ACCESS_KEY;
    const secretAccessKey = process.env.BUCKET_SECRET_KEY;

    if (!accessKeyId || !secretAccessKey) {
      throw new Error("Missing AWS credentials.");
    }

    const s3 = new S3Client({
      region: "default",
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      endpoint: `https://${process.env.BUCKET_ENDPOINT}`,
    });

    for (const imageName of images) {
      const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: imageName,
      };

      const command = new DeleteObjectCommand(params);
      await s3.send(command);
    }

    return NextResponse.json({
      success: true,
      message: "تصاویر با موفقیت حذف شدند",
      status: 200,
    });
  } catch  {
    return NextResponse.json({
      message: "اشتباهی رخ داده است، لطفا دوباره تلاش نمایید",
      status: 500,
      success: false,
    });
  }
}
