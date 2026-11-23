"use client";

import useSWR from "swr";

import { useAuth } from "@/features/auth/hooks/useAuth";

import {
  getAddressesKey,
  getAddressesService,
} from "../services/addresses.services";
import type { AddressesResponse } from "../types/address.types";

export function useAddresses(page = 1, limit = 50) {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();

  const { data, error, isLoading, mutate } = useSWR<AddressesResponse>(
    isAuthenticated ? getAddressesKey(page, limit) : null,
    () => getAddressesService(page, limit),
  );

  return {
    addresses: data?.data ?? [],
    meta: data?.meta,
    isAuthenticated,
    isLoading: isAuthLoading || (isAuthenticated && isLoading),
    error,
    mutate,
  };
}
