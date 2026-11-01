import z from "zod";

export const apartmentFormSchema = z.object({
  zone: z.string().min(1, "زون را انتخاب کنید"),
  block: z.number().min(1, "شماره بلوک باید بیشتر از ۰ باشد"),
  level: z.string().min(1, "طبقه را انتخاب کنید"),
  direction: z.string().min(1, "جهت الزامی است"),
  vam: z.string().min(1, "وضعیت وام الزامی است"),
  arse: z.string().min(1, "وضعیت عرصه الزامی است"),
  naghoentegal: z.string().min(1, "وضعیت نقل و انتقال الزامی است"),
  vazieatvahed: z.string().min(1, "وضعیت واحد الزامی است"),
  referrer: z.string().min(1, "نام معرف را وارد کنید"),
  contact: z.string().min(10, "شماره تماس معتبر نیست"),
  price: z.number().min(1, "قیمت باید بیشتر از ۰ باشد"),
  description: z.string().optional(),
});
