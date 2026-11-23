"use client";

import useSWR from "swr";

import { useAuth } from "@/features/auth/hooks/useAuth";

import { getOrderService } from "../services/orders.services";
import type { Order } from "../types/order.types";

export function useOrder(id: number) {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const key = Number.isFinite(id) && id > 0 ? `/orders/${id}` : null;

  const { data, error, isLoading, mutate } = useSWR<Order>(
    isAuthenticated ? key : null,
    () => getOrderService(id),
  );

  return {
    order: data ?? null,
    isAuthenticated,
    isLoading: isAuthLoading || (!!key && isAuthenticated && isLoading),
    error,
    mutate,
  };
}
