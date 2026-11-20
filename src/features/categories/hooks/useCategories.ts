"use client";

import useSWR from "swr";
import { getCategoriesService } from "../services/categories.services";
import type { Category } from "../types/category.types";

export function useCategories() {
  const { data, error, isLoading, mutate } = useSWR<Category[]>(
    "/categories",
    getCategoriesService,
  );

  return {
    categories: data ?? [],
    error,
    isLoading,
    mutate,
  };
}
