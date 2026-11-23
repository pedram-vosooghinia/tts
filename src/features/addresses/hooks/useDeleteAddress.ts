"use client";

import { useState } from "react";
import { useSWRConfig } from "swr";
import toast from "react-hot-toast";

import { deleteAddressService } from "../services/addresses.services";
import { getAddressErrorMessage } from "../utils/getAddressErrorMessage";

export function useDeleteAddress() {
  const [isDeleting, setIsDeleting] = useState(false);
  const { mutate } = useSWRConfig();

  const deleteAddress = async (id: number) => {
    try {
      setIsDeleting(true);

      await deleteAddressService(id);

      await mutate(
        (key) => typeof key === "string" && key.startsWith("/address"),
        undefined,
        { revalidate: true },
      );

      toast.success("آدرس با موفقیت حذف شد");

      return true;
    } catch (error) {
      toast.error(getAddressErrorMessage(error, "خطا در حذف آدرس"));

      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteAddress, isDeleting };
}
