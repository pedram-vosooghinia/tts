"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import notFoundImage from "@/public/images/notFoundImage.svg";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <Image src={notFoundImage} alt="not-found-404" width={300} height={300} />

      <p className="text-sm font-medium text-muted-foreground">404</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">
        این صفحه پیدا نشد
      </h1>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        صفحه‌ای که به دنبال آن بودید وجود ندارد یا منتقل شده است.
      </p>
      <Button asChild variant="outline" className="mt-6">
        <Link href="/">بازگشت به صفحه اصلی</Link>
      </Button>
    </div>
  );
}
