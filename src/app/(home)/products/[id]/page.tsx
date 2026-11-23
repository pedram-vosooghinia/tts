"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import {
  ChevronLeft,
  Minus,
  Package,
  Plus,
  RefreshCw,
  ShoppingCart,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import AddToCartButton from "@/features/cart/components/AddToCartButton";
import ProductGallery from "@/features/products/components/ProductGallery";
import { useProduct } from "@/features/products/hooks/useProduct";

export default function ProductDetailsPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const isValidId = Number.isSafeInteger(id) && id > 0;

  const { product, error, isLoading, mutate } = useProduct(id);
  const [quantity, setQuantity] = useState(1);

  if (!isValidId) notFound();

  if (isLoading) {
    return (
      <Container className="space-y-6 py-8 pb-28">
        <div className="h-5 w-48 animate-pulse rounded-md bg-muted" />
        <div className="grid gap-6 md:grid-cols-2">
          <div className="aspect-square animate-pulse rounded-xl bg-muted" />
          <div className="space-y-4 rounded-xl border border-border p-5">
            <div className="h-6 w-3/4 animate-pulse rounded bg-muted" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
            <div className="h-10 w-full animate-pulse rounded bg-muted" />
            <div className="h-10 w-full animate-pulse rounded bg-muted" />
          </div>
        </div>
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container className="py-8 pb-28">
        <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card px-4 py-12 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <Package className="size-6" />
          </div>

          <div className="space-y-1">
            <h2 className="font-semibold">محصول پیدا نشد</h2>
            <p className="text-sm text-muted-foreground">
              دریافت اطلاعات محصول با مشکل مواجه شد.
            </p>
          </div>

          <Button type="button" variant="outline" onClick={() => mutate()}>
            <RefreshCw />
            تلاش مجدد
          </Button>
        </div>
      </Container>
    );
  }

  const category = product.categories?.[0];
  const maxQuantity = Math.max(product.stock, 1);
  const safeQuantity = Math.min(quantity, maxQuantity);
  const isOutOfStock = product.stock <= 0;

  return (
    <Container className="flex flex-col gap-6 py-6 pb-28 sm:py-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">خانه</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator>
            <ChevronLeft />
          </BreadcrumbSeparator>

          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                href={category ? `/categories/${category.id}` : "/categories"}
              >
                {category?.name ?? "دسته‌بندی‌ها"}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator>
            <ChevronLeft />
          </BreadcrumbSeparator>

          <BreadcrumbItem>
            <BreadcrumbPage className="line-clamp-1">
              {product.title}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid items-start gap-5 md:grid-cols-2 md:gap-8">
        <ProductGallery images={product.images} title={product.title} />

        <section className="flex flex-col gap-5 rounded-xl border border-border bg-card p-4 sm:p-6">
          <div className="space-y-3">
            {product.categories?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.categories.map((item) => (
                  <Badge key={item.id} variant="secondary">
                    {item.name}
                  </Badge>
                ))}
              </div>
            )}

            <h1 className="text-xl font-semibold leading-relaxed sm:text-2xl">
              {product.title}
            </h1>
          </div>

          <Separator />

          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-muted-foreground">قیمت محصول</span>

            <div className="text-end">
              <p className="text-2xl font-bold tabular-nums text-primary">
                {product.price.toLocaleString("fa-IR")}
              </p>
              <span className="text-xs text-muted-foreground">تومان</span>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="text-muted-foreground">وضعیت موجودی</span>
              <Badge variant={isOutOfStock ? "destructive" : "secondary"}>
                {isOutOfStock ? "ناموجود" : "موجود"}
              </Badge>
            </div>

            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="text-muted-foreground">تعداد موجود</span>
              <span className="font-medium tabular-nums">
                {product.stock.toLocaleString("fa-IR")} عدد
              </span>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between gap-3">
            <div className="space-y-1">
              <p className="text-sm font-medium">تعداد سفارش</p>
              <p className="text-xs text-muted-foreground">
                {isOutOfStock
                  ? "این محصول در حال حاضر موجود نیست"
                  : `حداکثر ${maxQuantity.toLocaleString("fa-IR")} عدد`}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label="کاهش تعداد"
                disabled={isOutOfStock || safeQuantity <= 1}
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
              >
                <Minus />
              </Button>

              <span className="w-10 text-center text-sm font-semibold tabular-nums">
                {safeQuantity.toLocaleString("fa-IR")}
              </span>

              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label="افزایش تعداد"
                disabled={isOutOfStock || safeQuantity >= maxQuantity}
                onClick={() => setQuantity((value) => value + 1)}
              >
                <Plus />
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-1">
            <AddToCartButton
              productId={product.id}
              quantity={safeQuantity}
              disabled={isOutOfStock}
              className="h-11 w-full"
            />

            <Button asChild variant="outline" className="h-11 w-full">
              <Link href="/cart">
                <ShoppingCart />
                مشاهده سبد خرید
              </Link>
            </Button>
          </div>
        </section>
      </div>

      <section className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="flex items-center gap-3 border-b border-border px-4 py-4 sm:px-5">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Package className="size-4" />
          </div>

          <div>
            <h2 className="font-semibold">توضیحات محصول</h2>
            <p className="text-xs text-muted-foreground">
              اطلاعات و جزئیات بیشتر درباره محصول
            </p>
          </div>
        </div>

        <div className="px-4 py-5 sm:px-5">
          <p className="whitespace-pre-line text-sm leading-8 text-muted-foreground">
            {product.description || "توضیحاتی برای این محصول ثبت نشده است."}
          </p>
        </div>
      </section>
    </Container>
  );
}
