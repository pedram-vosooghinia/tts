"use strict";

import { create } from "zustand";
export const useModalStore = create((set) => ({
  isOpen: false,
  activeModal: null,
  openModal: (modalType:string) => set({ isOpen: true, activeModal: modalType }),
  closeModal: () => set({ isOpen: false, activeModal: null }),
}));
