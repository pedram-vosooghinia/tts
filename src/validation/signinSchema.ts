import { z } from "zod";

export const signInSchema = z.object({
  username: z.string().min(1, "نام الزامی است"),
  family: z.string().min(1, "نام خانوادگی الزامی است"),
  email: z.string().email("ایمیل معتبر وارد کنید"),
  password: z
    .string()
    .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد")
    .regex(/[A-Z]/, "رمز عبور باید حداقل یک حرف بزرگ داشته باشد")
    .regex(/[a-z]/, "رمز عبور باید حداقل یک حرف کوچک داشته باشد")
    .regex(/[0-9]/, "رمز عبور باید حداقل یک عدد داشته باشد")
    .regex(/[\W_]/, "رمز عبور باید حداقل یک کاراکتر خاص داشته باشد"), 
});

export type SignInFormInputs = z.infer<typeof signInSchema>;
