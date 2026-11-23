import { api } from "@/services/api";

import type {
  CreateOrderDto,
  Order,
  OrderItem,
  OrderStatus,
  UpdateOrderStatusDto,
} from "../types/order.types";

export const ORDERS_KEY = "/orders/me";

type Dict = Record<string, unknown>;

const asDict = (value: unknown): Dict | null =>
  value && typeof value === "object" && !Array.isArray(value)
    ? (value as Dict)
    : null;

const asNumber = (value: unknown, fallback = 0): number => {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
};

const statuses: OrderStatus[] = [
  "pending",
  "paid",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

/** The API doesn't document its response schemas, so accept common field aliases. */
function normalizeOrderItem(raw: unknown, index: number): OrderItem {
  const item = asDict(raw) ?? {};
  const product = asDict(item.product) ?? {};
  const productId = asNumber(
    item.productId ?? item.product_id ?? product.id,
    index,
  );
  const price = asNumber(item.price ?? product.price);

  return {
    id: asNumber(item.id, productId),
    productId,
    product: {
      id: productId,
      title: String(product.title ?? product.name ?? "محصول"),
      price: asNumber(product.price, price),
    },
    quantity: Math.max(1, asNumber(item.quantity, 1)),
    price,
  };
}

function normalizeOrder(raw: unknown): Order {
  const order = asDict(raw) ?? {};
  const rawItems = order.items ?? order.orderItems ?? order.cartItems;
  const items = Array.isArray(rawItems)
    ? rawItems.map(normalizeOrderItem)
    : [];

  const statusValue = String(order.status ?? "pending") as OrderStatus;
  const status = statuses.includes(statusValue) ? statusValue : "pending";

  const address = asDict(order.address);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const itemsTotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return {
    id: asNumber(order.id),
    status,
    items,
    totalItems: asNumber(order.totalItems, totalItems),
    totalPrice: asNumber(
      order.totalPrice ?? order.total ?? order.total_amount,
      itemsTotal,
    ),
    address: address
      ? {
          id: asNumber(address.id, asNumber(order.addressId)),
          city: address.city ? String(address.city) : undefined,
          privince: address.privince ? String(address.privince) : undefined,
          address: address.address ? String(address.address) : undefined,
          postal_code: address.postal_code
            ? String(address.postal_code)
            : undefined,
          reciver_mobile: address.reciver_mobile
            ? String(address.reciver_mobile)
            : undefined,
        }
      : null,
    addressId: order.addressId !== undefined ? asNumber(order.addressId) : undefined,
    createdAt:
      order.created_at !== undefined || order.createdAt !== undefined
        ? String(order.created_at ?? order.createdAt)
        : undefined,
  };
}

function normalizeOrders(raw: unknown): Order[] {
  if (Array.isArray(raw)) return raw.map(normalizeOrder);

  const data = asDict(raw);
  if (!data) return [];

  const list = data.orders ?? data.items ?? data.data;
  if (Array.isArray(list)) return list.map(normalizeOrder);

  const single = asDict(list);
  return single ? [normalizeOrder(single)] : [];
}

// Get current user orders
export const getMyOrdersService = async (): Promise<Order[]> => {
  const res = await api.get(ORDERS_KEY);

  return normalizeOrders(res.data.data ?? res.data);
};

// Get order details
export const getOrderService = async (id: number): Promise<Order> => {
  const res = await api.get(`/orders/${id}`);

  return normalizeOrder(res.data.data ?? res.data);
};

// Create a new order
export const createOrderService = async (
  data: CreateOrderDto,
): Promise<Order | null> => {
  const res = await api.post("/orders", data);
  const payload = res.data?.data;

  return payload ? normalizeOrder(payload) : null;
};

// Update order status (Admin only)
export const updateOrderStatusService = async (
  id: number,
  data: UpdateOrderStatusDto,
): Promise<void> => {
  await api.patch(`/orders/${id}/status`, data);
};
