
"use client";

import { useState } from "react";
import { useSWRConfig } from "swr";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

import { updateCategoryService } from "../services/categories.services";
import type { UpdateCategoryDto } from "../types/category.types";

export function useUpdateCategory(categoryId: number) {
  const [isUpdating, setIsUpdating] = useState(false);
  const { mutate } = useSWRConfig();

  const updateCategory = async (data: UpdateCategoryDto) => {
    try {
      setIsUpdating(true);

      await updateCategoryService(categoryId, data);

      await mutate("/categories");
      await mutate(`/categories/${categoryId}`);

      toast.success("دسته‌بندی با موفقیت ویرایش شد");

      return true;
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;

      toast.error(
        err.response?.data?.message || "خطا در ویرایش دسته‌بندی"
      );

      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    updateCategory,
    isUpdating,
  };
}
