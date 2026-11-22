"use client";

import { notFound, useParams } from "next/navigation";
import useSWR from "swr";
import { Container } from "@/components/ui/container";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCategoryService } from "@/features/categories/services/categories.services";
import { useProducts } from "@/features/products/hooks/use-products";
import AddToCartButton from "@/features/cart/components/AddToCartButton";
import type { Category } from "@/features/categories/types/category.types";
import CategoryLoading from "./loading";

export default function CategoryProductsPage() {
  const params = useParams<{ id: string }>();
  const categoryId = Number(params.id);

  if (!Number.isFinite(categoryId)) notFound();

  const {
    data: category,
    error: categoryError,
    isLoading: categoryLoading,
  } = useSWR<Category>(`/categories/${categoryId}`, () =>
    getCategoryService(categoryId),
  );

  const {
    products,
    isLoading: productsLoading,
    error: productsError,
  } = useProducts(1, 20, categoryId);

  const isLoading = categoryLoading || productsLoading;
  const error = categoryError || productsError;

  if (isLoading) return <CategoryLoading />;
  if (categoryError) {
    const status = (categoryError as { response?: { status?: number } })
      ?.response?.status;
    if (status === 404) notFound();
  }
  if (error) throw new Error(error);
  if (!category || !products) notFound();

  return (
    <Container className="flex flex-col gap-6 pb-28">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold text-foreground">{category.name}</h1>
        <p className="text-sm text-muted-foreground">
          {category.description || "محصولات این دسته‌بندی"}
        </p>
      </div>

      {products.length === 0 ? (
        <p className="py-10 text-center text-sm text-muted-foreground">
          محصولی در این دسته‌بندی یافت نشد.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {products.map((product) => (
            <Card key={product.id} className="h-full">
              <CardHeader className="p-4">
                <CardTitle className="text-base font-semibold">
                  {product.title}
                </CardTitle>
                {product.description ? (
                  <CardDescription className="line-clamp-2 min-h-8 text-xs">
                    {product.description}
                  </CardDescription>
                ) : (
                  <div className="h-8" />
                )}
                <div className="mt-2 flex min-h-5 items-center justify-between text-sm">
                  <span className="font-medium text-foreground">
                    {product.price.toLocaleString("fa-IR")} تومان
                  </span>
                  <span className="text-muted-foreground">
                    موجودی: {product.stock.toLocaleString("fa-IR")}
                  </span>
                </div>

                <div className="mt-3">
                  <AddToCartButton productId={product.id} />
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
}
