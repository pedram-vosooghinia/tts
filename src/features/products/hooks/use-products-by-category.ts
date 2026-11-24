"use client";

import useSWR from "swr";

import { getProductsByCategoryService } from "../services/products.services";
import type { ProductsResponse } from "../types/products.types";

export function useProductsByCategory(
  page = 1,
  limit = 10,
  categoryId: number,
) {
  const key =
    Number.isFinite(categoryId) && categoryId > 0
      ? `/products/category/${categoryId}?page=${page}&limit=${limit}`
      : null;

  const { data, error, isLoading, mutate } = useSWR<ProductsResponse>(key, () =>
    getProductsByCategoryService(page, limit, categoryId),
  );

  return {
    products: data?.data ?? [],
    meta: data?.meta,
    error,
    isLoading: !!key && isLoading,
    mutate,
  };
}
