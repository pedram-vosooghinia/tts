"use client";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import useShoppingStore from "@/store/shoppingStore";
const Shoping = () => {
  const { cart } = useShoppingStore();
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    if (cart && cart.cartItems) {
      setCartItemsCount(
        cart.cartItems.reduce((acc, cur) => acc + cur.quantity, 0)
      );
    }
  }, [cart]);
  return (
    <div className=" flex justify-between items-center rtl ">
      <Link href="/dashboard/preForma/carts">
        <div className="flex flex-col items-center  text-sm  hover:rounded-sm">
          <div className="flex ">
            <div className=" text-red-500  text-l">
              <div className="pt-2"> {cartItemsCount} </div>
            </div>
            <ShoppingCart  />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Shoping;
