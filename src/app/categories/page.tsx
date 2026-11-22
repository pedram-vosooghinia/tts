"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { useCategories } from "@/features/categories/hooks/useCategories";
import CategoriesLoading from "./loading";

export default function CategoriesPage() {
  const { categories, isLoading, error } = useCategories();

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

      {categories.length === 0 ? (
        <p className="py-10 text-center text-sm text-muted-foreground">
          دسته‌بندی‌ای یافت نشد.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {categories.map((category) => (
            <Link key={category.id} href={`/categories/${category.id}`}>
              <Card className="h-full transition-colors hover:bg-accent/50">
                <CardHeader className="p-4">
                  <CardTitle className="text-base font-semibold">
                    {category.name}
                  </CardTitle>
                  {category.description ? (
                    <CardDescription className="line-clamp-2 min-h-8 text-xs">
                      {category.description}
                    </CardDescription>
                  ) : (
                    <div className="h-8" />
                  )}
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </Container>
  );
}
