export interface CartProduct {
  id: number;
  title: string;
  description?: string | null;
  price: number;
  stock?: number;
  categories?: { id: number; name: string; slug?: string }[];
}

export interface CartItem {
  /** Cart item id, used by the update/remove item endpoints. */
  id: number;
  productId: number;
  quantity: number;
  product: CartProduct;
}

export interface Cart {
  id: number;
  items: CartItem[];
  totalItems?: number;
  totalPrice?: number;
}

export interface AddToCartDto {
  productId: number;
  quantity: number;
}

export interface UpdateCartItemDto {
  quantity: number;
}

export interface CartApiResponse<T> {
  statusCode: number;
  data: T;
  message?: string;
}
