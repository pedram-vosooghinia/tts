import { z } from "zod";

export const loginSchema = z.object({
  identifier: z.string().min(1, "ایمیل الزامی است").email("ایمیل معتبر وارد کنید"),
  password: z.string().min(8, "رمز عبور باید حداقل 8 کاراکتر باشد"),
});

export type LoginFormInputs = z.infer<typeof loginSchema>;
