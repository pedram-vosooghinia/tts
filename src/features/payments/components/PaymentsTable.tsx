"use client";

import { useState } from "react";
import { Eye, Loader2, Pencil, Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { usePaymentMutations } from "../hooks/usePayments";
import type { Payment } from "../types/payment.types";
import PaymentDetailsDialog from "./PaymentDetailsDialog";

interface PaymentsTableProps {
  payments: Payment[];
  isLoading: boolean;
  onEdit: (payment: Payment) => void;
}

export default function PaymentsTable({
  payments,
  isLoading,
  onEdit,
}: PaymentsTableProps) {
  const [selectedId, setSelectedId] = useState<number | string | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [paymentToDelete, setPaymentToDelete] = useState<Payment | null>(null);
  const { deletePayment, isDeleting } = usePaymentMutations();

  const handleDelete = async () => {
    if (!paymentToDelete) return;
    const success = await deletePayment(paymentToDelete.id);
    if (success) {
      setPaymentToDelete(null);
    }
  };

  if (isLoading) {
    return (
      <div className="py-10 text-center text-muted-foreground">
        در حال دریافت پرداخت‌ها...
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">شناسه</TableHead>
              <TableHead className="text-right">مبلغ</TableHead>
              <TableHead className="text-right">وضعیت</TableHead>
              <TableHead className="text-right">سفارش / مرجع</TableHead>
              <TableHead className="text-right">تاریخ</TableHead>
              <TableHead className="text-center">عملیات</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {payments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  پرداختی ثبت نشده است.
                </TableCell>
              </TableRow>
            ) : (
              payments.map((payment) => {
                const dateValue = payment.created_at ?? payment.createdAt;
                return (
                  <TableRow key={String(payment.id)}>
                    <TableCell>#{String(payment.id)}</TableCell>
                    <TableCell className="tabular-nums font-medium">
                      {typeof payment.amount === "number"
                        ? `${payment.amount.toLocaleString("fa-IR")} تومان`
                        : "-"}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {payment.status ? String(payment.status) : "نامشخص"}
                      </Badge>
                    </TableCell>
                    <TableCell dir="ltr" className="text-right text-muted-foreground">
                      {payment.refId ??
                        payment.authority ??
                        (payment.orderId ? `Order #${payment.orderId}` : "-")}
                    </TableCell>
                    <TableCell>
                      {dateValue
                        ? new Date(String(dateValue)).toLocaleDateString(
                            "fa-IR",
                          )
                        : "-"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedId(payment.id);
                            setDetailsOpen(true);
                          }}
                          title="مشاهده جزئیات"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEdit(payment)}
                          title="ویرایش"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => setPaymentToDelete(payment)}
                          title="حذف"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      <PaymentDetailsDialog
        paymentId={selectedId}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />

      <AlertDialog
        open={!!paymentToDelete}
        onOpenChange={(open) => {
          if (!open && !isDeleting) {
            setPaymentToDelete(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>حذف پرداخت</AlertDialogTitle>
            <AlertDialogDescription>
              آیا از حذف پرداخت #{String(paymentToDelete?.id ?? "")} اطمینان
              دارید؟
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>انصراف</AlertDialogCancel>
            <AlertDialogAction
              disabled={isDeleting}
              onClick={(event) => {
                event.preventDefault();
                handleDelete();
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
              حذف پرداخت
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
