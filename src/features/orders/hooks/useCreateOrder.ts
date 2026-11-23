"use client";

import { useState } from "react";
import { useSWRConfig } from "swr";
import toast from "react-hot-toast";

import { CART_KEY } from "@/features/cart/services/cart.services";

import { createOrderService, ORDERS_KEY } from "../services/orders.services";
import type { CreateOrderDto, Order } from "../types/order.types";
import { getOrderErrorMessage } from "../utils/getOrderErrorMessage";

export function useCreateOrder() {
  const [isCreating, setIsCreating] = useState(false);
  const { mutate } = useSWRConfig();

  const createOrder = async (data: CreateOrderDto): Promise<Order | null> => {
    try {
      setIsCreating(true);

      const order = await createOrderService(data);

      await mutate(ORDERS_KEY);
      await mutate(CART_KEY);

      toast.success("سفارش شما با موفقیت ثبت شد");

      return order;
    } catch (error) {
      toast.error(getOrderErrorMessage(error, "خطا در ثبت سفارش"));

      return null;
    } finally {
      setIsCreating(false);
    }
  };

  return { createOrder, isCreating };
}
