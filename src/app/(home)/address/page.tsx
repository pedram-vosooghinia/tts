"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Plus, RefreshCw } from "lucide-react";

import PageHeader from "@/components/shared/PageHeader";
import DataPagination from "@/components/shared/DataPagination";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import AddressCard from "@/features/addresses/components/AddressCard";
import AddressDialog from "@/features/addresses/components/AddressDialog";
import { useAddresses } from "@/features/addresses/hooks/useAddresses";

const PAGE_SIZE = 10;

export default function AddressesPage() {
  const [page, setPage] = useState(1);
  const { addresses, meta, isAuthenticated, isLoading, error, mutate } =
    useAddresses(page, PAGE_SIZE);

  return (
    <Container className="flex flex-col gap-6 pb-28">
      <div className="flex items-center justify-between gap-3">
        <PageHeader
          title="آدرس های من"
          description="آدرس های تحویل سفارش خود را مدیریت کنید"
        />

        <AddressDialog>
          <Button type="button">
            <Plus />
            آدرس جدید
          </Button>
        </AddressDialog>
      </div>

      {!isAuthenticated ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
            <MapPin className="h-10 w-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              برای مشاهده آدرس های خود وارد حساب کاربری شوید.
            </p>
            <Button asChild>
              <Link href="/login">ورود به حساب کاربری</Link>
            </Button>
          </CardContent>
        </Card>
      ) : error ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
            <p className="text-sm text-muted-foreground">
              خطایی در بارگذاری آدرس ها رخ داد.
            </p>
            <Button type="button" variant="outline" onClick={() => mutate()}>
              <RefreshCw />
              تلاش مجدد
            </Button>
          </CardContent>
        </Card>
      ) : addresses.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
            <MapPin className="h-10 w-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              هنوز آدرسی ثبت نکردهاید.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="flex flex-col gap-3">
            {addresses.map((address) => (
              <AddressCard key={address.id} address={address} />
            ))}
          </div>

          {meta && (
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
        </>
      )}
    </Container>
  );
}
