"use client";

import { useState } from "react";
import { useSWRConfig } from "swr";
import toast from "react-hot-toast";

import { CART_KEY, removeCartItemService } from "../services/cart.services";
import { getCartErrorMessage } from "../utils/getErrorMessage";

export function useRemoveCartItem(itemId: number) {
  const [isRemoving, setIsRemoving] = useState(false);
  const { mutate } = useSWRConfig();

  const removeCartItem = async () => {
    try {
      setIsRemoving(true);

      await removeCartItemService(itemId);

      await mutate(CART_KEY);

      toast.success("محصول از سبد خرید حذف شد");

      return true;
    } catch (error) {
      toast.error(getCartErrorMessage(error, "خطا در حذف محصول از سبد خرید"));

      return false;
    } finally {
      setIsRemoving(false);
    }
  };

  return { removeCartItem, isRemoving };
}
