"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import BreadcrumbMain from "@/components/shared/BreadcrumbMain";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import PaymentDialog from "@/features/payments/components/PaymentDialog";
import PaymentsTable from "@/features/payments/components/PaymentsTable";
import { usePayments } from "@/features/payments/hooks/usePayments";
import type { Payment } from "@/features/payments/types/payment.types";

export default function DashboardPaymentsPage() {
  const { payments, isLoading } = usePayments();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null);

  return (
    <div className="space-y-6">
      <BreadcrumbMain
        items={[
          { label: "داشبورد", href: "/dashboard" },
          { label: "پرداخت‌ها" },
        ]}
      />

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <PageHeader
          title="مدیریت پرداخت‌ها"
          description="مشاهده، ثبت، ویرایش و حذف تراکنش‌های پرداخت"
        />

        <Button
          onClick={() => {
            setEditingPayment(null);
            setDialogOpen(true);
          }}
        >
          <Plus className="ml-2 h-4 w-4" />
          ثبت پرداخت جدید
        </Button>
      </div>

      <PaymentsTable
        payments={payments}
        isLoading={isLoading}
        onEdit={(payment) => {
          setEditingPayment(payment);
          setDialogOpen(true);
        }}
      />

      <PaymentDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        payment={editingPayment}
      />
    </div>
  );
}
