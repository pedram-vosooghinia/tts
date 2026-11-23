"use client";

import { useState } from "react";
import { useSWRConfig } from "swr";
import toast from "react-hot-toast";

import { updateAddressService } from "../services/addresses.services";
import type { Address, UpdateAddressDto } from "../types/address.types";
import { getAddressErrorMessage } from "../utils/getAddressErrorMessage";

export function useUpdateAddress(id: number) {
  const [isUpdating, setIsUpdating] = useState(false);
  const { mutate } = useSWRConfig();

  const updateAddress = async (
    data: UpdateAddressDto,
  ): Promise<Address | null> => {
    try {
      setIsUpdating(true);

      const address = await updateAddressService(id, data);

      await mutate(
        (key) => typeof key === "string" && key.startsWith("/address"),
        undefined,
        { revalidate: true },
      );

      toast.success("آدرس با موفقیت ویرایش شد");

      return address;
    } catch (error) {
      toast.error(getAddressErrorMessage(error, "خطا در ویرایش آدرس"));

      return null;
    } finally {
      setIsUpdating(false);
    }
  };

  return { updateAddress, isUpdating };
}
