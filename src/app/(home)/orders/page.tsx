"use client";

import Link from "next/link";
import { ArrowLeft, RefreshCw, ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
import OrderCard from "@/features/orders/components/OrderCard";
import { useOrders } from "@/features/orders/hooks/useOrders";

function OrdersEmptyState({
  isAuthenticated,
  isError,
  onRetry,
}: {
  isAuthenticated: boolean;
  isError?: boolean;
  onRetry?: () => void;
}) {
  const title = isError
    ? "بارگذاری سفارش‌ها ناموفق بود"
    : isAuthenticated
      ? "هنوز سفارشی ثبت نکرده‌اید"
      : "برای مشاهده سفارش‌ها وارد حساب شوید";

  const description = isError
    ? "هنگام دریافت اطلاعات سفارش‌های شما مشکلی پیش آمد."
    : isAuthenticated
      ? "بعد از ثبت سفارش، می‌توانید وضعیت و جزئیات آن را اینجا مشاهده کنید."
      : "برای مشاهده و پیگیری سفارش‌های خود ابتدا وارد حساب کاربری شوید.";

  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card px-5 py-12 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-muted">
        <ShoppingBag className="size-6 text-muted-foreground" />
      </div>

      <div className="space-y-1">
        <h2 className="text-sm font-bold text-foreground">{title}</h2>
        <p className="max-w-xs text-xs leading-6 text-muted-foreground">
          {description}
        </p>
      </div>

      {isError ? (
        <Button type="button" variant="outline" onClick={onRetry}>
          <RefreshCw className="size-4" />
          تلاش مجدد
        </Button>
      ) : (
        <Button asChild>
          <Link href={isAuthenticated ? "/" : "/login"}>
            {isAuthenticated ? "مشاهده محصولات" : "ورود به حساب کاربری"}
          </Link>
        </Button>
      )}
    </div>
  );
}

export default function OrdersPage() {
  const { orders, isAuthenticated, isLoading, error, mutate } = useOrders();

  return (
    <main
      dir="rtl"
      className="mx-auto mt-8 flex w-full max-w-3xl flex-col gap-6 pb-28"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <ShoppingBag className="size-5" />
        </div>

        <div className="min-w-0 flex-1">
          <h1 className="text-base font-bold text-foreground">سفارش‌های من</h1>
          <p className="mt-1 text-xs text-muted-foreground">
            مشاهده و پیگیری سفارش‌های ثبت‌شده
          </p>
        </div>

        <Link
          href="/profile"
          aria-label="بازگشت به حساب کاربری"
          className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
        </Link>
      </div>

      {/* Orders */}
      {!isAuthenticated ? (
        <OrdersEmptyState isAuthenticated={false} />
      ) : error ? (
        <OrdersEmptyState isAuthenticated isError onRetry={() => mutate()} />
      ) : orders.length === 0 ? (
        <OrdersEmptyState isAuthenticated />
      ) : (
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-bold text-foreground">لیست سفارش‌ها</h2>

            <span className="text-xs text-muted-foreground">
              {orders.length} سفارش
            </span>
          </div>

          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </section>
      )}
    </main>
  );
}
