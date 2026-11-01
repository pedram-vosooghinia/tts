import { z } from "zod";

export const registerSchema = z.object({
  first_name: z
    .string()
    .trim()
    .min(1, "نام الزامی است")
    .max(50, "نام نباید بیشتر از 50 کاراکتر باشد"),

  last_name: z
    .string()
    .trim()
    .min(1, "نام خانوادگی الزامی است")
    .max(100, "نام خانوادگی نباید بیشتر از 100 کاراکتر باشد"),

  mobile: z
    .string()
    .min(1, "شماره موبایل الزامی است")
    .regex(/^[0-9]+$/, "شماره موبایل فقط باید شامل عدد باشد")
    .regex(/^09\d{9}$/, "شماره موبایل باید 11 رقم باشد و با 09 شروع شود"),

  password: z
    .string()
    .min(8, "رمز عبور باید حداقل 8 کاراکتر باشد")
    .max(16, "رمز عبور نباید بیشتر از 16 کاراکتر باشد")
    .regex(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s])/,
      "رمز عبور باید شامل حرف بزرگ انگلیسی، عدد و کاراکتر خاص باشد"
    ),
});

export type RegisterFormData = z.infer<typeof registerSchema>;