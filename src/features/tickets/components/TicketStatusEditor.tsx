"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";

import { useUpdateTicketStatus } from "../hooks/useUpdateTicketStatus";
import type { Ticket, TicketStatus } from "../types/ticket.types";

interface TicketStatusEditorProps {
  ticket: Ticket;
}

const statusOptions: {
  value: TicketStatus;
  label: string;
}[] = [
  { value: "open", label: "باز" },
  { value: "in_progress", label: "در حال بررسی" },
  { value: "waiting_for_user", label: "منتظر پاسخ کاربر" },
  { value: "resolved", label: "حل شده" },
  { value: "closed", label: "بسته شده" },
];

export default function TicketStatusEditor({
  ticket,
}: TicketStatusEditorProps) {
  const { updateStatus, isUpdating } = useUpdateTicketStatus(ticket.id);

  const handleStatusChange = async (value: string) => {
    await updateStatus(value as TicketStatus);
  };

  return (
    <div className="space-y-2">
      <Label>تغییر وضعیت تیکت</Label>

      <Select
        value={ticket.status}
        onValueChange={handleStatusChange}
        disabled={isUpdating || ticket.status === "closed"}
      >
        <SelectTrigger className="w-full sm:w-[220px]">
          <SelectValue placeholder="انتخاب وضعیت" />
        </SelectTrigger>

        <SelectContent>
          {statusOptions.map((status) => (
            <SelectItem key={status.value} value={status.value}>
              {status.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {ticket.status === "closed" && (
        <p className="text-xs text-muted-foreground">
          وضعیت تیکت بسته‌شده قابل تغییر نیست.
        </p>
      )}
    </div>
  );
}
