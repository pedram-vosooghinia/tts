"use client";

import { RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { usePayment } from "../hooks/usePayments";

interface PaymentDetailsDialogProps {
  paymentId: number | string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PaymentDetailsDialog({
  paymentId,
  open,
  onOpenChange,
}: PaymentDetailsDialogProps) {
  const { payment, isLoading, error, mutate } = usePayment(
    open ? paymentId : null,
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {paymentId ? `جزئیات پرداخت #${paymentId}` : "جزئیات پرداخت"}
          </DialogTitle>
          <DialogDescription>
            اطلاعات کامل تراکنش پرداخت انتخاب‌شده
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="py-8 text-center text-sm text-muted-foreground">
            در حال دریافت اطلاعات پرداخت...
          </div>
        ) : error || !payment ? (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <p className="text-sm text-destructive">
              خطا در دریافت اطلاعات پرداخت
            </p>
            <Button variant="outline" size="sm" onClick={() => mutate()}>
              <RefreshCw className="ml-2 h-4 w-4" />
              تلاش مجدد
            </Button>
          </div>
        ) : (
          <div className="space-y-2 text-sm">
            {Object.entries(payment).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between gap-4 rounded-lg border p-3"
              >
                <span dir="ltr" className="text-xs font-medium text-muted-foreground">
                  {key}
                </span>
                <span dir="ltr" className="max-w-[260px] truncate font-medium">
                  {value === null || value === undefined
                    ? "-"
                    : typeof value === "object"
                      ? JSON.stringify(value)
                      : String(value)}
                </span>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
