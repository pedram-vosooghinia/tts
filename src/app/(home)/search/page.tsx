import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SearchPage() {
  return (
    <main
      dir="rtl"
      className="flex min-h-[60vh] flex-col items-center px-4 py-12 sm:py-16"
    >
      <div className="flex w-full max-w-xl flex-col items-center gap-8">
        <section className="flex flex-col items-center gap-4 text-center">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Search className="size-7" strokeWidth={1.7} />
          </div>

          <div className="space-y-2">
            <h1 className="text-xl font-semibold sm:text-2xl">
              جستجو در فروشگاه
            </h1>
            <p className="text-sm leading-6 text-muted-foreground">
              محصول یا دسته‌بندی موردنظر خود را جستجو کنید.
            </p>
          </div>
        </section>

        <section className="w-full  p-3 sm:p-4">
          <form action="/search" method="GET" className="flex gap-2">
            <Input
              name="q"
              placeholder="نام محصول یا دسته‌بندی را وارد کنید..."
              className="h-11 min-w-0 bg-background"
              aria-label="عبارت جستجو"
            />

            <Button
              type="submit"
              size="icon"
              className="size-11 shrink-0"
              aria-label="جستجو"
            >
              <Search className="size-4" />
            </Button>
          </form>
        </section>
      </div>
    </main>
  );
}
