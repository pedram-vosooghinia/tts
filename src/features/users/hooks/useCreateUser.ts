"use client";

import { useState } from "react";
import { useSWRConfig } from "swr";
import toast from "react-hot-toast";

import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import { createUserService } from "../services/users.services";
import type { CreateUserDto } from "../types/user.types";

export function useCreateUser() {
  const [isCreating, setIsCreating] = useState(false);
  const { mutate } = useSWRConfig();

  const createUser = async (data: CreateUserDto) => {
    try {
      setIsCreating(true);
      await createUserService(data);
      await mutate(
        (key) => typeof key === "string" && key.startsWith("/users"),
      );
      toast.success("کاربر با موفقیت ایجاد شد");
      return true;
    } catch (error) {
      toast.error(getApiErrorMessage(error, "خطا در ایجاد کاربر"));
      return false;
    } finally {
      setIsCreating(false);
    }
  };

  return { createUser, isCreating };
}
