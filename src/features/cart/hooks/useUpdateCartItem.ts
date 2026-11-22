"use client";

import { useState } from "react";
import { useSWRConfig } from "swr";
import toast from "react-hot-toast";

import { CART_KEY, updateCartItemService } from "../services/cart.services";
import { getCartErrorMessage } from "../utils/getErrorMessage";

export function useUpdateCartItem(itemId: number) {
  const [isUpdating, setIsUpdating] = useState(false);
  const { mutate } = useSWRConfig();

  const updateCartItem = async (quantity: number) => {
    if (quantity < 1) return false;

    try {
      setIsUpdating(true);

      await updateCartItemService(itemId, { quantity });

      await mutate(CART_KEY);

      return true;
    } catch (error) {
      toast.error(getCartErrorMessage(error, "خطا در بهروزرسانی سبد خرید"));

      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  return { updateCartItem, isUpdating };
}
