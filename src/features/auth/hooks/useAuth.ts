"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import Cookies from "js-cookie";
import { AxiosError } from "axios";
import { User } from "@/types/user";

export function useAuth() {
  const router = useRouter();

  const hasToken =
    typeof window !== "undefined" && !!Cookies.get("access_token");

  const {
    data: user,
    error,
    isLoading,
    mutate,
  } = useSWR<User>(hasToken ? "/auth/me" : null);

  const status = (error as AxiosError)?.response?.status;

  useEffect(() => {
    if (status === 401) {
      Cookies.remove("access_token", { path: "/" });
      mutate(undefined, { revalidate: false });
      router.replace("/login");
    }
  }, [status, mutate, router]);

  return {
    user: user ?? null,
    isLoading,
    isAuthenticated: !!user,
    error,
    mutate,
  };
}
