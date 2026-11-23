"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, ShoppingBag, Trash2 } from "lucide-react";
import CreateOrderDialog from "@/features/orders/components/CreateOrderDialog";

import { useClearCart } from "../hooks/useClearCart";

interface CartSummaryProps {
  itemCount: number;
  totalPrice: number;
}

export default function CartSummary({
  itemCount,
  totalPrice,
}: CartSummaryProps) {
  const { clearCart, isClearing } = useClearCart();

  return (
    <Card className="overflow-hidden border-border shadow-none">
      <CardContent className="flex flex-col gap-5 p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">تعداد محصولات</span>
          <span className="text-sm font-semibold tabular-nums">
            {itemCount.toLocaleString("fa-IR")} محصول
          </span>
        </div>

        <div className="flex items-center justify-between border-t border-border pt-4">
          <span className="font-medium">مبلغ قابل پرداخت</span>
          <div className="text-left">
            <p className="text-lg font-bold text-primary tabular-nums">
              {totalPrice.toLocaleString("fa-IR")}
            </p>
            <span className="text-xs text-muted-foreground">تومان</span>
          </div>
        </div>

        <CreateOrderDialog>
          <Button type="button" className="w-full gap-2">
            <ShoppingBag className="size-4" />
            ثبت سفارش
          </Button>
        </CreateOrderDialog>

        {/* <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              className="w-full gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
              disabled={isClearing || itemCount === 0}
            >
              {isClearing ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Trash2 className="size-4" />
              )}
              خالی کردن سبد خرید
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent dir="rtl">
            <AlertDialogHeader>
              <AlertDialogTitle>خالی کردن سبد خرید</AlertDialogTitle>
              <AlertDialogDescription>
                آیا مطمئن هستید که می‌خواهید تمام محصولات سبد خرید خود را حذف
                کنید؟ این عملیات قابل بازگشت نیست.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>انصراف</AlertDialogCancel>
              <AlertDialogAction
                onClick={clearCart}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                خالی کردن سبد خرید
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog> */}
      </CardContent>
    </Card>
  );
}
