"use strict";
import { create } from "zustand";
import { User } from "@/types/user";

interface UserState {
  user: User | null;
  addToUser: (newUser: User) => void;
  clearUser: () => void;
}
const useUserStore = create<UserState>((set) => ({
  user: null,

  addToUser: (user) => set({ user }),

  clearUser: () => set({ user: null }),
}));

export default useUserStore;
