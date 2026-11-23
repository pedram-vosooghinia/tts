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

import AddToCartButton from "@/features/cart/components/AddToCartButton";
import ProductGallery from "@/features/products/components/ProductGallery";
import { useProduct } from "@/features/products/hooks/useProduct";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";

import ProductDetailsLoading from "./loading";

export default function ProductDetailsPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const isValidId = Number.isFinite(id) && id > 0;

  const { product, error, isLoading, mutate } = useProduct(id);
  const [quantity, setQuantity] = useState(1);

  if (!isValidId) notFound();
  if (isLoading) return <ProductDetailsLoading />;

  if (error || !product) {
    return (
      <Container className="pb-28">
        <Card>
          <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
            <p className="text-sm text-muted-foreground">
              خطایی در بارگذاری محصول رخ داد.
            </p>
            <Button type="button" variant="outline" onClick={() => mutate()}>
              <RefreshCw />
              تلاش مجدد
            </Button>
          </CardContent>
        </Card>
      </Container>
    );
  }

  const category = product.categories?.[0];
  const maxQuantity = Math.max(product.stock, 1);
  const safeQuantity = Math.min(quantity, maxQuantity);
  const isOutOfStock = product.stock <= 0;

  return (
    <div className="flex flex-col gap-6 mt-16 pb-28">
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
            {category ? (
              <BreadcrumbLink asChild>
                <Link href={`/categories/${category.id}`}>{category.name}</Link>
              </BreadcrumbLink>
            ) : (
              <BreadcrumbLink asChild>
                <Link href="/categories">دسته بندی ها</Link>
              </BreadcrumbLink>
            )}
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

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <ProductGallery images={product.images} title={product.title} />

        <Card className="h-fit">
          <CardHeader className="gap-3">
            <CardTitle className="text-xl leading-snug">
              {product.title}
            </CardTitle>

            <div className="flex flex-wrap gap-2">
              {product.categories?.map((item) => (
                <Badge key={item.id} variant="secondary">
                  {item.name}
                </Badge>
              ))}
            </div>
          </CardHeader>

          <CardContent className="flex flex-col gap-5">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm text-muted-foreground">قیمت</span>
              <span className="text-2xl font-bold text-primary">
                {product.price.toLocaleString("fa-IR")} تومان
              </span>
            </div>

            <Separator />

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">وضعیت</span>
              <Badge variant={isOutOfStock ? "destructive" : "secondary"}>
                {isOutOfStock ? "ناموجود" : "موجود"}
              </Badge>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">موجودی</span>
              <span>{product.stock.toLocaleString("fa-IR")} عدد</span>
            </div>

            <Separator />

            <div className="flex items-center justify-between gap-3">
              <span className="text-sm text-muted-foreground">تعداد</span>

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

                <span className="w-10 text-center text-sm font-medium">
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

            <AddToCartButton
              productId={product.id}
              quantity={safeQuantity}
              disabled={isOutOfStock}
              className="h-11"
            />

            <Button asChild variant="outline">
              <Link href="/cart">
                <ShoppingCart />
                مشاهده سبد خرید
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Package className="h-4 w-4" />
            توضیحات محصول
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm leading-7 text-muted-foreground">
            {product.description || "توضیحاتی برای این محصول ثبت نشده است."}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
