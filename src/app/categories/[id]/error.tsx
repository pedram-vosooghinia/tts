"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-sm font-medium text-muted-foreground">خطا</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">
        مشکلی پیش آمد
      </h1>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        در بارگذاری محصولات این دسته‌بندی خطایی رخ داد. لطفاً دوباره تلاش کنید.
      </p>
      <Button variant="outline" className="mt-6" onClick={reset}>
        تلاش مجدد
      </Button>
    </div>
  );
}
