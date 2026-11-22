"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Loader2, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useAddToCart } from "../hooks/useAddToCart";

interface AddToCartButtonProps {
  productId: number;
  className?: string;
  label?: string;
}

export default function AddToCartButton({
  productId,
  className,
  label = "افزودن به سبد خرید",
}: AddToCartButtonProps) {
  const router = useRouter();
  const { addToCart, isAdding } = useAddToCart();

  const handleClick = async () => {
    if (!Cookies.get("access_token")) {
      router.push("/login");
      return;
    }

    await addToCart({ productId, quantity: 1 });
  };

  return (
    <Button
      type="button"
      size="sm"
      className={cn("w-full", className)}
      disabled={isAdding}
      onClick={handleClick}
    >
      {isAdding ? (
        <Loader2 className="animate-spin" />
      ) : (
        <ShoppingCart />
      )}
      {isAdding ? "در حال افزودن..." : label}
    </Button>
  );
}
