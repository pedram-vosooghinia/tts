"use client";

import Link from "next/link";
import { Loader2, MapPin, Pencil, Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { useDeleteAddress } from "../hooks/useDeleteAddress";
import type { Address } from "../types/address.types";
import AddressDialog from "./AddressDialog";

interface AddressCardProps {
  address: Address;
}

export default function AddressCard({ address }: AddressCardProps) {
  const { deleteAddress, isDeleting } = useDeleteAddress();

  const title = [address.privince, address.city].filter(Boolean).join("، ");

  return (
    <Card>
      <CardContent className="flex flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <Link
            href={`/address/${address.id}`}
            className="flex items-center gap-2 font-semibold hover:underline"
          >
            <MapPin className="h-4 w-4 shrink-0 text-primary" />
            <span className="line-clamp-1">{title || `آدرس شماره ${address.id}`}</span>
          </Link>

          <span className="shrink-0 text-xs text-muted-foreground">
            #{address.id}
          </span>
        </div>

        <p className="text-sm text-muted-foreground">
          {address.address || "آدرسی ثبت نشده است"}
        </p>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          {address.reciver_mobile && <span>{address.reciver_mobile}</span>}
          {address.postal_code && <span>کد پستی: {address.postal_code}</span>}
        </div>

        {address.description && (
          <p className="text-xs text-muted-foreground">{address.description}</p>
        )}

        <div className="flex gap-2">
          <AddressDialog address={address}>
            <Button type="button" variant="outline" size="sm">
              <Pencil />
              ویرایش
            </Button>
          </AddressDialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button type="button" variant="outline" size="sm">
                {isDeleting ? <Loader2 className="animate-spin" /> : <Trash2 />}
                حذف
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>حذف آدرس</AlertDialogTitle>
                <AlertDialogDescription>
                  آیا مطمئن هستید که میخواهید این آدرس حذف شود؟
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>انصراف</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteAddress(address.id)}>
                  حذف
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}
