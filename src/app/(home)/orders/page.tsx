"use client";

import Link from "next/link";
import { RefreshCw, ShoppingBag } from "lucide-react";

import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import OrderCard from "@/features/orders/components/OrderCard";
import { useOrders } from "@/features/orders/hooks/useOrders";

import OrdersLoading from "./loading";

export default function OrdersPage() {
  const { orders, isAuthenticated, isLoading, error, mutate } = useOrders();

  if (isLoading) return <OrdersLoading />;

  return (
    <div className="flex flex-col mt-16 gap-6 pb-28">
      <PageHeader
        title="سفارشات من"
        description="لیست سفارشات ثبت شده توسط شما"
      />

      {!isAuthenticated ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              برای مشاهده سفارشات خود وارد حساب کاربری شوید.
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
              خطایی در بارگذاری سفارشات رخ داد.
            </p>
            <Button type="button" variant="outline" onClick={() => mutate()}>
              <RefreshCw />
              تلاش مجدد
            </Button>
          </CardContent>
        </Card>
      ) : orders.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              هنوز سفارشی ثبت نکردهاید.
            </p>
            <Button asChild>
              <Link href="/">مشاهده محصولات</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
