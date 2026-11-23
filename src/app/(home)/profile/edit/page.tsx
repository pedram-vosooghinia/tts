"use client";

import Link from "next/link";

import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/features/auth/hooks/useAuth";
import ProfileEditForm from "@/features/profile/components/ProfileEditForm";

function ProfileEditSkeleton() {
  return (
    <div className="animate-pulse space-y-4 rounded-lg border border-neutral-200 p-6">
      {[0, 1, 2].map((item) => (
        <div key={item} className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
      <Skeleton className="h-10 w-32" />
    </div>
  );
}

export default function ProfileEditPage() {
  const { user, isLoading } = useAuth();

  return (
    <main dir="rtl" className="mx-auto flex w-full max-w-xl flex-col gap-6 px-4 py-10">
      <div className="flex items-center justify-between gap-3">
        <PageHeader
          title="ویرایش اطلاعات حساب"
          description="نام، نام خانوادگی و شماره موبایل خود را بهروز کنید."
        />

        <Button asChild variant="ghost" size="sm">
          <Link href="/profile">بازگشت</Link>
        </Button>
      </div>

      {isLoading ? <ProfileEditSkeleton /> : <ProfileEditForm user={user} />}
    </main>
  );
}
