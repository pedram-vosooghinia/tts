"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { signInServices } from "@/services/auth";
import { Button } from "@/components/ui/button";
import { SignInFormInputs } from "@/types/signin";
import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";
import { signInSchema } from "@/validation/signinSchema";
export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignInFormInputs>({
    resolver: zodResolver(signInSchema),
  });
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const signInHandler = async (values: SignInFormInputs) => {
    console.log("va", values);
    try {
      signInServices(values);
      toast.success(
        "شما با موفقیت ثبت نام کرده اید، لطفا منتظر تایید مدیریت باشید"
      );
      reset();
    } catch {
      toast.error("ثبت نام ناموفق بود");
    }
  };

  return (
    <>
      <div className=" mx-auto grid w-[350px] gap-6 py-12">
        <h1 className="text-3xl font-bold text-center">SignIn</h1>

        <form className="grid gap-4" onSubmit={handleSubmit(signInHandler)}>
          <div className="grid gap-2">
            <Label htmlFor="username">نام</Label>

            <Input
              {...register("username", { required: true })}
              type="text"
              id="username"
              placeholder="نام"
              autoComplete="username"
              autoFocus
            />
            {errors.username && (
              <div className="text-red-500">{errors.username.message}</div>
            )}

            <Label htmlFor="family">نام خانوادگی</Label>

            <Input
              {...register("family", { required: true })}
              type="text"
              id="family"
              placeholder="نام"
              autoComplete="family"
              autoFocus
            />
            {errors.family && (
              <div className="text-red-500">{errors.family.message}</div>
            )}

            <Label htmlFor="email">ایمیل</Label>

            <Input
              {...register("email", { required: true })}
              type="text"
              id="email"
              autoComplete="email"
              placeholder="email@email.com"
            />
            {errors.email && (
              <div className="text-red-500">{errors.email.message}</div>
            )}

            <div className="flex justify-between items-end gap-2 ">
              <div className=" w-full ">
                <Label htmlFor="password">رمز عبور</Label>
                <Input
                  id="password"
                  {...register("password", {
                    required: "رمز عبور الزامی است",
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="!@#$%^&*"
                  autoFocus
                  autoComplete="password"
                />
              </div>

              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="mb-2"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {errors.password && (
              <div className="text-red-500">{errors.password.message}</div>
            )}
          </div>
          <div className="flex justify-between items-center">
            <Button variant="default" onClick={() => router.push("./")}>
              بازگشت
            </Button>
            <Button type="submit" variant="destructive">
              ثبت نام
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
