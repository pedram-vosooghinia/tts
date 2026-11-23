export type OrderStatus =
  | "pending"
  | "paid"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface OrderProduct {
  id: number;
  title?: string;
  name?: string;
  price?: number;
}

export interface OrderItem {
  id: number;
  productId?: number;
  product?: OrderProduct | null;
  quantity: number;
  price: number;
}

export interface OrderAddress {
  id: number;
  city?: string;
  privince?: string;
  address?: string;
  postal_code?: string;
  reciver_mobile?: string;
}

export interface Order {
  id: number;
  status: OrderStatus;
  items: OrderItem[];
  totalPrice: number;
  totalItems: number;
  address?: OrderAddress | null;
  addressId?: number;
  createdAt?: string;
}

export interface CreateOrderDto {
  addressId: number;
}

export interface UpdateOrderStatusDto {
  status: OrderStatus;
}

export interface OrderApiResponse<T> {
  statusCode: number;
  data: T;
  message?: string;
}
