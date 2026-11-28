"use client";

import useSWR from "swr";

import {
  getProductsByCategoryService,
  getProductsService,
} from "../services/products.services";
import type { ProductsResponse } from "../types/products.types";

export function useProducts(page = 1, limit = 10, categoryId?: number) {
  const hasCategory = typeof categoryId === "number" && categoryId > 0;
  const key = hasCategory
    ? `/products/category/${categoryId}?page=${page}&limit=${limit}`
    : `/products?page=${page}&limit=${limit}`;

  const { data, error, isLoading, mutate } = useSWR<ProductsResponse>(key, () =>
    hasCategory
      ? getProductsByCategoryService(page, limit, categoryId)
      : getProductsService(page, limit),
  );

  return {
    products: data?.data ?? [],
    meta: data?.meta,
    error,
    isLoading,
    mutate,
  };
}
