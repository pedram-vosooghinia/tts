"use strict";
import { create } from "zustand";
import toast from "react-hot-toast";
import { persist } from "zustand/middleware";
import { CartState } from "@/types/store/shoping";
const useShoppingStore = create<CartState>()(
  persist(
    (set) => ({
      cart: { cartItems: [] },

      firstAddToCart: (newItem) =>
        set((state) => {
          const existingItem = state.cart.cartItems.find(
            (item) => item.product.id === newItem.product.id
          );

          const cartItems = existingItem
            ? state.cart.cartItems.map((item) =>
                item.product.id === existingItem.product.id ? newItem : item
              )
            : [...state.cart.cartItems, newItem];

          const updatedCart = { ...state.cart, cartItems };
          return { cart: updatedCart };
        }),

      increaseValueCart: (newItem) =>
        set((state) => {
          const existingItem = state.cart.cartItems.find(
            (item) => item.product.id === newItem.product.id
          );

          if (existingItem) {
            existingItem.quantity += 1;
            toast.success("محصول به سبد خرید شما اضافه شد");
          } else {
            const updatedCartItems = [...state.cart.cartItems, newItem];
            const updatedCart = { ...state.cart, cartItems: updatedCartItems };
            toast.success("محصول به سبد خرید شما اضافه شد");
            return { cart: updatedCart };
          }

          return { cart: { ...state.cart } };
        }),

      decreaseValueCart: (item) =>
        set((state) => {
          const existingItem = state.cart.cartItems.find(
            (cartItem) => cartItem.product.id === item.product.id
          );

          if (existingItem) {
            if (existingItem.quantity - 1 >= 1) {
              toast.success("محصول از سبد خرید شما کم شد");
              existingItem.quantity -= 1;
            } else {
              existingItem.quantity = 1;
            }
          }

          return { cart: { ...state.cart } };
        }),

      deleteValueCart: (item) =>
        set((state) => {
          const updatedCartItems = state.cart.cartItems.filter(
            (cartItem) => cartItem.product.id !== item.product.id
          );
          const updatedCart = { ...state.cart, cartItems: updatedCartItems };
          toast.success("محصول از سبد خرید شما حذف شد");
          return { cart: updatedCart };
        }),

      deleteAllCart: () => {
        set(() => ({ cart: { cartItems: [] } }));
        toast.success("سبد خرید خالی شد");
      },
    }),
    {
      name: "shopping-cart",
    }
  )
);
export default useShoppingStore;
