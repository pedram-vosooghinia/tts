import { Badge } from "@/components/ui/badge";

import {
  ticketStatusLabels,
  ticketStatusVariants,
  ticketPriorityLabels,
  ticketPriorityVariants,
} from "../constants/ticket.constants";

import type { TicketPriority, TicketStatus } from "../types/ticket.types";

interface TicketBadgeProps {
  type: "status" | "priority";
  value: TicketStatus | TicketPriority;
}

export default function TicketBadge({ type, value }: TicketBadgeProps) {
  if (type === "status") {
    const status = value as TicketStatus;

    return (
      <Badge variant={ticketStatusVariants[status]}>
        {ticketStatusLabels[status]}
      </Badge>
    );
  }

  const priority = value as TicketPriority;

  return (
    <Badge variant={ticketPriorityVariants[priority]}>
      {ticketPriorityLabels[priority]}
    </Badge>
  );
}
