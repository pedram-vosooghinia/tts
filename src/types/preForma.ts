import { Product } from "@/types/product"; 
import { Customer } from "./customer";
export interface CartItem {
  document_id: string;
  barcode:number
  product_name: string;
  quantity: number;
  price: number
}

export interface CartState {
  cart: {
    cartItems: CartItem[];
    customer?: Customer | null;
    discount?: number ;
  };
  setCustomer: (customer: Customer) => void;
  removeCustomer: () => void;
  setDiscount: (discount: number) => void;
  removeDiscount: () => void;
  firstAddToCart: (newItem: CartItem) => void;
  increaseValueCart: (newItem: CartItem) => void;
  decreaseValueCart: (item: CartItem) => void;
  deleteValueCart: (item: CartItem) => void;
  deleteAllCart: () => void;
}

export interface ProductCartProps {
  product: Product;
}


export interface MoveToShippingProps {
  exceptionsPrice: Record<string, number>; 
  totalInvoice: number;
  discountAmount: number | undefined;
  finalPay: number;
}