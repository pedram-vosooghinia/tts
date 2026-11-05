import type { TicketPriority, TicketStatus } from "../types/ticket.types";

export const ticketStatusLabels: Record<TicketStatus, string> = {
  open: "باز",
  in_progress: "در حال بررسی",
  waiting_for_user: "منتظر پاسخ کاربر",
  resolved: "حل شده",
  closed: "بسته شده",
};

export const ticketPriorityLabels: Record<TicketPriority, string> = {
  low: "کم",
  medium: "متوسط",
  high: "زیاد",
  urgent: "فوری",
};

export const ticketStatusVariants: Record<
  TicketStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
  open: "default",
  in_progress: "secondary",
  waiting_for_user: "outline",
  resolved: "secondary",
  closed: "destructive",
};

export const ticketPriorityVariants: Record<
  TicketPriority,
  "default" | "secondary" | "destructive" | "outline"
> = {
  low: "secondary",
  medium: "outline",
  high: "default",
  urgent: "destructive",
};
