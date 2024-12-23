// src/store/useStore.ts
import {create} from "zustand";

interface Store {
  selectedType: string;
  setSelectedType: (type: string) => void;
}

export const hashtagTypeStore = create<Store>((set) => ({
  selectedType: "tts",  
  setSelectedType: (type: string) => set({ selectedType: type }), 
}));
