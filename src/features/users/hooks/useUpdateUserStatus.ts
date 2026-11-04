"use client";

import { useState } from "react";
import { useSWRConfig } from "swr";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { updateUserStatusService } from "../services/users.services";

export function useUpdateUserStatus() {
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const { mutate } = useSWRConfig();

  const updateStatus = async (id: number, is_active: boolean) => {
    try {
      setIsUpdatingStatus(true);

      await updateUserStatusService(id, is_active);

      await mutate(
        (key) => typeof key === "string" && key.startsWith("/users?"),
      );

      toast.success("وضعیت کاربر با موفقیت تغییر کرد");

      return true;
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;

      toast.error(err.response?.data?.message || "خطا در تغییر وضعیت کاربر");

      return false;
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  return { updateStatus, isUpdatingStatus };
}
