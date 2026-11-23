"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { orderStatusOptions } from "../constants/order.constants";
import { useUpdateOrderStatus } from "../hooks/useUpdateOrderStatus";
import type { Order, OrderStatus } from "../types/order.types";

interface OrderStatusEditorProps {
  order: Order;
}

export default function OrderStatusEditor({ order }: OrderStatusEditorProps) {
  const { updateStatus, isUpdating } = useUpdateOrderStatus(order.id);

  return (
    <div className="space-y-2">
      <Label>تغییر وضعیت سفارش</Label>

      <Select
        value={order.status}
        onValueChange={(value) => updateStatus(value as OrderStatus)}
        disabled={isUpdating}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="انتخاب وضعیت" />
        </SelectTrigger>

        <SelectContent>
          {orderStatusOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
