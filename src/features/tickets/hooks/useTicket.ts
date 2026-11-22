"use client";

import useSWR from "swr";
import type { Ticket } from "../types/ticket.types";

export function useTicket(id: number | null) {
  const { data, error, isLoading, mutate } = useSWR<Ticket>(
    id ? `/tickets/${id}` : null,
  );

  return {
    ticket: data,
    error,
    isLoading,
    mutate,
  };
}
