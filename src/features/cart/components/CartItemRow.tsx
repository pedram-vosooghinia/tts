"use client";

import { Loader2, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { useRemoveCartItem } from "../hooks/useRemoveCartItem";
import { useUpdateCartItem } from "../hooks/useUpdateCartItem";
import type { CartItem } from "../types/cart.types";

interface CartItemRowProps {
  item: CartItem;
}

export default function CartItemRow({ item }: CartItemRowProps) {
  const { updateCartItem, isUpdating } = useUpdateCartItem(item.id);
  const { removeCartItem, isRemoving } = useRemoveCartItem(item.id);

  const isBusy = isUpdating || isRemoving;
  const price = item.product.price || 0;
  const totalPrice = price * item.quantity;

  return (
    <Card className="gap-0 overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <ShoppingBag className="size-5" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="line-clamp-2 text-sm font-semibold leading-6">
              {item.product.title}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              {price.toLocaleString("fa-IR")} تومان
              <span className="mx-1.5">·</span>
              هر عدد
            </p>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-8 shrink-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
            aria-label="حذف از سبد خرید"
            disabled={isBusy}
            onClick={removeCartItem}
          >
            {isRemoving ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Trash2 className="size-4" />
            )}
          </Button>
        </div>

        <div className="my-4 border-t border-border" />

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-border p-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-7"
              aria-label="کاهش تعداد"
              disabled={isBusy || item.quantity <= 1}
              onClick={() => updateCartItem(item.quantity - 1)}
            >
              <Minus className="size-3.5" />
            </Button>

            <span className="min-w-6 text-center text-sm font-semibold tabular-nums">
              {item.quantity.toLocaleString("fa-IR")}
            </span>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-7"
              aria-label="افزایش تعداد"
              disabled={isBusy}
              onClick={() => updateCartItem(item.quantity + 1)}
            >
              {isUpdating ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <Plus className="size-3.5" />
              )}
            </Button>
          </div>

          <div className="text-left">
            <p className="text-[11px] text-muted-foreground">قیمت کل</p>
            <p className="mt-0.5 text-sm font-bold tabular-nums">
              {totalPrice.toLocaleString("fa-IR")} تومان
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
