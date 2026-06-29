"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addApartmentServices } from "@/services/apartment";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
/* ---------------- ZOD ---------------- */
import { ApartmentFormValues, apartmentFormSchema } from "./schema";

export default function UnitForm() {
  const form = useForm<ApartmentFormValues>({
    resolver: zodResolver(apartmentFormSchema),
    defaultValues: {
      zone: "",
      block: 0,
      direction: "",
      level: "",
      loanStatus: "",
      transferStatus: "",
      unitStatus: "",
      referrer: "",
      contact: "",
      arseStatus: "",
      price: 0,
    },
  });
  const onSubmit = async (data: ApartmentFormValues) => {
    try {
      const res = await addApartmentServices(data);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=" mx-auto space-y-6 rtl">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" flex flex-wrap gap-x-4 gap-y-2"
        >
          <FormField
            name="zone"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-80 mx-auto">
                <FormLabel>زون</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="انتخاب زون" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <SelectItem key={i} value={String(i)}>
                        زون {i}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="block"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-80 mx-auto">
                <FormLabel>بلوک</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="level"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-80 mx-auto">
                <FormLabel>طبقه</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="انتخاب طبقه" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(
                      (i) => (
                        <SelectItem key={i} value={String(i)}>
                          طبقه {i}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="direction"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-80 mx-auto">
                <FormLabel>جهت</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="انتخاب جهت" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {["جنوب شرقی", "جنوب غربی", "شمال غربی", "شمال شرقی"].map(
                      (i) => (
                        <SelectItem key={i} value={i}>
                          {i}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="loanStatus"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-80 mx-auto">
                <FormLabel>وام</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="وضعیت وام" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {["تسویه", "ندارد", "به روز"].map((i) => (
                      <SelectItem key={i} value={i}>
                        {i}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="arseStatus"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-80 mx-auto">
                <FormLabel>عرصه</FormLabel>

                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="وضعیت عرصه" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {["تسویه", "ندارد", "به روز"].map((i) => (
                      <SelectItem key={i} value={i}>
                        {i}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="transferStatus"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-80 mx-auto">
                <FormLabel>نقل و انتقال</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="وضعیت" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {["تسویه", "ندارد", "به روز"].map((i) => (
                      <SelectItem key={i} value={i}>
                        {i}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="unitStatus"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-80 mx-auto">
                <FormLabel>وضعیت واحد</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="وضعیت واحد" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {["ضامن", "خام", "فول معمولی", "فول خوب", "فول عالی"].map(
                      (i) => (
                        <SelectItem key={i} value={i}>
                          {i}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="price"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-80 mx-auto">
                <FormLabel>قیمت</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="contact"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-80 mx-auto">
                <FormLabel>شماره تماس</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="referrer"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-80 mx-auto">
                <FormLabel>معرف</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-80 mx-auto">
                <FormLabel>توضیحات</FormLabel>

                <FormControl>
                  <Textarea
                    placeholder="توضیحات بیشتر درباره واحد..."
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full text-white" type="submit">
            ثبت اطلاعات
          </Button>
        </form>
      </Form>
    </div>
  );
}
