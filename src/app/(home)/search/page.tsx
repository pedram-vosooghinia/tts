import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SearchPage() {
  return (
    <main className="container mx-auto flex flex-col gap-8 py-10">
      <section className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">جستجو</h1>
        <p className="text-muted-foreground">
          محصول یا دسته‌بندی موردنظر خود را جستجو کنید.
        </p>
      </section>

      <form className="flex gap-2">
        <Input name="q" placeholder="جستجوی محصولات..." className="h-11" />

        <Button type="submit" size="icon" className="size-11 shrink-0">
          <Search className="size-4" />
        </Button>
      </form>
    </main>
  );
}
