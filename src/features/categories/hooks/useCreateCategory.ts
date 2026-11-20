"use client";

import { useState } from "react";
import { useSWRConfig } from "swr";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

import { createCategoryService } from "../services/categories.services";
import type { CreateCategoryDto } from "../types/category.types";

export function useCreateCategory() {
  const [isCreating, setIsCreating] = useState(false);
  const { mutate } = useSWRConfig();

  const createCategory = async (data: CreateCategoryDto) => {
    try {
      setIsCreating(true);

      await createCategoryService(data);

      await mutate("/categories");

      toast.success("دسته‌بندی با موفقیت ایجاد شد");

      return true;
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;

      toast.error(err.response?.data?.message || "خطا در ایجاد دسته‌بندی");

      return false;
    } finally {
      setIsCreating(false);
    }
  };

  return {
    createCategory,
    isCreating,
  };
}
