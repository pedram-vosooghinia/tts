import { api } from "@/services/api";

import type {
  Ticket,
  TicketMessage,
  CreateTicketDto,
  CreateTicketMessageDto,
  UpdateTicketStatusDto,
  UpdateTicketPriorityDto,
} from "../types/ticket.types";

// دریافت لیست تیکت‌ها
export const getTicketsService = async (): Promise<Ticket[]> => {
  const res = await api.get("/tickets");
  return res.data.data;
};

// دریافت جزئیات یک تیکت
export const getTicketService = async (id: number): Promise<Ticket> => {
  const res = await api.get(`/tickets/${id}`);
  return res.data.data;
};

// ایجاد تیکت جدید
export const createTicketService = async (
  data: CreateTicketDto,
): Promise<Ticket> => {
  const res = await api.post("/tickets", data);
  return res.data.data;
};

// ارسال پیام در تیکت
export const sendTicketMessageService = async (
  id: number,
  data: CreateTicketMessageDto,
): Promise<TicketMessage> => {
  const res = await api.post(`/tickets/${id}/messages`, data);
  return res.data.data;
};

// تغییر وضعیت تیکت
export const updateTicketStatusService = async (
  id: number,
  data: UpdateTicketStatusDto,
): Promise<Ticket> => {
  const res = await api.patch(`/tickets/${id}/status`, data);
  return res.data.data;
};

// تغییر اولویت تیکت
export const updateTicketPriorityService = async (
  id: number,
  data: UpdateTicketPriorityDto,
): Promise<Ticket> => {
  const res = await api.patch(`/tickets/${id}/priority`, data);
  return res.data.data;
};
