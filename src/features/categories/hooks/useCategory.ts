"use client";

import useSWR from "swr";

import { getCategoryService } from "../services/categories.services";
import type { Category } from "../types/category.types";

export function useCategory(id: number) {
  const key = Number.isSafeInteger(id) && id > 0 ? `/categories/${id}` : null;

  const { data, error, isLoading, mutate } = useSWR<Category>(key, () =>
    getCategoryService(id),
  );

  return {
    category: data ?? null,
    error,
    isLoading: !!key && isLoading,
    mutate,
  };
}
