"use client";

import useSWR from "swr";

import { useAuth } from "@/features/auth/hooks/useAuth";

import { ORDERS_KEY, getMyOrdersService } from "../services/orders.services";
import type { Order } from "../types/order.types";

export function useOrders() {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();

  const { data, error, isLoading, mutate } = useSWR<Order[]>(
    isAuthenticated ? ORDERS_KEY : null,
    getMyOrdersService,
  );

  return {
    orders: data ?? [],
    isAuthenticated,
    isLoading: isAuthLoading || (isAuthenticated && isLoading),
    error,
    mutate,
  };
}
