"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LoadingModal from "@/components/MainComponents/LoadingModal";
import toast from "react-hot-toast";
import { addCustomersService } from "@/services/customers";
import { Customer } from "@/types/customer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function AddCustomer() {
  const [loading, setLoading] = useState(false);

  const form = useForm<Customer>({
    defaultValues: {
      customer_name: "",
      mobile: "",
      city: "",
      seller_name: "",
    },
  });

  const onSubmit = async (data: Customer) => {
    try {
      setLoading(true);
      const res = await addCustomersService(data);
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) return <LoadingModal />;

  return (
    <div className="m-4 ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="customer_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نام و نام خانوادگی مشتری</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mobile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>شماره موبایل</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>شهر یا شهرستان</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="seller_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>فروشنده</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="انتخاب فروشنده" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="rtl">
                    <SelectItem value="pedram">پدرام</SelectItem>
                    <SelectItem value="rasol">رسول</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">ارسال</Button>
        </form>
      </Form>
    </div>
  );
}