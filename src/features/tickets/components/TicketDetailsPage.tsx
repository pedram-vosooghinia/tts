"use client";

import { useParams, useRouter } from "next/navigation";
import { AxiosError } from "axios";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { useTicket } from "@/features/tickets/hooks/useTicket";

import BreadcrumbMain from "@/components/shared/BreadcrumbMain";
import PageHeader from "@/components/shared/PageHeader";
import TicketStatusEditor from "@/features/tickets/components/TicketStatusEditor";
import TicketDetailsHeader from "@/features/tickets/components/TicketDetailsHeader";
import TicketMessages from "@/features/tickets/components/TicketMessages";
import TicketReplyForm from "@/features/tickets/components/TicketReplyForm";
import TicketPriorityEditor from "@/features/tickets/components/TicketPriorityEditor";
import TicketOwnerInfo from "@/features/tickets/components/TicketOwnerInfo";
export default function TicketDetailsPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const ticketId = Number(params.id);
  const isValidId = Number.isInteger(ticketId) && ticketId > 0;

  const { user } = useAuth();

  const { ticket, isLoading, error } = useTicket(isValidId ? ticketId : null);

  if (!isValidId) {
    return (
      <div className="p-6 text-center text-destructive">
        شناسه تیکت معتبر نیست.
      </div>
    );
  }

  if (!user) {
    return (
      <div className="py-16 text-center text-muted-foreground">
        در حال دریافت اطلاعات کاربر...
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="py-16 text-center text-muted-foreground">
        در حال دریافت اطلاعات تیکت...
      </div>
    );
  }

  if (error || !ticket) {
    const status = (error as AxiosError)?.response?.status;

    let errorMessage = "دریافت اطلاعات تیکت با خطا مواجه شد.";

    if (status === 403) {
      errorMessage = "شما اجازه دسترسی به این تیکت را ندارید.";
    } else if (status === 404) {
      errorMessage = "تیکت مورد نظر پیدا نشد.";
    }

    return (
      <div className="space-y-4 py-16 text-center">
        <p className="text-destructive">{errorMessage}</p>

        <button
          onClick={() => router.push("/tickets")}
          className="text-sm text-primary hover:underline"
        >
          بازگشت به لیست تیکت‌ها
        </button>
      </div>
    );
  }

  const isSupport = user.role === "support";
  const isClosed = ticket.status === "closed";
  const dashboardPath = isSupport ? "/support" : "/dashboard";

  return (
    <div className="space-y-6 p-6">
      <BreadcrumbMain
        items={[
          { label: "داشبورد", href: dashboardPath },
          { label: "تیکت‌ها", href: `${dashboardPath}/tickets` },
          { label: `تیکت شماره ${ticket.id}`, href: "#" },
        ]}
      />

      <PageHeader
        title="جزئیات تیکت"
        description="مشاهده گفتگو و پیگیری درخواست پشتیبانی"
      />

      <div className="rounded-lg border p-6 space-y-6">
        <TicketDetailsHeader
          ticket={ticket}
          onBack={() => router.push("/tickets")}
        />

        {isSupport && (
          <div className="mt-6 flex flex-col gap-y-2 rounded-lg  p-4 ">
            <TicketStatusEditor ticket={ticket} />
            <TicketPriorityEditor ticket={ticket} />
            <TicketOwnerInfo user={ticket.user} />
          </div>
        )}
        <div className="my-6 border-t" />

        <h2 className="mb-5 font-semibold">گفتگو</h2>

        <TicketMessages messages={ticket.messages} currentUserId={user.id} />

        {isClosed ? (
          <p className="mt-6 rounded-md bg-muted p-4 text-center text-sm text-muted-foreground">
            این تیکت بسته شده است و امکان ارسال پیام جدید وجود ندارد.
          </p>
        ) : (
          <TicketReplyForm ticketId={ticket.id} />
        )}
      </div>
    </div>
  );
}
