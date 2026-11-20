"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import type { Category, CreateCategoryDto } from "../types/category.types";

import { useCreateCategory } from "../hooks/useCreateCategory";
import { useUpdateCategory } from "../hooks/useUpdateCategory";
import CategoryForm from "./CategoryForm";

interface CategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: Category | null;
}

export default function CategoryDialog({
  open,
  onOpenChange,
  category,
}: CategoryDialogProps) {
  const { createCategory, isCreating } = useCreateCategory();

  const { updateCategory, isUpdating } = useUpdateCategory(category?.id ?? 0);

  const isEditing = !!category;
  const isSubmitting = isCreating || isUpdating;

  const handleSubmit = async (data: CreateCategoryDto) => {
    let success = false;

    if (category) {
      success = await updateCategory(data);
    } else {
      success = await createCategory(data);
    }

    if (success) {
      onOpenChange(false);
    }

    return success;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "ویرایش دسته‌بندی" : "ایجاد دسته‌بندی جدید"}
          </DialogTitle>

          <DialogDescription>
            {isEditing
              ? "اطلاعات دسته‌بندی را ویرایش کنید."
              : "اطلاعات دسته‌بندی جدید را وارد کنید."}
          </DialogDescription>
        </DialogHeader>

        <CategoryForm
          category={category}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
