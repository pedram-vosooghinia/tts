"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Loader2, UserRound } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { User } from "@/types/user";

import { useUpdateProfile } from "../hooks/useUpdateProfile";
import {
  profileSchema,
  type ProfileFormData,
} from "../validation/profileSchema";

interface ProfileEditFormProps {
  user: User | null;
}

export default function ProfileEditForm({ user }: ProfileEditFormProps) {
  const { updateProfile, isUpdating } = useUpdateProfile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      mobile: "",
    },
  });

  useEffect(() => {
    if (!user) return;

    reset({
      first_name: user.first_name ?? "",
      last_name: user.last_name ?? "",
      mobile: user.mobile ?? "",
    });
  }, [user, reset]);

  const onSubmit = async (values: ProfileFormData) => {
    const updated = await updateProfile(values);

    if (updated) reset(values);
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center gap-4 px-5 py-10 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-muted">
          <UserRound className="size-6 text-muted-foreground" />
        </div>

        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-foreground">
            ورود به حساب کاربری
          </h3>
          <p className="max-w-xs text-xs leading-6 text-muted-foreground">
            برای ویرایش اطلاعات شخصی خود ابتدا وارد حساب کاربری شوید.
          </p>
        </div>

        <Button asChild className="w-full">
          <Link href="/login">ورود به حساب کاربری</Link>
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5"
      noValidate
    >
      <div className="grid gap-2">
        <Label htmlFor="first_name">نام</Label>
        <Input
          id="first_name"
          {...register("first_name")}
          placeholder="نام خود را وارد کنید"
          autoComplete="given-name"
          aria-invalid={!!errors.first_name}
        />
        {errors.first_name && (
          <p className="text-xs text-destructive">
            {errors.first_name.message}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="last_name">نام خانوادگی</Label>
        <Input
          id="last_name"
          {...register("last_name")}
          placeholder="نام خانوادگی خود را وارد کنید"
          autoComplete="family-name"
          aria-invalid={!!errors.last_name}
        />
        {errors.last_name && (
          <p className="text-xs text-destructive">{errors.last_name.message}</p>
        )}
      </div>

      <div className="mt-2 flex flex-col gap-3 border-t border-border pt-5">
        <Button
          type="submit"
          disabled={isUpdating || !isDirty}
          className="w-full"
        >
          {isUpdating && <Loader2 className="size-4 animate-spin" />}
          {isUpdating ? "در حال ذخیره..." : "ذخیره تغییرات"}
        </Button>

        <Button type="button" variant="outline" asChild className="w-full">
          <Link href="/profile">انصراف</Link>
        </Button>
      </div>
    </form>
  );
}
