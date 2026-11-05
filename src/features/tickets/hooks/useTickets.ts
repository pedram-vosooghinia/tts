"use client";

import useSWR from "swr";
import { getTicketsService } from "../services/tickets.services";
import type { Ticket } from "../types/ticket.types";

export function useTickets() {
  const { data, error, isLoading, mutate } = useSWR<Ticket[]>(
    "/tickets",
    getTicketsService,
  );

  return {
    tickets: data ?? [],
    error,
    isLoading,
    mutate,
  };
}
