import { api } from "@/services/api";

import type {
  CreatePaymentDto,
  Payment,
  UpdatePaymentDto,
} from "../types/payment.types";

function normalizePaymentsList(raw: unknown): Payment[] {
  if (Array.isArray(raw)) return raw as Payment[];
  if (raw && typeof raw === "object") {
    const obj = raw as Record<string, unknown>;
    const candidate = obj.data ?? obj.items ?? obj.payments;
    if (Array.isArray(candidate)) return candidate as Payment[];
  }
  return [];
}

export const getPaymentsService = async (): Promise<Payment[]> => {
  const res = await api.get("/payments");
  return normalizePaymentsList(res.data.data ?? res.data);
};

export const getPaymentService = async (
  id: number | string,
): Promise<Payment> => {
  const res = await api.get(`/payments/${id}`);
  return (res.data.data ?? res.data) as Payment;
};

export const createPaymentService = async (
  data: CreatePaymentDto = {},
): Promise<Payment> => {
  const res = await api.post("/payments", data);
  return (res.data.data ?? res.data) as Payment;
};

export const updatePaymentService = async (
  id: number | string,
  data: UpdatePaymentDto = {},
): Promise<Payment> => {
  const res = await api.patch(`/payments/${id}`, data);
  return (res.data.data ?? res.data) as Payment;
};

export const deletePaymentService = async (
  id: number | string,
): Promise<void> => {
  await api.delete(`/payments/${id}`);
};
