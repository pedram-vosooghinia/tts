import type { TicketUser } from "../types/ticket.types";

interface TicketOwnerInfoProps {
  user: TicketUser;
}

export default function TicketOwnerInfo({ user }: TicketOwnerInfoProps) {
  return (
    <div className="rounded-lg border p-4">
      <h3 className="mb-3 font-semibold">اطلاعات صاحب تیکت</h3>

      <div className="grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <span className="text-muted-foreground">نام و نام خانوادگی:</span>
          <p className="mt-1 font-medium">
            {user.first_name} {user.last_name}
          </p>
        </div>

        <div>
          <span className="text-muted-foreground">شناسه کاربر:</span>
          <p className="mt-1 font-medium" dir="ltr">
            {user.id}
          </p>
        </div>
      </div>
    </div>
  );
}