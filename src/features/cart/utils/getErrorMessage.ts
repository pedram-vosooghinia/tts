import { AxiosError } from "axios";

export function getCartErrorMessage(error: unknown, fallback: string): string {
  const err = error as AxiosError<{ message?: string | string[] }>;
  const message = err.response?.data?.message;

  if (Array.isArray(message)) return message.join("، ");

  return message || fallback;
}
