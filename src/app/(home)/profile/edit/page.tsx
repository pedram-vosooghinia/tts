"use client";

import Link from "next/link";
import { ChevronRight, UserRound } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/features/auth/hooks/useAuth";
import ProfileEditForm from "@/features/profile/components/ProfileEditForm";

function ProfileEditSkeleton() {
  return (
    <div className="space-y-5 p-5">
      {[0, 1, 2].map((item) => (
        <div key={item} className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-11 w-full rounded-lg" />
        </div>
      ))}
      <Skeleton className="h-11 w-full rounded-lg" />
    </div>
  );
}

export default function ProfileEditPage() {
  const { user, isLoading } = useAuth();

  return (
    <main dir="rtl" className="mx-auto flex w-full max-w-xl flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/profile"
          aria-label="بازگشت به پروفایل"
          className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <ChevronRight className="size-5" />
        </Link>

        <div className="min-w-0 flex-1">
          <h1 className="text-base font-bold text-foreground">
            ویرایش اطلاعات حساب
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            اطلاعات شخصی خود را مدیریت کنید
          </p>
        </div>

        {/* <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <UserRound className="size-5" />
        </div> */}
      </div>

      {/* Form */}
      <section className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="border-b border-border px-5 py-4">
          <h2 className="text-sm font-bold text-foreground">اطلاعات شخصی</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            نام خود را به‌روز کنید
          </p>
        </div>

        {isLoading ? (
          <ProfileEditSkeleton />
        ) : (
          <div className="p-5">
            <ProfileEditForm user={user} />
          </div>
        )}
      </section>
    </main>
  );
}
