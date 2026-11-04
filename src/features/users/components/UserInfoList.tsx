import { Phone, ShieldCheck, CalendarDays, Clock, Hash } from "lucide-react";

import type { User } from "../types/user.types";

const roleLabels: Record<User["role"], string> = {
  user: "کاربر عادی",
  admin: "مدیر",
  support: "پشتیبان",
};

interface UserInfoListProps {
  user: User;
}

export default function UserInfoList({ user }: UserInfoListProps) {
  const infoItems = [
    {
      label: "شناسه کاربر",
      value: user.id,
      icon: Hash,
      direction: "ltr" as const,
    },
    {
      label: "شماره موبایل",
      value: user.mobile,
      icon: Phone,
      direction: "ltr" as const,
    },
    {
      label: "نقش کاربری",
      value: roleLabels[user.role],
      icon: ShieldCheck,
      direction: "rtl" as const,
    },
    {
      label: "تاریخ ثبت‌نام",
      value: new Date(user.created_at).toLocaleDateString("fa-IR"),
      icon: CalendarDays,
      direction: "rtl" as const,
    },
    {
      label: "آخرین بروزرسانی",
      value: new Date(user.update_at).toLocaleDateString("fa-IR"),
      icon: Clock,
      direction: "rtl" as const,
    },
  ];

  return (
    <div className="space-y-3 px-6 py-5">
      {infoItems.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className="flex items-center justify-between gap-4 rounded-lg border p-3"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted text-muted-foreground">
                <Icon className="h-4 w-4" />
              </div>

              <span className="text-sm text-muted-foreground">
                {item.label}
              </span>
            </div>

            <span dir={item.direction} className="text-sm font-medium">
              {item.value}
            </span>
          </div>
        );
      })}
    </div>
  );
}
