"use client";

import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowRight,
  Loader2,
  MapPin,
  Pencil,
  RefreshCw,
  Trash2,
} from "lucide-react";

import PageHeader from "@/components/shared/PageHeader";
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
import { Container } from "@/components/ui/container";
import { useAddress } from "@/features/addresses/hooks/useAddress";
import { useDeleteAddress } from "@/features/addresses/hooks/useDeleteAddress";
import AddressDialog from "@/features/addresses/components/AddressDialog";

export default function AddressDetailsPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const isValidId = Number.isFinite(id) && id > 0;

  const router = useRouter();
  const { address, isAuthenticated, isLoading, error, mutate } = useAddress(id);
  const { deleteAddress, isDeleting } = useDeleteAddress();

  if (!isValidId) {
    return (
      <Container className="pb-28">
        <p className="py-10 text-center text-sm text-muted-foreground">
          آدرس مورد نظر یافت نشد.
        </p>
      </Container>
    );
  }

  if (!isAuthenticated || error || !address) {
    return (
      <Container className="pb-28">
        <Card>
          <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
            <p className="text-sm text-muted-foreground">
              {!isAuthenticated
                ? "برای مشاهده جزئیات آدرس وارد حساب کاربری شوید."
                : "خطایی در بارگذاری جزئیات آدرس رخ داد."}
            </p>
            <div className="flex gap-2">
              {isAuthenticated && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => mutate()}
                >
                  <RefreshCw />
                  تلاش مجدد
                </Button>
              )}
              <Button asChild>
                <Link href="/address">بازگشت به آدرس ها</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </Container>
    );
  }

  const handleDelete = async () => {
    const deleted = await deleteAddress(address.id);
    if (deleted) router.replace("/address");
  };

  const fields = [
    { label: "استان", value: address.privince },
    { label: "شهر", value: address.city },
    { label: "آدرس کامل", value: address.address },
    { label: "موبایل تحویل گیرنده", value: address.reciver_mobile },
    { label: "کد پستی", value: address.postal_code },
    { label: "توضیحات", value: address.description },
  ];

  return (
    <Container className="flex flex-col gap-6 pb-28">
      <PageHeader title={`آدرس شماره ${address.id}`} />

      <Card>
        <CardContent className="flex flex-col gap-3 p-4">
          <div className="flex items-center gap-2 font-semibold">
            <MapPin className="h-4 w-4 text-primary" />
            جزئیات آدرس
          </div>

          {fields.map((field) => (
            <div
              key={field.label}
              className="flex justify-between gap-4 text-sm"
            >
              <span className="shrink-0 text-muted-foreground">
                {field.label}
              </span>
              <span className="text-left">{field.value || "—"}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <AddressDialog address={address}>
          <Button type="button" variant="outline">
            <Pencil />
            ویرایش
          </Button>
        </AddressDialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button type="button" variant="destructive">
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
              <AlertDialogAction onClick={handleDelete}>حذف</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <Button asChild variant="ghost">
        <Link href="/address">
          بازگشت به آدرس ها
          <ArrowRight />
        </Link>
      </Button>
    </Container>
  );
}
