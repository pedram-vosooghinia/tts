"use client";

import Link from "next/link";
import { RefreshCw, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import CartItemRow from "@/features/cart/components/CartItemRow";
import CartSummary from "@/features/cart/components/CartSummary";
import { useCart } from "@/features/cart/hooks/useCart";

type CartStateProps = {
  icon?: typeof ShoppingCart;
  message: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
};

function CartState({
  icon: Icon = ShoppingCart,
  message,
  action,
}: CartStateProps) {
  return (
    <section className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card px-5 py-12 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <Icon className="size-6" />
      </div>

      <p className="max-w-sm text-sm leading-6 text-muted-foreground">
        {message}
      </p>

      {action &&
        (action.href ? (
          <Button asChild>
            <Link href={action.href}>{action.label}</Link>
          </Button>
        ) : (
          <Button type="button" variant="outline" onClick={action.onClick}>
            <RefreshCw className="size-4" />
            {action.label}
          </Button>
        ))}
    </section>
  );
}

export default function CartPage() {
  const {
    items,
    itemCount,
    totalPrice,
    isAuthenticated,
    isLoading,
    error,
    mutate,
  } = useCart();

  if (isLoading) return null;

  return (
    <main
      dir="rtl"
      className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 pb-28"
    >
      <header className="flex items-center gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <ShoppingCart className="size-5" />
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-semibold">سبد خرید</h1>
          <p className="text-sm text-muted-foreground">
            محصولات انتخابی خود را قبل از ثبت سفارش بررسی کنید
          </p>
        </div>
      </header>

      {!isAuthenticated ? (
        <CartState
          message="برای مشاهده سبد خرید خود وارد حساب کاربری شوید."
          action={{
            label: "ورود به حساب کاربری",
            href: "/login",
          }}
        />
      ) : error ? (
        <CartState
          message="خطایی در بارگذاری سبد خرید رخ داد. لطفاً دوباره تلاش کنید."
          action={{
            label: "تلاش مجدد",
            onClick: () => mutate(),
          }}
        />
      ) : items.length === 0 ? (
        <CartState
          message="سبد خرید شما خالی است. محصولات موردنظر خود را به سبد خرید اضافه کنید."
          action={{
            label: "مشاهده محصولات",
            href: "/",
          }}
        />
      ) : (
        <div className="flex flex-col gap-5">
          <section className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold">محصولات سبد خرید</h2>
              <span className="text-xs text-muted-foreground">
                {itemCount.toLocaleString("fa-IR")} محصول
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {items.map((item) => (
                <CartItemRow key={item.id} item={item} />
              ))}
            </div>
          </section>

          <CartSummary itemCount={itemCount} totalPrice={totalPrice} />
        </div>
      )}
    </main>
  );
}
