"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getMeServices } from "@/features/auth/services";
import useUserStore from "@/store/userStore";

export function useAuth() {
  const { user, addToUser, clearUser } = useUserStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get("access_token");

      if (!token) {
        clearUser();
        setLoading(false);
        return;
      }

      try {
        const res = await getMeServices();
        addToUser(res.data.data);
      } catch {
        Cookies.remove("access_token");
        clearUser();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [addToUser, clearUser]);

  return {
    user,
    loading,
    isAuthenticated: !!user,
  };
}
