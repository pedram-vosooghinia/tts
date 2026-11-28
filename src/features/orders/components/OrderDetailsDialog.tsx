"use client";

import { MapPin, Package, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

import { useOrder } from "../hooks/useOrder";
import OrderStatusBadge from "./OrderStatusBadge";
import OrderStatusEditor from "./OrderStatusEditor";

interface OrderDetailsDialogProps {
  orderId: number | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function OrderDetailsDialog({
  orderId,
  open,
  onOpenChange,
}: OrderDetailsDialogProps) {
  const { order, isLoading, error, mutate } = useOrder(orderId ?? 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle>
            {orderId ? `جزئیات سفارش #${orderId}` : "جزئیات سفارش"}
          </DialogTitle>
          <DialogDescription>
            مشاهده اقلام، آدرس تحویل و مدیریت وضعیت سفارش
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="py-10 text-center text-sm text-muted-foreground">
            در حال دریافت جزئیات سفارش...
          </div>
        ) : error || !order ? (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <p className="text-sm text-destructive">
              دریافت اطلاعات سفارش با خطا مواجه شد.
            </p>
            <Button variant="outline" size="sm" onClick={() => mutate()}>
              <RefreshCw className="ml-2 h-4 w-4" />
              تلاش مجدد
            </Button>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="flex items-center justify-between rounded-xl border p-3">
              <span className="text-sm text-muted-foreground">وضعیت فعلی</span>
              <OrderStatusBadge status={order.status} />
            </div>

            <div className="rounded-xl border p-4">
              <OrderStatusEditor order={order} />
            </div>

            <div className="space-y-3 rounded-xl border p-4">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Package className="h-4 w-4 text-primary" />
                <span>اقلام سفارش</span>
              </div>

              {order.items.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  آیتمی برای این سفارش ثبت نشده است.
                </p>
              ) : (
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="truncate">
                        {item.product?.title || "محصول"} ×{" "}
                        {item.quantity.toLocaleString("fa-IR")}
                      </span>
                      <span className="shrink-0 font-medium tabular-nums">
                        {(item.price * item.quantity).toLocaleString("fa-IR")}{" "}
                        تومان
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <Separator />

              <div className="flex items-center justify-between text-sm font-bold">
                <span>جمع کل</span>
                <span className="text-primary tabular-nums">
                  {order.totalPrice.toLocaleString("fa-IR")} تومان
                </span>
              </div>
            </div>

            {order.address && (
              <div className="space-y-2 rounded-xl border p-4 text-sm">
                <div className="flex items-center gap-2 font-semibold">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>آدرس تحویل</span>
                </div>
                <p className="text-muted-foreground">
                  {[
                    order.address.privince,
                    order.address.city,
                    order.address.address,
                  ]
                    .filter(Boolean)
                    .join("، ")}
                </p>
                {order.address.reciver_mobile && (
                  <p dir="ltr" className="w-fit text-xs text-muted-foreground">
                    {order.address.reciver_mobile}
                  </p>
                )}
                {order.address.postal_code && (
                  <p className="text-xs text-muted-foreground">
                    کد پستی: {order.address.postal_code}
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
