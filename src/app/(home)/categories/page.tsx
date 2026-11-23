"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Layers, Package } from "lucide-react";

import { useCategories } from "@/features/categories/hooks/useCategories";
import CategoriesLoading from "./loading";

export default function CategoriesPage() {
  const { categories, isLoading, error } = useCategories();

  if (isLoading) return <CategoriesLoading />;
  if (error) throw new Error(error);
  if (!categories) notFound();

  return (
    <main
      dir="rtl"
      className="mx-auto mt-16 flex w-full max-w-5xl flex-col gap-6 px-4 pb-28"
    >
      <header className="flex items-center gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Layers className="size-5" />
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-bold text-foreground">
            دسته‌بندی محصولات
          </h1>
          <p className="text-sm text-muted-foreground">
            دسته‌بندی موردنظر خود را برای مشاهده محصولات انتخاب کنید
          </p>
        </div>
      </header>

      {categories.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border px-4 py-16 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <Package className="size-6" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-foreground">
              دسته‌بندی‌ای یافت نشد
            </p>
            <p className="text-xs text-muted-foreground">
              در حال حاضر دسته‌بندی‌ای برای نمایش وجود ندارد.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h2 className="text-sm font-semibold text-foreground">
              همه دسته‌بندی‌ها
            </h2>
            <span className="text-xs tabular-nums text-muted-foreground">
              {categories.length.toLocaleString("fa-IR")} دسته‌بندی
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.id}`}
                className="group flex h-full items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-accent/50"
              >
                <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Package className="size-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-semibold text-foreground">
                    {category.name}
                  </h3>
                  <p className="mt-1 line-clamp-2 min-h-8 text-xs leading-5 text-muted-foreground">
                    {category.description || "مشاهده محصولات این دسته‌بندی"}
                  </p>
                </div>

                <ArrowLeft className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-x-1 group-hover:text-foreground" />
              </Link>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
