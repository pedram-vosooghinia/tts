"use client";

import Link from "next/link";
import {
  ChevronLeft,
  Package,
  Signpost,
  Ticket,
  UserRound,
} from "lucide-react";

import { useAuth } from "@/features/auth/hooks/useAuth";

const menuItems = [
  {
    label: "ویرایش اطلاعات شخصی",
    description: "مدیریت نام و اطلاعات حساب کاربری",
    href: "/profile/edit",
    icon: UserRound,
  },
  {
    label: "سفارش‌های من",
    description: "مشاهده و پیگیری سفارش‌ها",
    href: "/orders",
    icon: Package,
  },
  {
    label: "آدرس‌های من",
    description: "مدیریت آدرس‌های ثبت‌شده",
    href: "/address",
    icon: Signpost,
  },
  {
    label: "تیکت‌های پشتیبانی",
    description: "پیگیری درخواست‌های پشتیبانی",
    href: "/tickets",
    icon: Ticket,
  },
];

export default function UserDetail() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex w-full justify-center py-12">
        <div className="size-7 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) return null;

  const fullName =
    `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim() || "کاربر";

  const initial =
    `${user.first_name?.charAt(0) ?? ""}${user.last_name?.charAt(0) ?? ""}` ||
    "ک";

  return (
    <main dir="rtl" className="flex w-full flex-col gap-6">
      {/* Profile */}
      <section className="flex items-center gap-4 rounded-xl border border-border bg-card p-5">
        <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xl font-bold text-primary">
          {initial}
        </div>

        <div className="min-w-0 flex-1">
          <h1 className="truncate text-base font-bold text-foreground">
            {fullName}
          </h1>

          <p dir="ltr" className="mt-1 w-fit text-sm text-muted-foreground">
            {user.mobile}
          </p>
        </div>
      </section>

      {/* Navigation */}
      <section className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="border-b border-border px-5 py-4">
          <h2 className="text-sm font-bold text-foreground">حساب کاربری من</h2>
          {/* <p className="mt-1 text-xs text-primary">
            مدیریت سفارش‌ها و اطلاعات حساب
          </p> */}
        </div>

        <nav className="flex flex-col px-4">
          {menuItems.map(({ label, description, href, icon: Icon }, index) => (
            <div key={href}>
              <Link
                href={href}
                className="group flex items-center gap-3 rounded-lg px-2 py-4 transition-colors hover:bg-neutral-50"
              >
                <div className="flex size-10 shrink-0 bg-primary/20 items-center justify-center rounded-lg  text-primary transition-colors  ">
                  <Icon className="size-5" strokeWidth={1.7} />
                </div>

                <div className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-foreground">
                    {label}
                  </span>
                  <span className="mt-1 block text-xs text-muted-foreground">
                    {description}
                  </span>
                </div>

                <ChevronLeft
                  className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-x-1 group-hover:text-foreground"
                  strokeWidth={1.8}
                />
              </Link>

              {index !== menuItems.length - 1 && (
                <div className="mx-2 border-b border-border/70" />
              )}
            </div>
          ))}
        </nav>
      </section>
    </main>
  );
}
