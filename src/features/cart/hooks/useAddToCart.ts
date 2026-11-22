"use client";

import { useState } from "react";
import { useSWRConfig } from "swr";
import toast from "react-hot-toast";

import { addToCartService, CART_KEY } from "../services/cart.services";
import type { AddToCartDto } from "../types/cart.types";
import { getCartErrorMessage } from "../utils/getErrorMessage";

export function useAddToCart() {
  const [isAdding, setIsAdding] = useState(false);
  const { mutate } = useSWRConfig();

  const addToCart = async (data: AddToCartDto) => {
    try {
      setIsAdding(true);

      await addToCartService(data);

      await mutate(CART_KEY);

      toast.success("محصول به سبد خرید اضافه شد");

      return true;
    } catch (error) {
      toast.error(getCartErrorMessage(error, "خطا در افزودن محصول به سبد خرید"));

      return false;
    } finally {
      setIsAdding(false);
    }
  };

  return { addToCart, isAdding };
}
