"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";

type Role = "user" | "admin" | "support";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: Role[];
}

export default function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
  const router = useRouter();

  const { user, isLoading, error } = useAuth();

  useEffect(() => {
    if (isLoading || error) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    if (!allowedRoles.includes(user.role)) {
      router.replace("/forbidden");
    }
  }, [user, isLoading, error, allowedRoles, router]);

  if (isLoading) {
    return <div className="p-6 text-center">در حال بررسی اطلاعات کاربر...</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        دریافت اطلاعات کاربر با مشکل مواجه شد.
      </div>
    );
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}
