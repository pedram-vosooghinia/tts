"use client";

import { useState } from "react";
import { useSWRConfig } from "swr";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { updateUserRoleService } from "../services/users.services";

type UserRole = "user" | "admin" | "support";

export function useUpdateUserRole() {
  const [isUpdatingRole, setIsUpdatingRole] = useState(false);
  const { mutate } = useSWRConfig();

  const updateRole = async (id: number, role: UserRole) => {
    try {
      setIsUpdatingRole(true);

      await updateUserRoleService(id, role);

      await mutate(
        (key) => typeof key === "string" && key.startsWith("/users?"),
      );

      toast.success("نقش کاربر با موفقیت تغییر کرد");

      return true;
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;

      toast.error(err.response?.data?.message || "خطا در تغییر نقش کاربر");

      return false;
    } finally {
      setIsUpdatingRole(false);
    }
  };

  return { updateRole, isUpdatingRole };
}
