"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

import { getMeServices, loginServices } from "@/features/auth/services";
import { LoginFormInputs } from "@/features/auth/types";
import useUserStore from "@/store/userStore";
import { User } from "@/types/user";

export function useLogin() {
  const router = useRouter();
  const { addToUser } = useUserStore();

  const login = async (values: LoginFormInputs) => {
    try {
      const res = await loginServices(values);

      const accessToken = res.data.data.access_token;

      localStorage.setItem("access_token", accessToken);

      const userRes = await getMeServices();

      const userData: User = userRes.data.data;

      addToUser(userData);
      toast.success("شما با موفقیت وارد شدید");

      router.push("/dashboard");
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;

      const message = err.response?.data?.message || "خطایی رخ داده است";

      toast.error(message);

      throw error;
    }
  };

  return { login };
}
