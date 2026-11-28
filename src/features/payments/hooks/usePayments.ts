"use client";

import { useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import toast from "react-hot-toast";

import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import {
  createPaymentService,
  deletePaymentService,
  getPaymentService,
  getPaymentsService,
  updatePaymentService,
} from "../services/payments.services";
import type {
  CreatePaymentDto,
  Payment,
  UpdatePaymentDto,
} from "../types/payment.types";

export function usePayments() {
  const { data, error, isLoading, mutate } = useSWR<Payment[]>(
    "/payments",
    getPaymentsService,
  );

  return {
    payments: data ?? [],
    error,
    isLoading,
    mutate,
  };
}

export function usePayment(id: number | string | null) {
  const key = id !== null && id !== "" ? `/payments/${id}` : null;

  const { data, error, isLoading, mutate } = useSWR<Payment>(key, () =>
    getPaymentService(id as number | string),
  );

  return {
    payment: data ?? null,
    error,
    isLoading: !!key && isLoading,
    mutate,
  };
}

export function usePaymentMutations() {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { mutate } = useSWRConfig();

  const revalidatePayments = () =>
    mutate((key) => typeof key === "string" && key.startsWith("/payments"));

  const createPayment = async (data: CreatePaymentDto = {}) => {
    try {
      setIsCreating(true);
      await createPaymentService(data);
      await revalidatePayments();
      toast.success("پرداخت با موفقیت ثبت شد");
      return true;
    } catch (error) {
      toast.error(getApiErrorMessage(error, "خطا در ثبت پرداخت"));
      return false;
    } finally {
      setIsCreating(false);
    }
  };

  const updatePayment = async (
    id: number | string,
    data: UpdatePaymentDto = {},
  ) => {
    try {
      setIsUpdating(true);
      await updatePaymentService(id, data);
      await revalidatePayments();
      toast.success("پرداخت با موفقیت بروزرسانی شد");
      return true;
    } catch (error) {
      toast.error(getApiErrorMessage(error, "خطا در بروزرسانی پرداخت"));
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  const deletePayment = async (id: number | string) => {
    try {
      setIsDeleting(true);
      await deletePaymentService(id);
      await revalidatePayments();
      toast.success("پرداخت با موفقیت حذف شد");
      return true;
    } catch (error) {
      toast.error(getApiErrorMessage(error, "خطا در حذف پرداخت"));
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    createPayment,
    updatePayment,
    deletePayment,
    isCreating,
    isUpdating,
    isDeleting,
  };
}
