export type TicketPriority = "low" | "medium" | "high" | "urgent";

export type TicketStatus =
  | "open"
  | "in_progress"
  | "waiting_for_user"
  | "resolved"
  | "closed";

export interface TicketUser {
  id: number;
  first_name: string;
  last_name: string;
}

export interface TicketMessage {
  id: number;
  message: string;
  created_at: string;
  sender: TicketUser;
}

export interface Ticket {
  id: number;
  title: string;
  status: TicketStatus;
  priority: TicketPriority;
  created_at: string;
  closed_at?: string | null;
  user: TicketUser;
  messages: TicketMessage[];
}
export interface CreatedTicketMessage {
  id: number;
  message: string;
  ticketId: number;
  senderId: number;
  created_at: string;
}
export interface CreateTicketDto {
  title: string;
  priority?: TicketPriority;
  initialMessage: string;
}

export interface CreateTicketMessageDto {
  message: string;
}

export interface UpdateTicketStatusDto {
  status: TicketStatus;
}

export interface UpdateTicketPriorityDto {
  priority: TicketPriority;
}
