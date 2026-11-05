"use client";

import { useState } from "react";
import { useSWRConfig } from "swr";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

import { updateTicketPriorityService } from "../services/tickets.services";
import type { TicketPriority } from "../types/ticket.types";

export function useUpdateTicketPriority(ticketId: number) {
  const [isUpdating, setIsUpdating] = useState(false);
  const { mutate } = useSWRConfig();

  const updatePriority = async (priority: TicketPriority) => {
    try {
      setIsUpdating(true);

      await updateTicketPriorityService(ticketId, { priority });

      await mutate(`/tickets/${ticketId}`);
      await mutate("/tickets");

      toast.success("اولویت تیکت با موفقیت تغییر کرد");

      return true;
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;

      toast.error(err.response?.data?.message || "خطا در تغییر اولویت تیکت");

      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    updatePriority,
    isUpdating,
  };
}
