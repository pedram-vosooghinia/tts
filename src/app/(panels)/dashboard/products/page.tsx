"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import BreadcrumbMain from "@/components/shared/BreadcrumbMain";
import DataPagination from "@/components/shared/DataPagination";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategories } from "@/features/categories/hooks/useCategories";
import ProductDialog from "@/features/products/components/ProductDialog";
import ProductsTable from "@/features/products/components/ProductsTable";
import { useProducts } from "@/features/products/hooks/use-products";
import type { Product } from "@/features/products/types/products.types";

export default function DashboardProductsPage() {
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const limit = 10;
  const categoryId =
    selectedCategory === "all" ? undefined : Number(selectedCategory);

  const { categories } = useCategories();
  const { products, meta, isLoading } = useProducts(page, limit, categoryId);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setPage(1);
  };

  const handleCreate = () => {
    setEditingProduct(null);
    setDialogOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <BreadcrumbMain
        items={[
          { label: "داشبورد", href: "/dashboard" },
          { label: "محصولات" },
        ]}
      />

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <PageHeader
          title="مدیریت محصولات"
          description="مشاهده، ایجاد، ویرایش و دسته‌بندی محصولات فروشگاه"
        />

        <Button onClick={handleCreate}>
          <Plus className="ml-2 h-4 w-4" />
          افزودن محصول
        </Button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Select value={selectedCategory} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-[220px] bg-white">
            <SelectValue placeholder="فیلتر بر اساس دسته‌بندی" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">همه دسته‌بندی‌ها</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={String(cat.id)}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <ProductsTable
        products={products}
        isLoading={isLoading}
        onEdit={handleEdit}
      />

      {meta && (
        <DataPagination
          page={meta.page}
          totalPages={meta.totalPages}
          total={meta.total}
          hasPreviousPage={meta.hasPreviousPage}
          hasNextPage={meta.hasNextPage}
          isLoading={isLoading}
          onPageChange={setPage}
        />
      )}

      <ProductDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        product={editingProduct}
      />
    </div>
  );
}
