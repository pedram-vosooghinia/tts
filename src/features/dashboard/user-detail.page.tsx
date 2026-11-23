"use client";

import Link from "next/link";
import {
  ChevronLeft,
  Package,
  Signpost,
  Ticket,
  User,
  UserRound,
} from "lucide-react";

import { useAuth } from "@/features/auth/hooks/useAuth";

const menuItems = [
  {
    label: "سفارش‌ها",
    href: "/account/orders",
    icon: Package,
  },
  {
    label: "آدرس‌ها",
    href: "/address",
    icon: Signpost,
  },

  {
    label: "تیکت‌ها",
    href: "/tickets",
    icon: Ticket,
  },
];

export default function UserDetail() {
  const { user, isLoading } = useAuth();

  if (!user) {
    return;
  }

  const fullName =
    `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim() || "کاربر";

  return (
    <main dir="rtl" className="flex w-full  flex-col gap-9">
      <section className="flex w-full flex-col items-center">
        <div className="bg-neutral-500 rounded-lg flex flex-col items-center">
          <User className="text-neutral-800" size={80} strokeWidth={1.5} />
        </div>
        <h1 className="mt-2 text-sm font-bold text-foreground">{fullName}</h1>

        <p dir="ltr" className="mt-1 text-xs text-muted-foreground">
          {user.mobile}
        </p>
      </section>
      <nav className="mt-2 flex w-full  flex-col">
        {menuItems.map(({ label, href, icon: Icon }, index) => (
          <div className="flex flex-col w-full " key={href}>
            <Link
              href={href}
              className="group p-4 flex min-h-[51px] w-full items-center justify-between  transition-colors hover:bg-muted/50"
            >
              <div className="flex items-center gap-3">
                <Icon
                  className="size-5 shrink-0 text-foreground"
                  strokeWidth={1.7}
                />
                <span className="text-[13px] font-medium text-foreground">
                  {label}
                </span>
              </div>

              <ChevronLeft
                className="size-4 shrink-0 text-muted-foreground/70"
                strokeWidth={1.8}
              />
            </Link>

            {index !== menuItems.length - 1 && (
              <hr className="border-border border-neutral-100" />
            )}
          </div>
        ))}
      </nav>
    </main>
  );
}
