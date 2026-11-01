import { z } from "zod";

export const loginSchema = z.object({
  mobile: z
    .string()
    .min(1, "شماره موبایل الزامی است")
    .regex(/^[0-9]+$/, "شماره موبایل فقط باید شامل عدد باشد")
    .regex(/^09\d{9}$/, "شماره موبایل باید 11 رقم باشد و با 09 شروع شود"),

  password: z
    .string()
    .min(1, "رمز عبور نباید خالی باشد")
    .min(8, "رمز عبور باید حداقل 8 کاراکتر باشد")
    .max(16, "رمز عبور نباید بیشتر از 16 کاراکتر باشد"),
});

export type LoginFormData = z.infer<typeof loginSchema>;