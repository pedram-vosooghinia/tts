"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { loginServices } from "@/services/auth";
import toast from "react-hot-toast";
import useUserStore from "@/store/userStore";
import Cookies from "js-cookie";
import { getUserInfo } from "@/services/user";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
// import Link from "next/link";
export default function Login() {
  const { addToUser } = useUserStore();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormInputs>();
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async (values: LoginFormInputs) => {
    setIsSubmitting(true);
    try {
      const loginRes = await loginServices(values);
      if (loginRes.data.success) {
        const userRes = await getUserInfo();
        if (userRes.data.success) {
          const userData = userRes.data.data;
          addToUser(userData);
          Cookies.set("user", JSON.stringify(userData), {
            expires: 1,
            sameSite: "strict",
          });
          toast.success(userRes.data.message);
          router.push("/dashboard");
        } else {
          toast.error(userRes.data.message);
        }
      } else {
        toast.error(loginRes.data.message);
        reset();
      }
    } catch {
      toast.error("لطفا دوباره تلاش نمایید");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className=" mx-auto grid w-[350px] gap-6 py-12">
      <h1 className="text-3xl font-bold text-center">Login</h1>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="mobile">شماره موبایل</Label>
            <Input
              placeholder="9001002030"
              required
              {...register("mobile", {
                required: true,
                pattern: /^[0-9]{10}$/i,
              })}
              type="tel"
              className=" rtl"
              id="mobile"
              autoFocus
            />

            {errors.mobile && (
              <div className="text-red-500">{errors.mobile.message}</div>
            )}
          </div>
          <div className="flex justify-between items-end gap-2 ">
            <div className=" w-full ">
              <Label htmlFor="password">رمز عبور</Label>
              <Input
                id="password"
                required
                {...register("password", {
                  required: true,
                })}
                type={showPassword ? "text" : "password"}
                placeholder="رمز ورود"
                autoFocus
              />
            </div>
            <Button type="button" onClick={togglePasswordVisibility}>
              {showPassword ? <EyeOff /> : <Eye />}
            </Button>
          </div>
          <Button
            type="submit"
            className={`  ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "در حال ورود..." : "ورود"}
          </Button>
        </div>
      </form>
      <div className="mt-4 text-center text-sm gap-2 flex justify-center ">
        <div>آیا هنوز ثبت نام نکرده اید؟</div>
        {/* <Link href="/signin" className="underline">
          ثبت نام
        </Link> */}
      </div>
    </div>
  );
}
