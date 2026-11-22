"use client";

import { Loader2, Minus, Plus, Trash2 } from "lucide-react";

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

  return (
    <Card>
      <CardContent className="flex flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="line-clamp-2 font-semibold">{item.product.title}</p>

            <p className="mt-1 text-xs text-muted-foreground">
              {(item.product.price || 0).toLocaleString("fa-IR")} تومان
            </p>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="حذف از سبد خرید"
            disabled={isBusy}
            onClick={removeCartItem}
          >
            {isRemoving ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Trash2 className="text-destructive" />
            )}
          </Button>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-8 w-8"
              aria-label="کاهش تعداد"
              disabled={isBusy || item.quantity <= 1}
              onClick={() => updateCartItem(item.quantity - 1)}
            >
              <Minus />
            </Button>

            <span className="min-w-8 text-center text-sm font-medium">
              {item.quantity.toLocaleString("fa-IR")}
            </span>

            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-8 w-8"
              aria-label="افزایش تعداد"
              disabled={isBusy}
              onClick={() => updateCartItem(item.quantity + 1)}
            >
              {isUpdating ? <Loader2 className="animate-spin" /> : <Plus />}
            </Button>
          </div>

          <span className="text-sm font-semibold">
            {((item.product.price || 0) * item.quantity).toLocaleString("fa-IR")}{" "}
            تومان
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
