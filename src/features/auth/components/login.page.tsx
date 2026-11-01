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
      <h1 className="text-3xl font-bold text-center">Login</h1>

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

        <div className="flex justify-between items-end gap-2">
          <div className="grid gap-2 w-full">
            <Label htmlFor="password">رمز عبور</Label>

            <Input
              id="password"
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="!@#$%^&*"
            />
          </div>

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="mb-2"
            aria-label={showPassword ? "مخفی کردن رمز عبور" : "نمایش رمز عبور"}
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>

        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}

        {/* Submit */}
        <Button type="submit" variant="secondary" disabled={isSubmitting}>
          {isSubmitting ? "در حال ورود..." : "ورود"}
        </Button>
      </form>

      <div className="mt-4 text-center text-sm gap-2 flex justify-center">
        <div>آیا هنوز ثبت نام نکرده اید؟</div>

        <Link href="/signin" className="underline">
          ثبت نام
        </Link>
      </div>
    </div>
  );
}
