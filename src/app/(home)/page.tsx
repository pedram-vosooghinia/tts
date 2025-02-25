"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
// import { loginServices, tokenServices } from "@/services/auth";
import { tokenServices } from "@/services/auth";
import toast from "react-hot-toast";
import useUserStore from "@/store/userStore";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { LoginFormInputs } from "@/types/login";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/validation/loginSchema";
export default function Login() {
  const { addToUser } = useUserStore();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user_const = [
    {
      username: "pedram",
      email: "pedram",
      password: "12345678",
      family: "vosooghinia",
      user_role: "manager",
    },
    {
      username: "rasol",
      email: "rasol",
      password: "12345678",
      family: "rezai",
      user_role: "admin",
    },
    {
      username: "milad",
      email: "milad",
      password: "12345678",
      family: "kiani",
      user_role: "admin",
    },
  ];
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const handleLogin = async (values: LoginFormInputs) => {
    setIsSubmitting(true);
    try {
      // const loginRes = await loginServices(values);
      // console.log("loginRes",loginRes)
      // const userData = loginRes.data.user;
      const userData = user_const.find(
        (user) =>
          user.email === values.identifier && user.password === values.password
      );
      if (!userData) {
        throw new Error("کاربر یافت نشد");
      }
      addToUser(userData);
      Cookies.set("user", JSON.stringify(userData), {
        expires: 1,
        sameSite: "strict",
      });
      // const jwtToken = loginRes.data.jwt;
      const jwtToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjM0NTY3ODkwIiwibmFtZSI6Ik1pbGFkIEtpYW5pIiwiaWF0IjoxNjE2MjY3MjAwLCJleHBpcmF0aW9uIjoxNjE2MjY3ODAwfQ.8cV5Xq3wzTg3YgM3z7H0n1J7D_5Z1F5j7XgD9qA3e3c"; // توکن فرضی

      await tokenServices(jwtToken);

      toast.success("شما با موفقیت وارد شدید");
      router.push("/dashboard");
    } catch {
      toast.error("لطفا دوباره تلاش نمایید");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className=" mx-auto grid w-[350px] gap-6 py-12">
      <h1 className="text-3xl font-bold text-center">Login</h1>
      <form onSubmit={handleSubmit(handleLogin)} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="identifier">ایمیل</Label>
          <Input
            placeholder="login@gmail.com"
            {...register("identifier")}
            type="text"
            className=" rtl"
            id="identifier"
            autoComplete="username"
          />

          {errors.identifier && (
            <div className="text-red-500">{errors.identifier.message}</div>
          )}
        </div>
        <div className="flex justify-between items-end gap-2 ">
          <div className=" w-full ">
            <Label htmlFor="password">رمز عبور</Label>
            <Input
              id="password"
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="!@#$%^&*"
              autoComplete="current-password"
              autoFocus
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
        <Button
          type="submit"
          className={`  ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "در حال ورود..." : "ورود"}
        </Button>
      </form>
      <div className="mt-4 text-center text-sm gap-2 flex justify-center ">
        <div>آیا هنوز ثبت نام نکرده اید؟</div>
        <Link href="/signin" className="underline">
          ثبت نام
        </Link>
      </div>
    </div>
  );
}
