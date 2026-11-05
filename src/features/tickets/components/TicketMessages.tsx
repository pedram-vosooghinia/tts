import type { TicketMessage } from "../types/ticket.types";

interface TicketMessagesProps {
  messages: TicketMessage[];
  currentUserId: number;
}

export default function TicketMessages({
  messages,
  currentUserId,
}: TicketMessagesProps) {
  return (
    <div className="space-y-4">
      {messages.map((message) => {
        const isCurrentUser = message.sender.id === currentUserId;

        return (
          <div
            key={message.id}
            className={`flex ${
              isCurrentUser ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`max-w-[85%] rounded-lg p-4 ${
                isCurrentUser
                  ? "bg-primary text-primary-foreground"
                  : "border bg-muted"
              }`}
            >
              <div className="mb-2 flex items-center justify-between gap-4">
                <span className="text-sm font-semibold">
                  {message.sender.first_name} {message.sender.last_name}
                </span>

                <span className="text-xs opacity-70" dir="rtl">
                  {new Date(message.created_at).toLocaleString("fa-IR")}
                </span>
              </div>

              <p className="whitespace-pre-wrap text-sm leading-7">
                {message.message}
              </p>
            </div>
          </div>
        );
      })}

      {messages.length === 0 && (
        <p className="py-8 text-center text-sm text-muted-foreground">
          هنوز پیامی ثبت نشده است.
        </p>
      )}
    </div>
  );
}
