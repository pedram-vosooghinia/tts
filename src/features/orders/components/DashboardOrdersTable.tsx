"use client";

import { Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { Order } from "../types/order.types";
import OrderStatusBadge from "./OrderStatusBadge";

interface DashboardOrdersTableProps {
  orders: Order[];
  isLoading: boolean;
  onView: (orderId: number) => void;
}

export default function DashboardOrdersTable({
  orders,
  isLoading,
  onView,
}: DashboardOrdersTableProps) {
  if (isLoading) {
    return (
      <div className="py-10 text-center text-muted-foreground">
        در حال دریافت سفارش‌ها...
      </div>
    );
  }

  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-right">شماره سفارش</TableHead>
            <TableHead className="text-right">تعداد اقلام</TableHead>
            <TableHead className="text-right">مبلغ کل</TableHead>
            <TableHead className="text-right">وضعیت</TableHead>
            <TableHead className="text-right">تاریخ ثبت</TableHead>
            <TableHead className="text-center">عملیات</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                سفارشی پیدا نشد.
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order) => (
              <TableRow
                key={order.id}
                className="cursor-pointer hover:bg-muted/40"
                onClick={() => onView(order.id)}
              >
                <TableCell className="font-semibold text-primary">
                  #{order.id}
                </TableCell>
                <TableCell className="tabular-nums">
                  {order.totalItems.toLocaleString("fa-IR")} عدد
                </TableCell>
                <TableCell className="font-medium tabular-nums">
                  {order.totalPrice.toLocaleString("fa-IR")} تومان
                </TableCell>
                <TableCell>
                  <OrderStatusBadge status={order.status} />
                </TableCell>
                <TableCell>
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString("fa-IR")
                    : "-"}
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      onView(order.id);
                    }}
                    title="مشاهده و تغییر وضعیت"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
