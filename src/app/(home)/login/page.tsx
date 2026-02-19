"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { loginSchema } from "@/app/(home)/login/loginSchema";
import { useFormik } from "formik";
import { useLogin } from "@/hooks/useLogin";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useLogin();
  const formik = useFormik({
    initialValues: {
      mobile: "",
      password: "",
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await login(values);
      } finally {
        setSubmitting(false);
      }
    },
    validationSchema: loginSchema,
  });
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className=" mx-auto grid w-[350px] gap-6 py-12">
      <h1 className="text-3xl font-bold text-center">Login</h1>
      <form onSubmit={formik.handleSubmit} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="mobile">موبایل</Label>
          <Input
            name="mobile"
            value={formik.values.mobile}
            placeholder="09123456789"
            type="text"
            className="rtl"
            inputMode="numeric"
            onBlur={formik.handleBlur}
            autoFocus
            onChange={(e) => {
              const value = e.target.value;

              if (/^[0-9]*$/.test(value) && value.length <= 11) {
                formik.setFieldValue("mobile", value);
              }
            }}
          />

          {formik.touched.mobile && formik.errors.mobile && (
            <div className="text-red-500">{formik.errors.mobile}</div>
          )}
        </div>
        <div className="flex justify-between items-end gap-2 ">
          <div className="grid gap-2 w-full ">
            <Label htmlFor="password">رمز عبور</Label>
            <Input
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              type={showPassword ? "text" : "password"}
              placeholder="!@#$%^&*"
              autoFocus
              onBlur={formik.handleBlur}
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
        {formik.touched.password && formik.errors.password && (
          <div className="text-red-500">{formik.errors.password}</div>
        )}

        <Button
          type="submit"
          variant="secondary"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "در حال ورود..." : "ورود"}
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
