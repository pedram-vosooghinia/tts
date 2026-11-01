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
  loginSchema,
  LoginFormData,
} from "@/features/auth/validation/loginSchema";
import { useLogin } from "@/features/auth/hooks/useLogin";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useLogin();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      mobile: "",
      password: "",
    },
  });

  const mobile = useWatch({
    control,
    name: "mobile",
  });
  const onSubmit = async (values: LoginFormData) => {
    await login(values);
  };

  return (
    <div className="mx-auto grid w-[350px] gap-6 py-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold">ورود</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          برای ورود به حساب کاربری اطلاعات زیر را وارد کنید.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="mobile">موبایل</Label>

          <Input
            id="mobile"
            {...register("mobile")}
            value={mobile}
            placeholder="09123456789"
            type="text"
            className="rtl"
            inputMode="numeric"
            autoFocus
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
            aria-label={showPassword ? "مخفی کردن رمز عبور" : "نمایش رمز عبور"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}

        <Button type="submit" variant="secondary" disabled={isSubmitting}>
          {isSubmitting ? "در حال ورود..." : "ورود"}
        </Button>
      </form>

      <div className="flex justify-center items-center mt-4 text-center text-sm gap-2 w-full ">
        <div>آیا هنوز ثبت نام نکرده اید؟</div>

        <Button variant="link">
          <Link href="/register">ثبت نام</Link>
        </Button>
      </div>
    </div>
  );
}
