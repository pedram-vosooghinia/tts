"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LoadingModal from "@/components/MainComponents/LoadingModal";
import toast from "react-hot-toast";
import { addProductService } from "@/services/product";
import { Product } from "@/types/product";
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

export default function AddProduct() {
  const [loading, setLoading] = useState(false);

  const form = useForm<Product>({
    defaultValues: {
      name: "",
      sale_type: "",
      price: 0,
    },
  });


  const onSubmit = async (data: Product) => {
    try {
      setLoading(true);
      const res = await addProductService(data);
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نام محصول</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
     

          <FormField
            control={form.control}
            name="sale_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نوع فروش</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="نوع فروش" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="rtl">
                    <SelectItem value="omde">عمده</SelectItem>
                    <SelectItem value="tak">تک</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>قیمت</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
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
