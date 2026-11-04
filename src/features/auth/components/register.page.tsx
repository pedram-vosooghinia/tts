"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import {
  registerSchema,
  RegisterFormData,
} from "@/features/auth/validation/registerSchema";

import { useSignIn } from "@/features/auth/hooks/useSignIn";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  const { signIn } = useSignIn();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      mobile: "",
      password: "",
    },
  });

  const mobile = useWatch({
    control,
    name: "mobile",
  });

  const onSubmit = async (values: RegisterFormData) => {
    await signIn(values);
  };

  return (
    <div className="mx-auto grid w-full max-w-[350px] gap-6 py-12" dir="rtl">
      <div className="text-center">
        <h1 className="text-3xl font-bold">ثبت‌نام</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          برای ساخت حساب کاربری اطلاعات زیر را وارد کنید.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        {/* First Name */}
        <div className="grid gap-2">
          <Label htmlFor="first_name">نام</Label>

          <Input
            id="first_name"
            {...register("first_name")}
            placeholder="پدرام"
            autoComplete="given-name"
          />

          {errors.first_name && (
            <p className="text-sm text-red-500">{errors.first_name.message}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="grid gap-2">
          <Label htmlFor="last_name">نام خانوادگی</Label>

          <Input
            id="last_name"
            {...register("last_name")}
            placeholder="وثوقی"
            autoComplete="family-name"
          />

          {errors.last_name && (
            <p className="text-sm text-red-500">{errors.last_name.message}</p>
          )}
        </div>

        {/* Mobile */}
        <div className="grid gap-2">
          <Label htmlFor="mobile">شماره موبایل</Label>

          <Input
            id="mobile"
            {...register("mobile")}
            value={mobile}
            placeholder="09123456789"
            type="text"
            inputMode="numeric"
            maxLength={11}
            autoComplete="tel"
            dir="ltr"
            onChange={(e) => {
              const value = e.target.value;

              if (/^[0-9]*$/.test(value) && value.length <= 11) {
                setValue("mobile", value, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }
            }}
          />

          {errors.mobile && (
            <p className="text-sm text-red-500">{errors.mobile.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="grid gap-2">
          <Label htmlFor="password">رمز عبور</Label>

          <div className="relative">
            <Input
              id="password"
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="رمز عبور خود را وارد کنید"
              autoComplete="new-password"
              dir="ltr"
              className="pr-10"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 inset-y-0 flex items-center justify-center text-muted-foreground"
              aria-label={
                showPassword ? "مخفی کردن رمز عبور" : "نمایش رمز عبور"
              }
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}

          <p className="text-xs text-muted-foreground">
            رمز عبور باید ۸ تا ۱۶ کاراکتر و شامل حرف بزرگ انگلیسی، عدد و کاراکتر
            خاص باشد.
          </p>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          variant="secondary"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? "در حال ثبت‌نام..." : "ثبت‌نام"}
        </Button>
      </form>

      <div className="flex justify-center items-center mt-4 text-center text-sm gap-2 w-full ">
        <span>قبلاً ثبت‌نام کرده‌اید؟</span>
        <Button variant="link">
          <Link href="/login" className="underline">
            ورود به حساب
          </Link>
        </Button>
      </div>
    </div>
  );
}
