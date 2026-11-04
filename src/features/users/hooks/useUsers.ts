"use client";

import useSWR from "swr";
import { getUsersServices } from "../services/users.services";
import { GetUsersParams, GetUsersResponse } from "../types/user.types";

export function useUsers(params: GetUsersParams) {
  const queryString = new URLSearchParams(
    Object.entries(params)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => [key, String(value)]),
  ).toString();

  const { data, error, isLoading, mutate } = useSWR<GetUsersResponse>(
    `/users?${queryString}`,
    () => getUsersServices(params),
  );

  return {
    users: data?.data ?? [],
    meta: data?.meta,
    error,
    isLoading,
    mutate,
  };
}
