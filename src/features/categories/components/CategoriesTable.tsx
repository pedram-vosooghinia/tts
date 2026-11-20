"use client";

import { useState } from "react";
import { Pencil, Trash2, Plus, Loader2 } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import type { Category } from "../types/category.types";
import { useDeleteCategory } from "../hooks/useDeleteCategory";
import CategoryDialog from "./CategoryDialog";

interface CategoriesTableProps {
  categories: Category[];
  isLoading: boolean;
}

export default function CategoriesTable({
  categories,
  isLoading,
}: CategoriesTableProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);

  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null,
  );

  const { deleteCategory, isDeleting } = useDeleteCategory();

  const handleCreate = () => {
    setSelectedCategory(null);
    setIsCategoryDialogOpen(true);
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setIsCategoryDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!categoryToDelete) return;

    const success = await deleteCategory(categoryToDelete.id);

    if (success) {
      setCategoryToDelete(null);
    }
  };

  if (isLoading) {
    return (
      <div className="py-10 text-center text-muted-foreground">
        در حال دریافت دسته‌بندی‌ها...
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6 ">
        <div className="flex justify-end">
          <Button onClick={handleCreate}>
            <Plus className="ml-2 h-4 w-4" />
            افزودن دسته‌بندی
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">شناسه</TableHead>
                <TableHead className="text-right">نام</TableHead>
                <TableHead className="text-right">اسلاگ</TableHead>
                <TableHead className="text-right">توضیحات</TableHead>
                <TableHead className="text-right">تاریخ ایجاد</TableHead>
                <TableHead className="text-center">عملیات</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {categories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    دسته‌بندی‌ای پیدا نشد.
                  </TableCell>
                </TableRow>
              ) : (
                categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>{category.id}</TableCell>

                    <TableCell className="font-medium">
                      {category.name}
                    </TableCell>

                    <TableCell dir="ltr" className="text-right">
                      {category.slug}
                    </TableCell>

                    <TableCell className="max-w-[250px] truncate">
                      {category.description || "-"}
                    </TableCell>

                    <TableCell>
                      {new Date(category.created_at).toLocaleDateString(
                        "fa-IR",
                      )}
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(category)}
                          title="ویرایش"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => setCategoryToDelete(category)}
                          title="حذف"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <CategoryDialog
        open={isCategoryDialogOpen}
        onOpenChange={setIsCategoryDialogOpen}
        category={selectedCategory}
      />

      <AlertDialog
        open={!!categoryToDelete}
        onOpenChange={(open) => {
          if (!open && !isDeleting) {
            setCategoryToDelete(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>حذف دسته‌بندی</AlertDialogTitle>

            <AlertDialogDescription>
              آیا از حذف دسته‌بندی «{categoryToDelete?.name}» اطمینان دارید؟ این
              عملیات قابل بازگشت نیست.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>انصراف</AlertDialogCancel>

            <AlertDialogAction
              disabled={isDeleting}
              onClick={(event) => {
                event.preventDefault();
                handleDelete();
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
              حذف دسته‌بندی
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
