import { Product } from "@/types/product"; 
import { Customer } from "./customer";
export interface CartItem {
  id: string;
  name: string;
  quantity: number;
  image:string
  omde_price:number 
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
  numberInPack:Record<string, number>
}

export interface OrderItem {
  product_name: string;
  document_id: string;
  quantity: number;
  omde_price: number;
  number_in_pack:number

}

export interface MoveToShippingRequestProps {
  customer_id: string | null;
  total_price: number;
  order_items: OrderItem[];
  status: number;
  discount: number;
}