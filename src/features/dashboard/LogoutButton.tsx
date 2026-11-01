"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import useLogout from "@/features/auth/hooks/useLogout";

const LogoutButton = () => {
  const logout = useLogout();

  return (
    <Button variant="destructive" className="w-full gap-2" onClick={logout}>
      <LogOut size={18} />
      <span>خروج از حساب کاربری</span>
    </Button>
  );
};

export default LogoutButton;
