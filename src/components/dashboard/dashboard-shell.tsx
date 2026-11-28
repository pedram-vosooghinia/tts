"use client";

import { use, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Tags,
  Users,
  ChartNoAxesCombined,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  ChevronLeft,
  LogOut,
  Megaphone,
  Wallet,
  Headset,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";

interface DashboardShellProps {
  children: React.ReactNode;
}

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

const navigation: {
  title: string;
  items: NavItem[];
}[] = [
  {
    title: "مدیریت فروشگاه",
    items: [
      { label: "داشبورد", href: "/dashboard", icon: LayoutDashboard },
      { label: "سفارش‌ها", href: "/dashboard/orders", icon: ShoppingBag },
      { label: "محصولات", href: "/dashboard/products", icon: Package },
      { label: "دسته‌بندی‌ها", href: "/dashboard/categories", icon: Tags },
      { label: "مشتریان", href: "/dashboard/users", icon: Users },
    ],
  },
  // {
  //   title: "مدیریت و بازاریابی",
  //   items: [
  //     { label: "کمپین‌ها", href: "/dashboard/campaigns", icon: Megaphone },
  //     {
  //       label: "گزارش‌ها",
  //       href: "/dashboard/analytics",
  //       icon: ChartNoAxesCombined,
  //     },
  //     { label: "بودجه", href: "/dashboard/budget", icon: Wallet },
  //   ],
  // },
  {
    title: "پشتیبانی",
    items: [{ label: "تیکت‌ها", href: "/dashboard/tickets", icon: Headset }],
  },
];

export function DashboardShell({ children }: DashboardShellProps) {
  const pathname = usePathname();
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/dashboard"
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div dir="rtl" className="min-h-screen">
      {mobileOpen && (
        <button
          aria-label="بستن منو"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 right-0 z-50 flex w-[270px] flex-col border-l border-[#ECE9F2] bg-white transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-[76px] items-center justify-between border-b border-[#F0EDF4] px-6">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/20 text-primary">
              <ShoppingBag size={21} />
            </div>
            <div>
              <p className="text-base font-bold">TTS Admin</p>
              <p className="text-[11px] ">پنل مدیریت فروشگاه</p>
            </div>
          </Link>

          <button
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-2 lg:hidden"
            aria-label="بستن منو"
          >
            <X size={19} />
          </button>
        </div>

        <div className="flex-1 space-y-7 overflow-y-auto px-4 py-6">
          {navigation.map((group) => (
            <div key={group.title}>
              <p className="mb-3 px-3 text-[11px] font-semibold text-[#A5A1B0]">
                {group.title}
              </p>

              <nav className="space-y-1">
                {group.items.map((item) => {
                  const active = isActive(item.href);
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 rounded-xl px-3 py-3 text-[13px] font-medium transition ${
                        active
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                      }`}
                    >
                      <Icon size={19} strokeWidth={1.8} />
                      <span>{item.label}</span>
                      {active && <ChevronLeft size={15} className="mr-auto" />}
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>

        <div className="border-t border-[#F0EDF4] p-4">
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-[#777485] hover:bg-[#F8F6FB]"
          >
            <Settings size={19} />
            تنظیمات
          </Link>
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-red-500 hover:bg-red-50">
            <LogOut size={19} />
            خروج از حساب
          </button>
        </div>
      </aside>

      <div className="min-h-screen lg:mr-[270px]">
        <header className="sticky top-0 z-30 flex h-[76px] items-center gap-4 border-b border-[#ECE9F2] bg-white/90 px-4 backdrop-blur-xl sm:px-7">
          <button
            onClick={() => setMobileOpen(true)}
            className="rounded-lg p-2 hover:bg-gray-100 lg:hidden"
            aria-label="باز کردن منو"
          >
            <Menu size={22} />
          </button>

          {/* <div className="relative hidden w-full max-w-[380px] sm:block">
            <Search
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#AAA6B5]"
            />
            <input
              placeholder="جستجو در پنل مدیریت..."
              className="h-10 w-full rounded-xl border border-[#EEEAF3] bg-[#F9F8FB] pr-10 pl-4 text-sm outline-none transition focus:border-[#7950D8] focus:bg-white"
            />
          </div> */}

          <div className="mr-auto flex items-center gap-3">
            {/* <button
              aria-label="اعلان‌ها"
              className="relative rounded-xl border border-[#EEEAF3] p-2.5 text-[#777485] hover:bg-[#F8F6FB]"
            >
              <Bell size={19} />
              <span className="absolute right-2 top-2 size-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button> */}

            <div className="flex items-center gap-3  pr-4">
              <div className="hidden text-left sm:block">
                <p className="text-xs font-semibold">
                  {user?.first_name + " " + user?.last_name}
                </p>
                <p className="mt-1 text-[10px] text-[#9995A5]">مدیر کل</p>
              </div>
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/20 text-primary">
                <Users size={19} />
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1600px] p-4 sm:p-7 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
