"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus, Ticket as TicketIcon } from "lucide-react";
import { useTickets } from "@/features/tickets/hooks/useTickets";
import TicketsTable from "@/features/tickets/components/TicketsTable";
import type { Ticket } from "@/features/tickets/types/ticket.types";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function TicketsPage() {
  const router = useRouter();

  const { tickets, isLoading, error } = useTickets();
  const { user } = useAuth();

  const isSupport = user?.role === "support";

  const handleViewTicket = (ticket: Ticket) => {
    router.push(`/tickets/${ticket.id}`);
  };

  return (
    <div className="space-y-6 p-6 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold">
            <TicketIcon className="h-6 w-6" />
            تیکت‌ها
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            مدیریت و پیگیری درخواست‌های پشتیبانی
          </p>
        </div>

        {!isSupport && (
          <Button onClick={() => router.push("/tickets/create")}>
            <Plus className="ml-2 h-4 w-4" />
            ایجاد تیکت
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="py-12 text-center text-muted-foreground">
          در حال دریافت تیکت‌ها...
        </div>
      ) : error ? (
        <div className="py-12 text-center text-destructive">
          دریافت تیکت‌ها با خطا مواجه شد.
        </div>
      ) : (
        <TicketsTable
          tickets={tickets}
          isSupport={isSupport}
          onView={handleViewTicket}
        />
      )}
    </div>
  );
}
