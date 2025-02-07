"use strict";
import { create } from "zustand";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { CartState } from "@/types/preForma";
const useShoppingStore = create<CartState>((set) => ({
  cart: Cookies.get("cart")
    ? JSON.parse(Cookies.get("cart") as string)
    : { cartItems: [] },
  setCustomer: (customer) =>
    set((state) => {
      const updatedCart = { ...state.cart, customer };
      Cookies.set("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),
  removeCustomer: () =>
    set((state) => {
      const updatedCart = { ...state.cart, customer: null };
      Cookies.set("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),
    setDiscount: (discount: number) =>
      set((state) => {
        const updatedCart = { ...state.cart, discount: Number(discount) }; // تبدیل رشته به عدد
        Cookies.set("cart", JSON.stringify(updatedCart));
        return { cart: updatedCart };
      }),
    removeDiscount: () =>
    set((state) => {
      const updatedCart = { ...state.cart, discount: 0 };
      Cookies.set("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),
  firstAddToCart: (newItem) => {
    set((state) => {
      const existingItem = state.cart?.cartItems?.find(
        (item) => item.id === newItem.id
      );
      const cartItems = existingItem
        ? (state.cart?.cartItems || []).map((item) =>
            item.name === existingItem.name ? newItem : item
          )
        : [...(state.cart?.cartItems || []), newItem];

      const updatedCart = { ...state.cart, cartItems };
      Cookies.set("cart", JSON.stringify(updatedCart));
      return { ...state, cart: updatedCart };
    });
  },

  increaseValueCart: (newItem) =>
    set((state) => {
      const existingItem = state.cart.cartItems.find(
        (item) => item.id === newItem.id
      );

      if (existingItem) {
   
          existingItem.quantity += 1;

        toast.success("محصول به سبد خرید شما اضافه شد");
      } else {
  

        const updatedCartItems = [...state.cart.cartItems, newItem];
        const updatedCart = { ...state.cart, cartItems: updatedCartItems };

        toast.success("محصول به سبد خرید شما اضافه شد");
        Cookies.set("cart", JSON.stringify(updatedCart), {
          sameSite: "Strict",
        });

        return { cart: updatedCart };
      }

      const updatedCart = { ...state.cart };
      Cookies.set("cart", JSON.stringify(updatedCart), {
        sameSite: "Strict",
      });

      return { cart: updatedCart };
    }),

  decreaseValueCart: (item) =>
    set((state) => {
      const existingItem = state.cart.cartItems.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItem) {
        if (existingItem.quantity - 1 >= 1) {
          toast.success("محصول از سبد خرید شما کم شد");
          existingItem.quantity -= 1;
        } else {
          existingItem.quantity = 1;
        }
      }

      const updatedCart = { ...state.cart };
      Cookies.set("cart", JSON.stringify(updatedCart), {
        sameSite: "Strict",
      });

      return { cart: updatedCart };
    }),

  deleteValueCart: (item) =>
    set((state) => {
      const updatedCartItems = state.cart.cartItems.filter(
        (cartItem) => cartItem.id !== item.id
      );

      const updatedCart = { ...state.cart, cartItems: updatedCartItems };

      toast.success("محصول از سبد خرید شما حذف شد");
      Cookies.set("cart", JSON.stringify(updatedCart), {
        sameSite: "Strict",
      });

      return { cart: updatedCart };
    }),
  deleteAllCart: () =>
    set(() => {
      const initialState = { cartItems: [] };
      Cookies.remove("cart");
      return { cart: initialState };
    }),
}));

export default useShoppingStore;
