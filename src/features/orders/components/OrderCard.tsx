import Link from "next/link";
import { ArrowLeft, CalendarDays, Package } from "lucide-react";

import OrderStatusBadge from "./OrderStatusBadge";
import type { Order } from "../types/order.types";

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <Link
      href={`/orders/${order.id}`}
      className="group block rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/30 hover:bg-muted/20"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Package className="size-5" strokeWidth={1.7} />
          </div>

          <div className="min-w-0">
            <span className="block text-sm font-bold text-foreground">
              سفارش شماره {order.id}
            </span>

            <span className="mt-1 block text-xs text-muted-foreground">
              {order.totalItems.toLocaleString("fa-IR")} محصول
            </span>
          </div>
        </div>

        <OrderStatusBadge status={order.status} />
      </div>

      <div className="my-4 border-t border-border/70" />

      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col gap-2 text-xs text-muted-foreground">
          {order.createdAt && (
            <div className="flex items-center gap-1.5">
              <CalendarDays className="size-3.5" />
              <span>
                {new Date(order.createdAt).toLocaleDateString("fa-IR")}
              </span>
            </div>
          )}

          <span>مبلغ پرداختی</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-bold tabular-nums text-foreground">
            {order.totalPrice.toLocaleString("fa-IR")}
            <span className="mr-1 text-xs font-medium text-muted-foreground">
              تومان
            </span>
          </span>

          <ArrowLeft className="size-4 shrink-0 text-muted-foreground/60 transition-transform group-hover:-translate-x-1 group-hover:text-foreground" />
        </div>
      </div>
    </Link>
  );
}
