import { z } from "zod";

export const loginSchema = z.object({
  mobile: z
    .string()
    .min(1, "شماره موبایل الزامی است")
    .regex(/^[0-9]+$/, "شماره موبایل فقط باید شامل عدد باشد")
    .regex(/^09\d{9}$/, "شماره موبایل نامعتبر است"),

  password: z
    .string()
    .min(1, "رمز عبور الزامی است")
    .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),
});