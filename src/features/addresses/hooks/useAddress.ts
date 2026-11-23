"use client";

import useSWR from "swr";

import { useAuth } from "@/features/auth/hooks/useAuth";

import { getAddressService } from "../services/addresses.services";
import type { Address } from "../types/address.types";

export function useAddress(id: number) {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const key = Number.isFinite(id) && id > 0 ? `/address/${id}` : null;

  const { data, error, isLoading, mutate } = useSWR<Address | null>(
    isAuthenticated ? key : null,
    () => getAddressService(id),
  );

  return {
    address: data ?? null,
    isAuthenticated,
    isLoading: isAuthLoading || (!!key && isAuthenticated && isLoading),
    error,
    mutate,
  };
}
