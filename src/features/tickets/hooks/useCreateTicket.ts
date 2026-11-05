"use client";

import { useState } from "react";
import { useSWRConfig } from "swr";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

import { createTicketService } from "../services/tickets.services";
import type { CreateTicketDto } from "../types/ticket.types";

export function useCreateTicket() {
  const [isCreating, setIsCreating] = useState(false);
  const { mutate } = useSWRConfig();

  const createTicket = async (data: CreateTicketDto) => {
    try {
      setIsCreating(true);

      const ticket = await createTicketService(data);

      await mutate("/tickets");

      toast.success("تیکت با موفقیت ایجاد شد");

      return ticket;
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;

      toast.error(err.response?.data?.message || "خطا در ایجاد تیکت");

      return null;
    } finally {
      setIsCreating(false);
    }
  };

  return {
    createTicket,
    isCreating,
  };
}
