"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Loader2, MapPin } from "lucide-react";

import { useAddresses } from "@/features/addresses/hooks/useAddresses";
import { useCreateAddress } from "@/features/addresses/hooks/useCreateAddress";
import AddressForm, {
  type AddressFormValues,
} from "@/features/addresses/components/AddressForm";
import type { Address } from "@/features/addresses/types/address.types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useCreateOrder } from "../hooks/useCreateOrder";

interface CreateOrderDialogProps {
  children: ReactNode;
}

function addressLabel(address: Address) {
  return (
    [address.privince, address.city, address.address]
      .filter(Boolean)
      .join("، ") || `آدرس شماره ${address.id}`
  );
}

export default function CreateOrderDialog({ children }: CreateOrderDialogProps) {
  const router = useRouter();
  const { addresses, isLoading: isLoadingAddresses } = useAddresses();
  const { createAddress, isCreating: isCreatingAddress } = useCreateAddress();
  const { createOrder, isCreating } = useCreateOrder();

  const [addressId, setAddressId] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleCreateAddress = async (values: AddressFormValues) => {
    const created = await createAddress({
      privince: values.privince,
      city: values.city,
      address: values.address,
      reciver_mobile: values.reciver_mobile,
      postal_code: values.postal_code || undefined,
      description: values.description || undefined,
    });

    if (created) {
      setAddressId(String(created.id));
      setShowForm(false);
    }
  };

  const handleCreateOrder = async () => {
    if (!addressId) return;

    const order = await createOrder({ addressId: Number(addressId) });

    router.push(order ? `/orders/${order.id}` : "/orders");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>ثبت سفارش</DialogTitle>
          <DialogDescription>
            آدرس تحویل سفارش خود را انتخاب کنید.
          </DialogDescription>
        </DialogHeader>

        {isLoadingAddresses ? (
          <p className="py-4 text-center text-sm text-muted-foreground">
            در حال بارگذاری آدرس‌ها...
          </p>
        ) : (
          <>
            {addresses.length > 0 && !showForm && (
              <div className="space-y-2">
                <Label>آدرس تحویل</Label>
                <Select value={addressId} onValueChange={setAddressId}>
                  <SelectTrigger>
                    <SelectValue placeholder="انتخاب آدرس" />
                  </SelectTrigger>
                  <SelectContent>
                    {addresses.map((address) => (
                      <SelectItem key={address.id} value={String(address.id)}>
                        {addressLabel(address)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {showForm ? (
              <AddressForm
                onSubmit={handleCreateAddress}
                isSubmitting={isCreatingAddress}
                onCancel={() => setShowForm(false)}
                submitLabel="ذخیره آدرس"
              />
            ) : (
              <Button
                type="button"
                variant="link"
                className="justify-start px-0"
                onClick={() => setShowForm(true)}
              >
                <MapPin />
                {addresses.length > 0 ? "افزودن آدرس جدید" : "ثبت آدرس جدید"}
              </Button>
            )}
          </>
        )}

        <DialogFooter>
          <Button
            type="button"
            className="w-full"
            disabled={!addressId || isCreating || showForm}
            onClick={handleCreateOrder}
          >
            {isCreating && <Loader2 className="animate-spin" />}
            ثبت سفارش
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
