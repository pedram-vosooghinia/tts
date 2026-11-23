"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Plus, RefreshCw } from "lucide-react";

import DataPagination from "@/components/shared/DataPagination";
import { Button } from "@/components/ui/button";
import AddressCard from "@/features/addresses/components/AddressCard";
import AddressDialog from "@/features/addresses/components/AddressDialog";
import { useAddresses } from "@/features/addresses/hooks/useAddresses";

const PAGE_SIZE = 10;

function AddressEmptyState({
  isAuthenticated,
  isError,
  onRetry,
}: {
  isAuthenticated: boolean;
  isError?: boolean;
  onRetry?: () => void;
}) {
  const title = isError
    ? "بارگذاری آدرس‌ها ناموفق بود"
    : isAuthenticated
      ? "هنوز آدرسی ثبت نکرده‌اید"
      : "برای مشاهده آدرس‌ها وارد حساب شوید";

  const description = isError
    ? "هنگام دریافت اطلاعات آدرس‌های شما مشکلی پیش آمد."
    : isAuthenticated
      ? "برای ثبت سفارش سریع‌تر، آدرس تحویل خود را اضافه کنید."
      : "برای مشاهده و مدیریت آدرس‌های خود ابتدا وارد حساب کاربری شوید.";

  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card px-5 py-12 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-muted">
        <MapPin className="size-6 text-muted-foreground" />
      </div>

      <div className="space-y-1">
        <h2 className="text-sm font-bold text-foreground">{title}</h2>
        <p className="max-w-xs text-xs leading-6 text-muted-foreground">
          {description}
        </p>
      </div>

      {isError ? (
        <Button type="button" variant="outline" onClick={onRetry}>
          <RefreshCw className="size-4" />
          تلاش مجدد
        </Button>
      ) : !isAuthenticated ? (
        <Button asChild>
          <Link href="/login">ورود به حساب کاربری</Link>
        </Button>
      ) : null}
    </div>
  );
}

export default function AddressesPage() {
  const [page, setPage] = useState(1);

  const { addresses, meta, isAuthenticated, isLoading, error, mutate } =
    useAddresses(page, PAGE_SIZE);

  return (
    <main
      dir="rtl"
      className="mx-auto mt-8 flex w-full max-w-3xl flex-col gap-6 pb-28"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <MapPin className="size-5" />
        </div>

        <div className="min-w-0 flex-1">
          <h1 className="text-base font-bold text-foreground">آدرس‌های من</h1>
          <p className="mt-1 text-xs text-muted-foreground">
            مدیریت آدرس‌های تحویل سفارش
          </p>
        </div>

        {isAuthenticated && (
          <AddressDialog>
            <Button type="button" size="sm">
              <Plus className="size-4" />
              آدرس جدید
            </Button>
          </AddressDialog>
        )}
      </div>

      {/* Content */}
      {!isAuthenticated ? (
        <AddressEmptyState isAuthenticated={false} />
      ) : error ? (
        <AddressEmptyState isAuthenticated isError onRetry={() => mutate()} />
      ) : addresses.length === 0 ? (
        <div className="flex flex-col gap-4">
          <AddressEmptyState isAuthenticated />

          <AddressDialog>
            <Button type="button" className="w-full">
              <Plus className="size-4" />
              ثبت اولین آدرس
            </Button>
          </AddressDialog>
        </div>
      ) : (
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-bold text-foreground">
              آدرس‌های ثبت‌شده
            </h2>

            {meta && (
              <span className="text-xs text-muted-foreground">
                {meta.total.toLocaleString("fa-IR")} آدرس
              </span>
            )}
          </div>

          <div className="flex flex-col gap-3">
            {addresses.map((address) => (
              <AddressCard key={address.id} address={address} />
            ))}
          </div>

          {meta && meta.totalPages > 1 && (
            <DataPagination
              page={meta.page}
              totalPages={meta.totalPages}
              total={meta.total}
              hasPreviousPage={meta.hasPreviousPage}
              hasNextPage={meta.hasNextPage}
              isLoading={isLoading}
              onPageChange={setPage}
            />
          )}
        </section>
      )}
    </main>
  );
}
