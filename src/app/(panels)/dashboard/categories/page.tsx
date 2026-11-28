"use client";

import BreadcrumbMain from "@/components/shared/BreadcrumbMain";
import PageHeader from "@/components/shared/PageHeader";

import { useCategories } from "@/features/categories/hooks/useCategories";
import CategoriesTable from "@/features/categories/components/CategoriesTable";

export default function CategoriesPage() {
  const { categories, isLoading } = useCategories();

  return (
    <>
      <BreadcrumbMain
        items={[
          { label: "داشبورد", href: "/dashboard" },
          { label: "دسته‌بندی‌ها" },
        ]}
      />

      <PageHeader
        title="مدیریت دسته‌بندی‌ها"
        description="مشاهده و مدیریت دسته‌بندی‌های محصولات"
      />

      <CategoriesTable categories={categories} isLoading={isLoading} />
    </>
  );
}
