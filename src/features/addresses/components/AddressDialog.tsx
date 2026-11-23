"use client";

import { useState, type ReactNode } from "react";
import { MapPin } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
  const isEditing = !!address;

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

      <DialogContent
        dir="rtl"
        className="gap-0 overflow-hidden rounded-2xl p-0 sm:max-w-lg"
      >
        {/* Header */}
        <DialogHeader className="border-b border-border p-5 text-right">
          <div className="flex items-center gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <MapPin className="size-5" />
            </div>

            <div className="min-w-0 space-y-1">
              <DialogTitle className="text-sm font-bold">
                {isEditing ? "ویرایش آدرس" : "ثبت آدرس جدید"}
              </DialogTitle>

              <DialogDescription className="text-xs leading-5">
                {isEditing
                  ? "اطلاعات آدرس تحویل خود را ویرایش کنید."
                  : "اطلاعات آدرس جدید برای تحویل سفارش را وارد کنید."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Form */}
        <div className="p-5">
          <AddressForm
            initialValues={address ?? undefined}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            onCancel={() => setOpen(false)}
            submitLabel={isEditing ? "ذخیره تغییرات" : "ثبت آدرس"}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
