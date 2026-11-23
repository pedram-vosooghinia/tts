import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";

import OrderStatusBadge from "./OrderStatusBadge";
import type { Order } from "../types/order.types";

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <Link href={`/orders/${order.id}`}>
      <Card className="transition-shadow hover:shadow-soft">
        <CardContent className="flex flex-col gap-3 p-4">
          <div className="flex items-center justify-between gap-3">
            <span className="font-semibold">سفارش شماره {order.id}</span>
            <OrderStatusBadge status={order.status} />
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{order.totalItems.toLocaleString("fa-IR")} محصول</span>
            {order.createdAt && (
              <span>
                {new Date(order.createdAt).toLocaleDateString("fa-IR")}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">جمع کل</span>
            <span className="font-semibold">
              {order.totalPrice.toLocaleString("fa-IR")} تومان
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
