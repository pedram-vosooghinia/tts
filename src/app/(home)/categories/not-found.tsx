import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-sm font-medium text-muted-foreground">404</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">
        دسته‌بندی پیدا نشد
      </h1>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        دسته‌بندی مورد نظر وجود ندارد یا حذف شده است.
      </p>
      <Button asChild variant="outline" className="mt-6">
        <Link href="/categories">بازگشت به دسته‌بندی‌ها</Link>
      </Button>
    </div>
  );
}
