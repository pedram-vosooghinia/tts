import type { OrderStatus } from "../types/order.types";

export const orderStatusLabels: Record<OrderStatus, string> = {
  pending: "در انتظار پرداخت",
  paid: "پرداخت شده",
  processing: "در حال پردازش",
  shipped: "ارسال شده",
  delivered: "تحویل شده",
  cancelled: "لغو شده",
};

export const orderStatusVariants: Record<
  OrderStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
  pending: "outline",
  paid: "default",
  processing: "secondary",
  shipped: "default",
  delivered: "secondary",
  cancelled: "destructive",
};

export const orderStatusOptions = (
  Object.keys(orderStatusLabels) as OrderStatus[]
).map((value) => ({ value, label: orderStatusLabels[value] }));
