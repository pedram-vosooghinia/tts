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
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  async function submitHandler({ mobile, password }: LoginFormInputs) {
    const values = { mobile, password };
    console.log("mobile",mobile)
    console.log("password",password)
    setIsSubmitting(true);
    try {
      const res = await loginServices(values);
      const status = res.data.success;
      const message = res.data.message;
    toast(message)
      if (status == true) {
        try {
          const res = await getUserInfo();
          console.log("res", res)
          if (res.data && res.data.success) {
            const userData = res.data.data;
            addToUser(userData);
            Cookies.set("user", JSON.stringify(userData), {
              expires: 1,
              sameSite: "strict",
            });
            router.push("/dashboard");
          } else {
            toast.error("کاربری با این مشخصات وجود ندارد");
          }
        } catch {
          toast.error("خطا:");
        }
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
        reset();
      }
    } catch {
      toast.error("لطفا دوباره تلاش نمایید");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className=" mx-auto grid w-[350px] gap-6 py-12">
      <h1 className="text-3xl font-bold text-center">Login</h1>
      <form onSubmit={handleSubmit(submitHandler)}>
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
              <div className="text-red-500">
                لطفاً شماره تماس را بدون صفر وارد کنید
              </div>
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
