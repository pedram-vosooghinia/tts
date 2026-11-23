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
    <Card>
      <CardContent className="flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">تعداد محصولات</span>
          <span className="font-medium">{itemCount.toLocaleString("fa-IR")}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-semibold">جمع کل</span>
          <span className="text-lg font-bold text-primary">
            {totalPrice.toLocaleString("fa-IR")} تومان
          </span>
        </div>

        <CreateOrderDialog>
          <Button type="button" className="w-full">
            <ShoppingBag />
            ثبت سفارش
          </Button>
        </CreateOrderDialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button type="button" variant="outline" disabled={isClearing}>
              {isClearing ? <Loader2 className="animate-spin" /> : <Trash2 />}
              خالی کردن سبد خرید
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>خالی کردن سبد خرید</AlertDialogTitle>
              <AlertDialogDescription>
                آیا مطمئن هستید که میخواهید تمام محصولات سبد خرید خود را حذف
                کنید؟
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>انصراف</AlertDialogCancel>
              <AlertDialogAction onClick={clearCart}>
                خالی کردن
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}
