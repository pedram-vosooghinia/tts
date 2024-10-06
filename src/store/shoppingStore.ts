"use strict";
import { create } from "zustand";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
const useShoppingStore = create((set) => ({
  cart: Cookies.get("cart")
    ? JSON.parse(Cookies.get("cart"))
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
  setDetails: (details) =>
    set((state) => {
      const updatedCart = { ...state.cart, details };
      Cookies.set("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),
  removeDetails: () =>
    set((state) => {
      const updatedCart = { ...state.cart, details: null };
      Cookies.set("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),
  firstAddToCart: (newItem) => {
    set((state) => {
      const existingItem = state.cart?.cartItems?.find(
        (item) => item.barcode === newItem.barcode
      );
      const cartItems = existingItem
        ? (state.cart?.cartItems || []).map((item) =>
            item.title === existingItem.title ? newItem : item
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
        (item) => item.barcode === newItem.barcode
      );

      if (existingItem) {
        if (
          existingItem.quantity + 1 > newItem.inventory ||
          existingItem.quantity + 1 > newItem.validation_value
        ) {
          toast.error("متاسفانه مقدار موجودی کافی نیست.");
          return state;
        }

        toast.success("محصول به سبد خرید شما اضافه شد");
        existingItem.quantity += 1;
      } else {
        if (newItem.quantity > newItem.inventory) {
          toast.error("متاسفانه مقدار موجودی کافی نیست.");
          return state;
        }

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
        (cartItem) => cartItem.barcode === item.barcode
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
        (cartItem) => cartItem.barcode !== item.barcode
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
