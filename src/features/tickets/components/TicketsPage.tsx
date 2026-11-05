"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { useTickets } from "@/features/tickets/hooks/useTickets";
import TicketsTable from "@/features/tickets/components/TicketsTable";
import type { Ticket } from "@/features/tickets/types/ticket.types";
import { useAuth } from "@/features/auth/hooks/useAuth";

import BreadcrumbMain from "@/components/shared/BreadcrumbMain";
import PageHeader from "@/components/shared/PageHeader";

export default function TicketsPage() {
  const router = useRouter();

  const { tickets, isLoading, error } = useTickets();
  console.log("tickets", tickets);
  console.log("isLoading", isLoading);
  console.log("error", error);
  const { user } = useAuth();

  const isSupport = user?.role === "support";
  const dashboardPath = isSupport ? "/support" : "/dashboard";
console.log("dashboardPath",dashboardPath)
  const handleViewTicket = (ticket: Ticket) => {
    router.push(`${dashboardPath}/tickets/${ticket.id}`);
  };

  if (!user) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        در حال دریافت اطلاعات کاربر...
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <BreadcrumbMain
        items={[
          { label: "داشبورد", href: dashboardPath },
          { label: "تیکت‌ها", href: "#" },
        ]}
      />

      <div className="flex items-center justify-between">
        <PageHeader
          title={isSupport ? "مدیریت تیکت‌ها" : "تیکت‌های من"}
          description={
            isSupport
              ? "مشاهده و پیگیری درخواست‌های کاربران"
              : "مشاهده و پیگیری درخواست‌های پشتیبانی شما"
          }
        />

        {!isSupport && (
          <Button onClick={() => router.push("/dashboard/tickets/create")}>
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
