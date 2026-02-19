import { ProductItem } from "@/types/product";


interface CartItem {
  quantity: number;
  product: ProductItem;
}

export interface CartState {
  cart: {
    cartItems: CartItem[];
  };
  firstAddToCart: (newItem: CartItem) => void;
  increaseValueCart: (newItem: CartItem) => void;
  decreaseValueCart: (item: CartItem) => void;
  deleteValueCart: (item: CartItem) => void;
  deleteAllCart: () => void;
}
