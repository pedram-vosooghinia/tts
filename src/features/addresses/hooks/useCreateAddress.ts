"use client";

import { useState } from "react";
import { useSWRConfig } from "swr";
import toast from "react-hot-toast";

import { createAddressService } from "../services/addresses.services";
import type { Address, CreateAddressDto } from "../types/address.types";
import { getAddressErrorMessage } from "../utils/getAddressErrorMessage";

export function useCreateAddress() {
  const [isCreating, setIsCreating] = useState(false);
  const { mutate } = useSWRConfig();

  const createAddress = async (
    data: CreateAddressDto,
  ): Promise<Address | null> => {
    try {
      setIsCreating(true);

      const address = await createAddressService(data);

      await mutate(
        (key) => typeof key === "string" && key.startsWith("/address"),
        undefined,
        { revalidate: true },
      );

      toast.success("آدرس با موفقیت ثبت شد");

      return address;
    } catch (error) {
      toast.error(getAddressErrorMessage(error, "خطا در ثبت آدرس"));

      return null;
    } finally {
      setIsCreating(false);
    }
  };

  return { createAddress, isCreating };
}
