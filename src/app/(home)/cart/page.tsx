"use client";

import Link from "next/link";
import { RefreshCw, ShoppingCart } from "lucide-react";

import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import CartItemRow from "@/features/cart/components/CartItemRow";
import CartSummary from "@/features/cart/components/CartSummary";
import { useCart } from "@/features/cart/hooks/useCart";

import CartLoading from "./loading";

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

  if (isLoading) return <CartLoading />;

  return (
    <Container className="flex flex-col gap-6 pb-28">
      <PageHeader
        title="سبد خرید"
        description="محصولات انتخابی خود را قبل از ثبت سفارش بررسی کنید"
      />

      {!isAuthenticated ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
            <ShoppingCart className="h-10 w-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              برای مشاهده سبد خرید خود وارد حساب کاربری شوید.
            </p>
            <Button asChild>
              <Link href="/login">ورود به حساب کاربری</Link>
            </Button>
          </CardContent>
        </Card>
      ) : error ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
            <p className="text-sm text-muted-foreground">
              خطایی در بارگذاری سبد خرید رخ داد.
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={() => mutate()}
            >
              <RefreshCw />
              تلاش مجدد
            </Button>
          </CardContent>
        </Card>
      ) : items.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
            <ShoppingCart className="h-10 w-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              سبد خرید شما خالی است.
            </p>
            <Button asChild>
              <Link href="/">مشاهده محصولات</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <CartItemRow key={item.id} item={item} />
            ))}
          </div>

          <CartSummary itemCount={itemCount} totalPrice={totalPrice} />
        </>
      )}
    </Container>
  );
}
