"use client";

import { useRouter } from "next/navigation";
import useUserStore from "@/store/userStore";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const useLogout = () => {
  const router = useRouter();
  const clearUser = useUserStore((state) => state.clearUser);

  const logout = () => {
    Cookies.remove("access_token");
    clearUser();

    toast.success("خروج موفقیت‌آمیز بود");
    router.replace("/");
  };

  return logout;
};

export default useLogout;
