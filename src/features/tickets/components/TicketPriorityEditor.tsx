"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";

import { useUpdateTicketPriority } from "../hooks/useUpdateTicketPriority";
import type { Ticket, TicketPriority } from "../types/ticket.types";

interface TicketPriorityEditorProps {
  ticket: Ticket;
}

const priorityOptions: {
  value: TicketPriority;
  label: string;
}[] = [
  { value: "low", label: "کم" },
  { value: "medium", label: "متوسط" },
  { value: "high", label: "زیاد" },
  { value: "urgent", label: "فوری" },
];

export default function TicketPriorityEditor({
  ticket,
}: TicketPriorityEditorProps) {
  const { updatePriority, isUpdating } = useUpdateTicketPriority(ticket.id);

  const handlePriorityChange = async (value: string) => {
    await updatePriority(value as TicketPriority);
  };

  return (
    <div className="space-y-2">
      <Label>تغییر اولویت تیکت</Label>

      <Select
        value={ticket.priority}
        onValueChange={handlePriorityChange}
        disabled={isUpdating || ticket.status === "closed"}
      >
        <SelectTrigger className="w-full sm:w-[220px]">
          <SelectValue placeholder="انتخاب اولویت" />
        </SelectTrigger>

        <SelectContent>
          {priorityOptions.map((priority) => (
            <SelectItem key={priority.value} value={priority.value}>
              {priority.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {ticket.status === "closed" && (
        <p className="text-xs text-muted-foreground">
          اولویت تیکت بسته‌شده قابل تغییر نیست.
        </p>
      )}
    </div>
  );
}
