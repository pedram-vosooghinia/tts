"use client";

import { useState } from "react";
import { useSWRConfig } from "swr";
import toast from "react-hot-toast";

import {
  ORDERS_KEY,
  updateOrderStatusService,
} from "../services/orders.services";
import type { OrderStatus } from "../types/order.types";
import { getOrderErrorMessage } from "../utils/getOrderErrorMessage";

export function useUpdateOrderStatus(orderId: number) {
  const [isUpdating, setIsUpdating] = useState(false);
  const { mutate } = useSWRConfig();

  const updateStatus = async (status: OrderStatus) => {
    try {
      setIsUpdating(true);

      await updateOrderStatusService(orderId, { status });

      await mutate(`/orders/${orderId}`);
      await mutate(ORDERS_KEY);

      toast.success("وضعیت سفارش با موفقیت تغییر کرد");

      return true;
    } catch (error) {
      toast.error(getOrderErrorMessage(error, "خطا در تغییر وضعیت سفارش"));

      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  return { updateStatus, isUpdating };
}
