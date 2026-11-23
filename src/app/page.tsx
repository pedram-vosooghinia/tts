"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Layers, Package } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Container } from "@/components/ui/container";

import { useCategories } from "@/features/categories/hooks/useCategories";
import { useProducts } from "@/features/products/hooks/use-products";
import AddToCartButton from "@/features/cart/components/AddToCartButton";

import { HomeCategoryLoading, HomeProductsLoading } from "./loading";

import HomeHero from "@/components/home/banner/Hero";

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
    <div className="flex flex-col gap-10 pb-28">
      <HomeHero />

      {/* Categories */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">دسته‌بندی‌ها</h2>
          </div>

          <Button
            asChild
            variant="ghost"
            size="sm"
            className="gap-1 text-muted-foreground"
          >
            <Link href="/categories">
              همه
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {categoriesLoading ? (
          <HomeCategoryLoading />
        ) : (
          categories?.length > 0 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.id}`}
                  className="shrink-0"
                >
                  <Card className="w-36 transition-colors hover:bg-accent/50">
                    <CardHeader className="p-4">
                      <CardTitle className="line-clamp-1 text-sm font-semibold">
                        {category.name}
                      </CardTitle>

                      <CardDescription className="line-clamp-2 min-h-8 text-xs">
                        {category.description || "مشاهده محصولات"}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          )
        )}
      </section>

      {/* Products */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Package className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">جدیدترین محصولات</h2>
        </div>

        {productsLoading ? (
          <HomeProductsLoading />
        ) : (
          products?.length > 0 && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {products.map((product) => (
                <Card
                  key={product.id}
                  className="h-full transition-shadow hover:shadow-soft"
                >
                  <CardHeader className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <CardTitle className="line-clamp-1 text-base font-semibold">
                        <Link
                          href={`/products/${product.id}`}
                          className="hover:underline"
                        >
                          {product.title}
                        </Link>
                      </CardTitle>

                      <span className="shrink-0 rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                        {product.price.toLocaleString("fa-IR")} ت
                      </span>
                    </div>

                    {product.description ? (
                      <CardDescription className="mt-1 line-clamp-2 min-h-10 text-xs leading-5">
                        {product.description}
                      </CardDescription>
                    ) : (
                      <div className="mt-1 h-10" />
                    )}

                    {/* <div className="mt-3 flex min-h-4 items-center justify-between text-xs text-muted-foreground">
                      <span>
                        موجودی: {product.stock.toLocaleString("fa-IR")}
                      </span> */}
                    {/* 
                      {product.categories?.length > 0 && (
                        <span className="line-clamp-1 max-w-[50%] text-left">
                          {product.categories
                            .map((category) => category.name)
                            .join("، ")}
                        </span>
                      )}
                    </div> */}

                    <div className="mt-3">
                      <AddToCartButton productId={product.id} />
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )
        )}
      </section>
    </div>
  );
}
