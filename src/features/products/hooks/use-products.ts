"use client";

import useSWR from "swr";

import { getProductsService } from "../services/products.services";
import type { ProductsResponse } from "../types/products.types";

export function useProducts(page = 1, limit = 10, categoryId?: number) {
  const key = categoryId
    ? `/products/category/${categoryId}?page=${page}&limit=${limit}`
    : `/products?page=${page}&limit=${limit}`;

  const { data, error, isLoading, mutate } = useSWR<ProductsResponse>(key, () =>
    getProductsService(page, limit),
  );

  return {
    products: data?.data ?? [],
    meta: data?.meta,
    error,
    isLoading,
    mutate,
  };
}
