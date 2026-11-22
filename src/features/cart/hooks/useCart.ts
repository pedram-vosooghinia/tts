"use client";

import useSWR from "swr";

import { useAuth } from "@/features/auth/hooks/useAuth";

import { CART_KEY, getMyCartService } from "../services/cart.services";
import type { Cart } from "../types/cart.types";

export function useCart() {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();

  const { data, error, isLoading, mutate } = useSWR<Cart>(
    isAuthenticated ? CART_KEY : null,
    getMyCartService,
  );

  const items = data?.items ?? [];
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice =
    data?.totalPrice ??
    items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return {
    cart: data ?? null,
    items,
    itemCount,
    totalPrice,
    isAuthenticated,
    isLoading: isAuthLoading || (isAuthenticated && isLoading),
    error,
    mutate,
  };
}
