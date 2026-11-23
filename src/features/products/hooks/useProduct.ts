"use client";

import useSWR from "swr";

import { getProductService } from "../services/products.services";
import type { Product } from "../types/products.types";

export function useProduct(id: number) {
  const key = Number.isFinite(id) && id > 0 ? `/products/${id}` : null;

  const { data, error, isLoading, mutate } = useSWR<Product>(key, () =>
    getProductService(id),
  );

  return {
    product: data ?? null,
    error,
    isLoading: !!key && isLoading,
    mutate,
  };
}
