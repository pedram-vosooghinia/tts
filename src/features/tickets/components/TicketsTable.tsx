"use client";

import { Eye } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import type { Ticket } from "../types/ticket.types";
import TicketBadge from "./TicketBadge";

interface TicketsTableProps {
  tickets: Ticket[];
  isSupport: boolean;
  onView: (ticket: Ticket) => void;
}

export default function TicketsTable({
  tickets,
  isSupport,
  onView,
}: TicketsTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-right">عنوان</TableHead>

            {isSupport && (
              <TableHead className="text-right">صاحب تیکت</TableHead>
            )}

            <TableHead className="text-right">وضعیت</TableHead>
            <TableHead className="text-right">اولویت</TableHead>
            <TableHead className="text-right">تاریخ ثبت</TableHead>
            <TableHead className="text-center">عملیات</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {tickets.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={isSupport ? 6 : 5}
                className="h-24 text-center text-muted-foreground"
              >
                هیچ تیکتی یافت نشد.
              </TableCell>
            </TableRow>
          ) : (
            tickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell className="font-medium">{ticket.title}</TableCell>

                {isSupport && (
                  <TableCell>
                    {ticket.user.first_name} {ticket.user.last_name}
                  </TableCell>
                )}

                <TableCell>
                  <TicketBadge type="status" value={ticket.status} />
                </TableCell>

                <TableCell>
                  <TicketBadge type="priority" value={ticket.priority} />
                </TableCell>

                <TableCell dir="rtl">
                  {new Date(ticket.created_at).toLocaleDateString("fa-IR")}
                </TableCell>

                <TableCell className="text-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onView(ticket)}
                    aria-label="مشاهده تیکت"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
