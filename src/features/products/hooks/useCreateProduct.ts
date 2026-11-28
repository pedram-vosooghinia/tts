"use client";

import { useState } from "react";
import { useSWRConfig } from "swr";
import toast from "react-hot-toast";

import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import { createProductService } from "../services/products.services";
import type { CreateProductDto } from "../types/products.types";

export function useCreateProduct() {
  const [isCreating, setIsCreating] = useState(false);
  const { mutate } = useSWRConfig();

  const createProduct = async (data: CreateProductDto) => {
    try {
      setIsCreating(true);
      await createProductService(data);
      await mutate(
        (key) => typeof key === "string" && key.startsWith("/products"),
      );
      toast.success("محصول با موفقیت ایجاد شد");
      return true;
    } catch (error) {
      toast.error(getApiErrorMessage(error, "خطا در ایجاد محصول"));
      return false;
    } finally {
      setIsCreating(false);
    }
  };

  return { createProduct, isCreating };
}
