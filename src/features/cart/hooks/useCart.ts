"use client";

import useSWR from "swr";
import Cookies from "js-cookie";

import { CART_KEY, getMyCartService } from "../services/cart.services";
import type { Cart } from "../types/cart.types";

export function useCart() {
  const isAuthenticated = Boolean(
    typeof window !== "undefined" && Cookies.get("access_token"),
  );

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
    isLoading,
    error,
    mutate,
  };
}
