"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { ArrowRight, MapPin, Package, RefreshCw } from "lucide-react";

import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/features/auth/hooks/useAuth";
import OrderStatusBadge from "@/features/orders/components/OrderStatusBadge";
import OrderStatusEditor from "@/features/orders/components/OrderStatusEditor";
import { useOrder } from "@/features/orders/hooks/useOrder";

import OrderDetailsLoading from "./loading";

export default function OrderDetailsPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const isValidId = Number.isFinite(id) && id > 0;

  const { order, isAuthenticated, isLoading, error, mutate } = useOrder(id);
  const { user } = useAuth();

  if (!isValidId) notFound();
  if (isLoading) return <OrderDetailsLoading />;

  if (!isAuthenticated) {
    return (
      <Container className="pb-28">
        <Card>
          <CardContent className="py-10 text-center text-sm text-muted-foreground">
            برای مشاهده جزئیات سفارش وارد حساب کاربری شوید.
          </CardContent>
        </Card>
      </Container>
    );
  }

  if (error || !order) {
    return (
      <Container className="pb-28">
        <Card>
          <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
            <p className="text-sm text-muted-foreground">
              خطایی در بارگذاری جزئیات سفارش رخ داد.
            </p>
            <Button type="button" variant="outline" onClick={() => mutate()}>
              <RefreshCw />
              تلاش مجدد
            </Button>
          </CardContent>
        </Card>
      </Container>
    );
  }

  const isAdmin = user?.role === "admin";

  return (
    <div className="flex mt-16 flex-col gap-6 pb-28">
      <div className="flex flex-col gap-4">
        <PageHeader title={`سفارش شماره ${order.id}`} />

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">وضعیت:</span>
          <OrderStatusBadge status={order.status} />
        </div>

        {isAdmin && (
          <Card>
            <CardContent className="p-4">
              <OrderStatusEditor order={order} />
            </CardContent>
          </Card>
        )}
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Package className="h-4 w-4" />
            محصولات
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-3">
          {order.items.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              محصولی برای این سفارش یافت نشد.
            </p>
          ) : (
            order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 text-sm"
              >
                <span className="min-w-0 truncate">
                  {item.product?.title || "محصول"} ×{" "}
                  {item.quantity.toLocaleString("fa-IR")}
                </span>
                <span className="shrink-0 font-medium">
                  {(item.price * item.quantity).toLocaleString("fa-IR")} تومان
                </span>
              </div>
            ))
          )}

          <Separator />

          <div className="flex items-center justify-between font-semibold">
            <span>جمع کل</span>
            <span className="text-primary">
              {order.totalPrice.toLocaleString("fa-IR")} تومان
            </span>
          </div>
        </CardContent>
      </Card>

      {order.address && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <MapPin className="h-4 w-4" />
              آدرس تحویل
            </CardTitle>
          </CardHeader>

          <CardContent className="text-sm text-muted-foreground">
            <p>
              {[
                order.address.privince,
                order.address.city,
                order.address.address,
              ]
                .filter(Boolean)
                .join("، ")}
            </p>
            {order.address.reciver_mobile && (
              <p className="mt-1">{order.address.reciver_mobile}</p>
            )}
            {order.address.postal_code && (
              <p className="mt-1">کد پستی: {order.address.postal_code}</p>
            )}
          </CardContent>
        </Card>
      )}

      <Button asChild variant="ghost">
        <Link href="/orders">
          بازگشت به سفارشات
          <ArrowRight />
        </Link>
      </Button>
    </div>
  );
}
