"use client";

import { useState } from "react";
import { useSWRConfig } from "swr";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

import { updateProfileService } from "../services/profile.services";
import type { UpdateProfileDto } from "../types/profile.types";

export function useUpdateProfile() {
  const [isUpdating, setIsUpdating] = useState(false);
  const { mutate } = useSWRConfig();

  const updateProfile = async (data: UpdateProfileDto): Promise<boolean> => {
    try {
      setIsUpdating(true);

      await updateProfileService(data);

      await Promise.all([
        mutate("/auth/me"),
        mutate("/users/me"),
        mutate("/users/profile"),
      ]);

      toast.success("اطلاعات حساب کاربری با موفقیت ویرایش شد");

      return true;
    } catch (error) {
      const err = error as AxiosError<{ message?: string | string[] }>;
      const responseMessage = err.response?.data?.message;

      const message = Array.isArray(responseMessage)
        ? responseMessage.join(" - ")
        : responseMessage || "خطا در ویرایش اطلاعات حساب کاربری";

      toast.error(message);

      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  return { updateProfile, isUpdating };
}
