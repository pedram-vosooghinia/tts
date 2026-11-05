import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import TicketBadge from "./TicketBadge";

import type { Ticket } from "../types/ticket.types";

interface TicketDetailsHeaderProps {
  ticket: Ticket;
  onBack: () => void;
}

export default function TicketDetailsHeader({
  ticket,
  onBack,
}: TicketDetailsHeaderProps) {
  return (
    <div className="space-y-4">
      <Button variant="ghost" onClick={onBack} className="px-0">
        <ArrowRight className="ml-2 h-4 w-4" />
        بازگشت به تیکت‌ها
      </Button>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold">{ticket.title}</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            شماره تیکت: {ticket.id}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <TicketBadge type="status" value={ticket.status} />
          <TicketBadge type="priority" value={ticket.priority} />
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        تاریخ ثبت: {new Date(ticket.created_at).toLocaleString("fa-IR")}
      </div>
    </div>
  );
}
