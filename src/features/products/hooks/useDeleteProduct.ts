"use client";

import { useState } from "react";
import { useSWRConfig } from "swr";
import toast from "react-hot-toast";

import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import { deleteProductService } from "../services/products.services";

export function useDeleteProduct() {
  const [isDeleting, setIsDeleting] = useState(false);
  const { mutate } = useSWRConfig();

  const deleteProduct = async (id: number) => {
    try {
      setIsDeleting(true);
      await deleteProductService(id);
      await mutate(
        (key) => typeof key === "string" && key.startsWith("/products"),
      );
      toast.success("محصول با موفقیت حذف شد");
      return true;
    } catch (error) {
      toast.error(getApiErrorMessage(error, "خطا در حذف محصول"));
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteProduct, isDeleting };
}
