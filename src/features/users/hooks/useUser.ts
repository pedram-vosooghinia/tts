"use client";

import useSWR from "swr";
import { getUserService } from "../services/users.services";
import type { User } from "../types/user.types";

export function useUser(id: number | null) {
  const key = id && id > 0 ? `/users/${id}` : null;

  const { data, error, isLoading, mutate } = useSWR<User>(key, () =>
    getUserService(id as number),
  );

  return {
    user: data ?? null,
    error,
    isLoading: !!key && isLoading,
    mutate,
  };
}
