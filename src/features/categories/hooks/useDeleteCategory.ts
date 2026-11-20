"use client";

import { useState } from "react";
import { useSWRConfig } from "swr";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

import { deleteCategoryService } from "../services/categories.services";

export function useDeleteCategory() {
  const [isDeleting, setIsDeleting] = useState(false);
  const { mutate } = useSWRConfig();

  const deleteCategory = async (id: number) => {
    try {
      setIsDeleting(true);

      await deleteCategoryService(id);

      await mutate("/categories");

      toast.success("دسته‌بندی با موفقیت حذف شد");

      return true;
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;

      toast.error(err.response?.data?.message || "خطا در حذف دسته‌بندی");

      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    deleteCategory,
    isDeleting,
  };
}
