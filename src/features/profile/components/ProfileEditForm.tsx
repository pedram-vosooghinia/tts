"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Loader2, UserRound } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
      <Card>
        <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
          <UserRound className="size-10 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            برای ویرایش اطلاعات حساب کاربری خود ابتدا وارد شوید.
          </p>
          <Button asChild>
            <Link href="/login">ورود به حساب کاربری</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5" noValidate>
          <div className="grid gap-2">
            <Label htmlFor="first_name">نام</Label>
            <Input
              id="first_name"
              {...register("first_name")}
              placeholder="نام خود را وارد کنید"
              autoComplete="given-name"
            />
            {errors.first_name && (
              <p className="text-sm text-red-500">{errors.first_name.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="last_name">نام خانوادگی</Label>
            <Input
              id="last_name"
              {...register("last_name")}
              placeholder="نام خانوادگی خود را وارد کنید"
              autoComplete="family-name"
            />
            {errors.last_name && (
              <p className="text-sm text-red-500">{errors.last_name.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="mobile">شماره موبایل</Label>
            <Input
              id="mobile"
              {...register("mobile")}
              type="text"
              inputMode="numeric"
              dir="ltr"
              maxLength={11}
              className="text-left"
              placeholder="09123456789"
              autoComplete="tel"
            />
            {errors.mobile && (
              <p className="text-sm text-red-500">{errors.mobile.message}</p>
            )}
          </div>

          <div className="mt-2 flex items-center gap-3">
            <Button type="submit" disabled={isUpdating || !isDirty}>
              {isUpdating && <Loader2 className="animate-spin" />}
              {isUpdating ? "در حال ذخیره..." : "ذخیره تغییرات"}
            </Button>

            <Button type="button" variant="ghost" asChild>
              <Link href="/profile">انصراف</Link>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
