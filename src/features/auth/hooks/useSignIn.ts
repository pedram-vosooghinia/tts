"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

import { registerServices} from "@/features/auth/services";
import { RegisterFormData } from "@/features/auth/validation/registerSchema";

export function useSignIn() {
  const router = useRouter();

  const signIn = async (values: RegisterFormData) => {
    try {
      await registerServices(values);

      toast.success("ثبت‌نام با موفقیت انجام شد");

      router.push("/login");
    } catch (error) {
      const err = error as AxiosError<{ message?: string | string[] }>;

      const responseMessage = err.response?.data?.message;

      const message = Array.isArray(responseMessage)
        ? responseMessage.join(" - ")
        : responseMessage || "خطایی در ثبت‌نام رخ داده است";

      toast.error(message);

      throw error;
    }
  };

  return { signIn };
}
