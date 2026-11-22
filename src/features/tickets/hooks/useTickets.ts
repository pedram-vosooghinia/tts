"use client";

import useSWR from "swr";
import type { Ticket } from "../types/ticket.types";

export function useTickets() {
  const { data, error, isLoading, mutate } = useSWR<Ticket[]>("/tickets");

  return {
    tickets: data ?? [],
    error,
    isLoading,
    mutate,
  };
}
