"use client";
import BreadcrumbMain from "@/components/shared/BreadcrumbMain";
import {
  ShoppingBag,
  Wallet,
  Users,
  Package,
  ArrowLeft,
  Plus,
  CalendarDays,
  Megaphone,
  Clock,
  CheckCircle2,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <BreadcrumbMain
        items={[
          { label: "خانه", href: "/" },
          { label: "داشبورد" },
        ]}
      />

      {/* Page heading */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-semibold leading-relaxed sm:text-2xl">
            نمای کلی داشبورد
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            وضعیت فروشگاه و عملکرد کسب و کار خود را بررسی کنید.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button className="flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-xs font-semibold text-white    ">
            <Plus size={17} />
            افزودن محصول
          </button>
        </div>
      </section>
    </div>
  );
}
