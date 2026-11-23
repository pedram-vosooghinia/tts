"use client";

import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export interface AddressFormValues {
  privince: string;
  city: string;
  address: string;
  reciver_mobile: string;
  postal_code: string;
  description: string;
}

interface AddressFormProps {
  initialValues?: Partial<AddressFormValues>;
  onSubmit: (values: AddressFormValues) => Promise<void>;
  submitLabel?: string;
  isSubmitting?: boolean;
  onCancel?: () => void;
}

export default function AddressForm({
  initialValues,
  onSubmit,
  submitLabel = "ذخیره",
  isSubmitting = false,
  onCancel,
}: AddressFormProps) {
  const [values, setValues] = useState<AddressFormValues>({
    privince: initialValues?.privince ?? "",
    city: initialValues?.city ?? "",
    address: initialValues?.address ?? "",
    reciver_mobile: initialValues?.reciver_mobile ?? "",
    postal_code: initialValues?.postal_code ?? "",
    description: initialValues?.description ?? "",
  });

  const setField = (key: keyof AddressFormValues, value: string) =>
    setValues((current) => ({ ...current, [key]: value }));

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label htmlFor="address-privince">استان</Label>
          <Input
            id="address-privince"
            required
            value={values.privince}
            onChange={(event) => setField("privince", event.target.value)}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="address-city">شهر</Label>
          <Input
            id="address-city"
            required
            value={values.city}
            onChange={(event) => setField("city", event.target.value)}
          />
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor="address-text">آدرس کامل</Label>
        <Input
          id="address-text"
          required
          value={values.address}
          onChange={(event) => setField("address", event.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label htmlFor="address-mobile">موبایل تحویل گیرنده</Label>
          <Input
            id="address-mobile"
            required
            value={values.reciver_mobile}
            onChange={(event) => setField("reciver_mobile", event.target.value)}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="address-postal">کد پستی</Label>
          <Input
            id="address-postal"
            maxLength={10}
            value={values.postal_code}
            onChange={(event) => setField("postal_code", event.target.value)}
          />
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor="address-description">توضیحات</Label>
        <Textarea
          id="address-description"
          value={values.description}
          onChange={(event) => setField("description", event.target.value)}
        />
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="animate-spin" />}
          {submitLabel}
        </Button>

        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel}>
            انصراف
          </Button>
        )}
      </div>
    </form>
  );
}
