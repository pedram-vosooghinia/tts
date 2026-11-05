"use client";

import { useState } from "react";
import { Send, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useSendTicketMessage } from "../hooks/useSendTicketMessage";

interface TicketReplyFormProps {
  ticketId: number;
  disabled?: boolean;
}

export default function TicketReplyForm({
  ticketId,
  disabled = false,
}: TicketReplyFormProps) {
  const [message, setMessage] = useState("");
  const { sendMessage, isSending } = useSendTicketMessage(ticketId);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedMessage = message.trim();

    if (trimmedMessage.length < 3) return;

    const success = await sendMessage({ message: trimmedMessage });

    if (success) {
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 border-t pt-5">
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="پیام خود را بنویسید..."
        rows={4}
        disabled={disabled || isSending}
      />

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={disabled || isSending || message.trim().length < 3}
        >
          {isSending ? (
            <Loader2 className="ml-2 h-4 w-4 animate-spin" />
          ) : (
            <Send className="ml-2 h-4 w-4" />
          )}

          {isSending ? "در حال ارسال..." : "ارسال پیام"}
        </Button>
      </div>
    </form>
  );
}
