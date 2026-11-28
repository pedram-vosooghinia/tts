export interface Payment extends Record<string, unknown> {
  id: number | string;
  amount?: number;
  status?: string;
  orderId?: number;
  userId?: number;
  authority?: string;
  refId?: string;
  description?: string;
  created_at?: string;
  createdAt?: string;
  updated_at?: string;
}

export type CreatePaymentDto = Record<string, unknown>;
export type UpdatePaymentDto = Record<string, unknown>;
