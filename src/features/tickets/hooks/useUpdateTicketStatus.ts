"use client";

import { useState } from "react";
import { useSWRConfig } from "swr";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

import { updateTicketStatusService } from "../services/tickets.services";
import type { TicketStatus } from "../types/ticket.types";

export function useUpdateTicketStatus(ticketId: number) {
  const [isUpdating, setIsUpdating] = useState(false);
  const { mutate } = useSWRConfig();

  const updateStatus = async (status: TicketStatus) => {
    try {
      setIsUpdating(true);

      await updateTicketStatusService(ticketId, { status });

      await mutate(`/tickets/${ticketId}`);
      await mutate("/tickets");

      toast.success("وضعیت تیکت با موفقیت تغییر کرد");

      return true;
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;

      toast.error(err.response?.data?.message || "خطا در تغییر وضعیت تیکت");

      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    updateStatus,
    isUpdating,
  };
}
