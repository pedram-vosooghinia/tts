"use client";

import { useState } from "react";
import { useSWRConfig } from "swr";
import toast from "react-hot-toast";

import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import { updateProductService } from "../services/products.services";
import type { UpdateProductDto } from "../types/products.types";

export function useUpdateProduct(productId: number) {
  const [isUpdating, setIsUpdating] = useState(false);
  const { mutate } = useSWRConfig();

  const updateProduct = async (data: UpdateProductDto) => {
    try {
      setIsUpdating(true);
      await updateProductService(productId, data);
      await mutate(
        (key) => typeof key === "string" && key.startsWith("/products"),
      );
      toast.success("محصول با موفقیت ویرایش شد");
      return true;
    } catch (error) {
      toast.error(getApiErrorMessage(error, "خطا در ویرایش محصول"));
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  return { updateProduct, isUpdating };
}
