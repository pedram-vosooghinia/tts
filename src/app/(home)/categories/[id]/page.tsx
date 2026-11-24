"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { AxiosError } from "axios";
import { ArrowLeft, Layers, Package, RefreshCw, ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCategory } from "@/features/categories/hooks/useCategory";
import CategoryLoading from "./loading";

export default function CategoryProductsPage() {
  const params = useParams<{ id: string }>();
  const categoryId = Number(params.id);

  const isValidId = Number.isSafeInteger(categoryId) && categoryId > 0;

  const { category, error, isLoading, mutate } = useCategory(categoryId);

  if (!isValidId) notFound();

  if (isLoading) {
    return <CategoryLoading />;
  }

  const status = (error as AxiosError | undefined)?.response?.status;

  if (status === 404) notFound();

  if (error || !category) {
    return (
      <main dir="rtl" className="mx-auto w-full max-w-6xl px-4 py-8 pb-28">
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card px-4 py-16 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <Package className="size-6" />
          </div>

          <div className="space-y-1">
            <h1 className="text-base font-semibold text-foreground">
              دریافت اطلاعات دسته‌بندی ناموفق بود
            </h1>
            <p className="text-sm text-muted-foreground">
              لطفاً دوباره تلاش کنید.
            </p>
          </div>

          <Button variant="outline" onClick={() => mutate()}>
            <RefreshCw />
            تلاش مجدد
          </Button>
        </div>
      </main>
    );
  }

  const products = category.products ?? [];

  return (
    <main
      dir="rtl"
      className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 pb-28 sm:py-10"
    >
      {/* Category header */}
      <section className="flex flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Layers className="size-7" />
            </div>

            <div className="min-w-0 space-y-2">
              <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                {category.name}
              </h1>

              <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
                {category.description ||
                  "محصولات این دسته‌بندی را مشاهده کنید."}
              </p>
            </div>
          </div>

          <Link
            href="/categories"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-border px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:text-sm"
          >
            <span className="hidden sm:inline">همه دسته‌بندی‌ها</span>
            <span className="sm:hidden">بازگشت</span>
            <ArrowLeft className="size-4" />
          </Link>
        </div>

        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="size-4 text-primary" />
            <h2 className="text-sm font-semibold text-foreground">محصولات</h2>
          </div>

          <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            {products.length.toLocaleString("fa-IR")} محصول
          </span>
        </div>
      </section>

      {/* Products */}
      {products.length === 0 ? (
        <section className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border px-6 py-20 text-center">
          <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
            <Package className="size-8" />
          </div>

          <h3 className="text-base font-semibold text-foreground">
            محصولی پیدا نشد
          </h3>

          <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
            در حال حاضر محصولی در این دسته‌بندی موجود نیست. بعداً دوباره بررسی
            کنید.
          </p>

          <Link
            href="/categories"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            مشاهده دسته‌بندی‌های دیگر
            <ArrowLeft className="size-4" />
          </Link>
        </section>
      ) : (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.id}
              className="group flex flex-col justify-between gap-5 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
            >
              <div className="space-y-3">
                <Link href={`/products/${product.id}`} className="block">
                  <h3 className="line-clamp-1 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                    {product.title}
                  </h3>
                </Link>

                <p className="line-clamp-2 min-h-10 text-xs leading-6 text-muted-foreground">
                  {product.description ||
                    "برای مشاهده جزئیات بیشتر محصول را انتخاب کنید."}
                </p>
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-border pt-4">
                <div className="min-w-0">
                  <span className="block text-[11px] text-muted-foreground">
                    قیمت محصول
                  </span>

                  <p className="mt-1 truncate text-base font-bold tabular-nums text-foreground">
                    {product.price.toLocaleString("fa-IR")}
                    <span className="mr-1 text-xs font-medium text-muted-foreground">
                      تومان
                    </span>
                  </p>
                </div>

                <Link
                  href={`/products/${product.id}`}
                  className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-primary px-3 py-2.5 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  مشاهده
                  <ArrowLeft className="size-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
