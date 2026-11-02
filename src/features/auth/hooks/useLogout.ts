"use client";

import { useRouter } from "next/navigation";
import { useSWRConfig } from "swr";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const useLogout = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const logout = () => {
    Cookies.remove("access_token", { path: "/" });

    mutate("/auth/me", undefined, { revalidate: false });

    toast.success("خروج موفقیت‌آمیز بود");
    router.replace("/");
  };

  return logout;
};

export default useLogout;
