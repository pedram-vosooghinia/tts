"use strict";
import { create } from "zustand";
import Cookies from "js-cookie";

const useUserStore = create((set) => ({
  user: Cookies.get("user")
    ? JSON.parse(Cookies.get("user"))
    : [],

  addToUser: (newUser) => {
    Cookies.set("user", JSON.stringify(newUser), { sameSite: 'Strict', secure: true });
    set({ user: newUser });
  },

  clearUser: () => {
    set({ user: null });
    Cookies.remove("user");
  },
}));

export default useUserStore;
