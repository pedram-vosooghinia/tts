"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import useShoppingStore from "@/store/shoppingStore";

const Shopping = () => {
  const { cart } = useShoppingStore();
  const cartItemsCount = cart?.cartItems?.reduce((acc, cur) => acc + cur.quantity, 0) || 0;

  return (
    <div className="flex justify-between items-center">
      <Link href="/dashboard/preForma/carts" className="flex flex-col items-center text-sm hover:rounded-sm">
        <div className="flex items-center gap-1">
          <span className="pt-2">{cartItemsCount}</span>
          <ShoppingCart />
        </div>
      </Link>
    </div>
  );
};

export default Shopping;
