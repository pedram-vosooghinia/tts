"use client";

import { useState, type ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useCreateAddress } from "../hooks/useCreateAddress";
import { useUpdateAddress } from "../hooks/useUpdateAddress";
import type { Address } from "../types/address.types";
import AddressForm, { type AddressFormValues } from "./AddressForm";

interface AddressDialogProps {
  address?: Address | null;
  children?: ReactNode;
}

export default function AddressDialog({
  address,
  children,
}: AddressDialogProps) {
  const [open, setOpen] = useState(false);
  const { createAddress, isCreating } = useCreateAddress();
  const { updateAddress, isUpdating } = useUpdateAddress(address?.id ?? 0);

  const isSubmitting = isCreating || isUpdating;

  const handleSubmit = async (values: AddressFormValues) => {
    if (address) {
      const updated = await updateAddress(values);
      if (updated) setOpen(false);
      return;
    }

    const created = await createAddress(values);
    if (created) setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{address ? "ویرایش آدرس" : "ثبت آدرس جدید"}</DialogTitle>
        </DialogHeader>

        <AddressForm
          initialValues={address ?? undefined}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          onCancel={() => setOpen(false)}
          submitLabel={address ? "ذخیره تغییرات" : "ثبت آدرس"}
        />
      </DialogContent>
    </Dialog>
  );
}
