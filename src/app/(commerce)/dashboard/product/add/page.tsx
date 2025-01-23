"use client";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LoadingModal from "@/components/MainComponents/LoadingModal";
import toast from "react-hot-toast";
import ImageUploader from "@/components/PComponent/form/ImageUploader";
import { postProductService } from "@/services/product";
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

import { ProductAddProp } from "@/components/dashboard/product/type";
export default function AddPrimery() {
  const [loading, setLoading] = useState(false);
 

  const form = useForm<ProductAddProp>({
    defaultValues: {
      product_name: "",
      brand: "",
      category: "",
      sale_type: "",
      description: "",
      price: 0,
      files: [],
    },
  });

  const handleFilesChange = (files: File[]) => {
    form.setValue("files", [...form.getValues("files"), ...files]);
  };
  const onSubmit = async (data: ProductAddProp) => {
    console.log(data);

    try {
      setLoading(true);
        await postProductService(data);
      toast.success("محصول با موفقیت ثبت شد");
    } catch (error) {
      toast.error("خطایی رخ داد");
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
            name="product_name"
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
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>برند</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="انتخاب برند" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="rtl">
                    <SelectItem value="rain.g">rain.g</SelectItem>
                    <SelectItem value="hebe">hebe</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>دسته بندی</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="انتخاب دسته بندی" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="rtl">
                    <SelectItem value="clear_product">لوازم شوینده</SelectItem>
                    <SelectItem value="cit_cluch">دیسک و صفحه</SelectItem>
                  </SelectContent>
                </Select>
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
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>توضیحات</FormLabel>
                <FormControl>
                  <Textarea
                    className=" h-36"
                    {...field}
                    placeholder="توضیحات محصول را وارد کنید"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="files"
            render={() => (
              <FormItem>
                <ImageUploader onFilesChange={handleFilesChange} />
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
