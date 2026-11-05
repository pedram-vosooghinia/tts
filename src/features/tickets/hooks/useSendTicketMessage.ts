"use client";

import { useState } from "react";
import { useSWRConfig } from "swr";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

import { sendTicketMessageService } from "../services/tickets.services";
import type { CreateTicketMessageDto } from "../types/ticket.types";

export function useSendTicketMessage(ticketId: number) {
  const [isSending, setIsSending] = useState(false);
  const { mutate } = useSWRConfig();

  const sendMessage = async (data: CreateTicketMessageDto) => {
    try {
      setIsSending(true);

      await sendTicketMessageService(ticketId, data);

      await mutate(`/tickets/${ticketId}`);
      await mutate("/tickets");

      toast.success("پیام با موفقیت ارسال شد");

      return true;
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;

      toast.error(err.response?.data?.message || "خطا در ارسال پیام");

      return false;
    } finally {
      setIsSending(false);
    }
  };

  return {
    sendMessage,
    isSending,
  };
}

