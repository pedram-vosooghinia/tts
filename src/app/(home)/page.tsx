"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Layers, Package, ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { useProducts } from "@/features/products/hooks/use-products";

import HomeHero from "@/components/home/banner/Hero";
import { HomeCategoryLoading, HomeProductsLoading } from "../loading";

export default function Home() {
  const {
    categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  const {
    products,
    isLoading: productsLoading,
    error: productsError,
  } = useProducts(1, 6);

  if (categoriesError) throw new Error(categoriesError);
  if (productsError) throw new Error(productsError);

  if (!categoriesLoading && !categories) notFound();

  return (
    <main className="flex flex-col gap-10 pb-28">
      <HomeHero />

      {/* Categories */}
      <section className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Layers className="size-5" />
            </div>

            <div>
              <h2 className="text-base font-bold text-foreground">
                دسته‌بندی‌ها
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                محصولات را بر اساس دسته‌بندی پیدا کنید
              </p>
            </div>
          </div>

          <Button
            asChild
            variant="ghost"
            size="sm"
            className="gap-1 text-muted-foreground"
          >
            <Link href="/categories">
              مشاهده همه
              <ArrowLeft className="size-4" />
            </Link>
          </Button>
        </div>

        {categoriesLoading ? (
          <HomeCategoryLoading />
        ) : categories?.length ? (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.id}`}
                className="group flex w-40 shrink-0 flex-col justify-between gap-5 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/30 hover:bg-muted/30"
              >
                <div className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                  <Package className="size-4" />
                </div>

                <div className="space-y-1">
                  <h3 className="line-clamp-1 text-sm font-semibold text-foreground">
                    {category.name}
                  </h3>

                  <p className="line-clamp-2 min-h-8 text-xs leading-5 text-muted-foreground">
                    {category.description || "مشاهده محصولات"}
                  </p>

                  <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
                    <span>مشاهده</span>
                    <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-card px-5 py-8 text-center text-sm text-muted-foreground">
            دسته‌بندی‌ای برای نمایش وجود ندارد.
          </div>
        )}
      </section>

      {/* Products */}
      <section className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <ShoppingBag className="size-5" />
            </div>

            <div>
              <h2 className="text-base font-bold text-foreground">
                جدیدترین محصولات
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                جدیدترین محصولات فروشگاه
              </p>
            </div>
          </div>

          <Button
            asChild
            variant="ghost"
            size="sm"
            className="gap-1 text-muted-foreground"
          >
            <Link href="/products">
              مشاهده همه
              <ArrowLeft className="size-4" />
            </Link>
          </Button>
        </div>

        {productsLoading ? (
          <HomeProductsLoading />
        ) : products?.length ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {products.map((product) => (
              <article
                key={product.id}
                className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/30"
              >
                <div className="flex items-start justify-between gap-3">
                  <Link
                    href={`/products/${product.id}`}
                    className="min-w-0 flex-1"
                  >
                    <h3 className="line-clamp-1 text-sm font-bold text-foreground transition-colors hover:text-primary">
                      {product.title}
                    </h3>
                  </Link>

                  <div className="shrink-0 rounded-lg bg-primary/10 px-3 py-2 text-xs font-bold text-primary">
                    {product.price.toLocaleString("fa-IR")}
                    <span className="mr-1 font-medium">تومان</span>
                  </div>
                </div>

                <p className="line-clamp-2 min-h-10 text-xs leading-5 text-muted-foreground">
                  {product.description || "برای مشاهده جزئیات محصول کلیک کنید."}
                </p>

                {/* <div className="mt-auto border-t border-border/70 pt-3">
                  <AddToCartButton productId={product.id} />
                </div> */}
              </article>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card px-5 py-10 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
              <ShoppingBag className="size-5 text-muted-foreground" />
            </div>

            <p className="text-sm font-semibold text-foreground">
              محصولی برای نمایش وجود ندارد
            </p>

            <p className="text-xs text-muted-foreground">
              محصولات جدید به‌زودی اضافه خواهند شد.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
