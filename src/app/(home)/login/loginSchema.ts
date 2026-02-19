import * as yup from "yup";

export const loginSchema = yup.object({
  mobile: yup
    .string()
    .required("شماره موبایل الزامی است")
    .matches(/^[0-9]+$/, "شماره موبایل فقط باید شامل عدد باشد")
    .matches(/^09\d{9}$/, "شماره موبایل نامعتبر است"),
  password: yup
    .string()
    .required("رمز عبور الزامی است")
    .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),
});
