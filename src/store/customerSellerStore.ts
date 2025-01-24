import {create} from "zustand";

interface Store {
  selectedSeller: string;
  setSelectedSeller: (type: string) => void;
}

export const customerSellerStore = create<Store>((set) => ({
  selectedSeller: "pedram",  
  setSelectedSeller: (type: string) => set({ selectedSeller: type }), 
}));
