"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { usePaymentMutations } from "../hooks/usePayments";
import type { Payment } from "../types/payment.types";

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  payment?: Payment | null;
}

export default function PaymentDialog({
  open,
  onOpenChange,
  payment,
}: PaymentDialogProps) {
  const { createPayment, updatePayment, isCreating, isUpdating } =
    usePaymentMutations();
  const [payloadText, setPayloadText] = useState("{}");
  const [jsonError, setJsonError] = useState<string | null>(null);

  const isEditing = !!payment;
  const isSubmitting = isCreating || isUpdating;

  useEffect(() => {
    if (open) {
      setJsonError(null);
      if (payment) {
        const { id: _id, created_at: _c, updated_at: _u, ...rest } = payment;
        void _id;
        void _c;
        void _u;
        setPayloadText(
          Object.keys(rest).length > 0 ? JSON.stringify(rest, null, 2) : "{}",
        );
      } else {
        setPayloadText("{}");
      }
    }
  }, [open, payment]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setJsonError(null);

    let parsed: Record<string, unknown> = {};
    try {
      const candidate = JSON.parse(payloadText.trim() || "{}");
      if (
        !candidate ||
        typeof candidate !== "object" ||
        Array.isArray(candidate)
      ) {
        setJsonError("بدنه درخواست باید یک آبجکت JSON معتبر باشد.");
        return;
      }
      parsed = candidate as Record<string, unknown>;
    } catch {
      setJsonError("فرمت JSON واردشده معتبر نیست.");
      return;
    }

    const success = payment
      ? await updatePayment(payment.id, parsed)
      : await createPayment(parsed);

    if (success) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? `ویرایش پرداخت #${payment.id}` : "ثبت پرداخت جدید"}
          </DialogTitle>
          <DialogDescription>
            اطلاعات JSON درخواست پرداخت را وارد یا تایید کنید.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="payment-payload">بدنه درخواست (JSON)</Label>
            <Textarea
              id="payment-payload"
              dir="ltr"
              rows={6}
              value={payloadText}
              onChange={(e) => setPayloadText(e.target.value)}
              className="font-mono text-xs"
            />
            {jsonError && (
              <p className="text-xs text-destructive">{jsonError}</p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
              onClick={() => onOpenChange(false)}
            >
              انصراف
            </Button>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              )}
              {isSubmitting
                ? "در حال ذخیره..."
                : isEditing
                  ? "ذخیره تغییرات"
                  : "ثبت پرداخت"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
