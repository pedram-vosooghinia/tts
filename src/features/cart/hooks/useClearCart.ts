"use client";

import { useState } from "react";
import { useSWRConfig } from "swr";
import toast from "react-hot-toast";

import { CART_KEY, clearCartService } from "../services/cart.services";
import { getCartErrorMessage } from "../utils/getErrorMessage";

export function useClearCart() {
  const [isClearing, setIsClearing] = useState(false);
  const { mutate } = useSWRConfig();

  const clearCart = async () => {
    try {
      setIsClearing(true);

      await clearCartService();

      await mutate(CART_KEY);

      toast.success("سبد خرید خالی شد");

      return true;
    } catch (error) {
      toast.error(getCartErrorMessage(error, "خطا در خالی کردن سبد خرید"));

      return false;
    } finally {
      setIsClearing(false);
    }
  };

  return { clearCart, isClearing };
}
