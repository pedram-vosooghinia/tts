"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { notFound } from "next/navigation";
import CategoriesLoading from "./loading";

export default function CategoriesPage() {
  const { categories, isLoading, error, mutate } = useCategories();

  if (!categories) notFound();
  if (isLoading) return <CategoriesLoading />;
  if (error) throw new Error(error);

  return (
    <Container className="flex flex-col gap-6 pb-28">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold text-foreground">دسته‌بندی‌ها</h1>
        <p className="text-sm text-muted-foreground">
          مشاهده دسته‌بندی‌های محصولات
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {categories.map((category) => (
          <Card key={category.id} className="h-full">
            <CardHeader className="p-4">
              <CardTitle className="text-base font-semibold">
                {category.name}
              </CardTitle>
              {category.description && (
                <CardDescription className="line-clamp-2 text-xs">
                  {category.description}
                </CardDescription>
              )}
            </CardHeader>
          </Card>
        ))}
      </div>
    </Container>
  );
}
