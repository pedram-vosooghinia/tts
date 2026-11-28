"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { useCategories } from "@/features/categories/hooks/useCategories";

import type { CreateProductDto, Product } from "../types/products.types";

const productSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "عنوان محصول باید حداقل ۲ کاراکتر باشد")
    .max(200, "عنوان محصول نباید بیشتر از ۲۰۰ کاراکتر باشد"),
  description: z
    .string()
    .trim()
    .min(2, "توضیحات محصول الزامی است")
    .max(4000, "توضیحات نمی‌تواند بیشتر از ۴۰۰۰ کاراکتر باشد"),
  price: z
    .number({ message: "قیمت معتبر وارد کنید" })
    .min(0, "قیمت نمی‌تواند منفی باشد"),
  stock: z
    .number({ message: "موجودی معتبر وارد کنید" })
    .min(0, "موجودی نمی‌تواند منفی باشد"),
  categoryId: z
    .number({ message: "انتخاب دسته‌بندی الزامی است" })
    .int()
    .min(1, "لطفاً یک دسته‌بندی انتخاب کنید"),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  product?: Product | null;
  isSubmitting: boolean;
  onSubmit: (data: CreateProductDto) => Promise<boolean>;
  onCancel: () => void;
}

function getInitialCategoryId(product?: Product | null): number {
  if (!product) return 0;
  return product.categoryId ?? product.category?.id ?? product.categories?.[0]?.id ?? 0;
}

export default function ProductForm({
  product,
  isSubmitting,
  onSubmit,
  onCancel,
}: ProductFormProps) {
  const { categories, isLoading: isLoadingCategories } = useCategories();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: product?.title ?? "",
      description: product?.description ?? "",
      price: product?.price ?? 0,
      stock: product?.stock ?? 0,
      categoryId: getInitialCategoryId(product),
    },
  });

  useEffect(() => {
    form.reset({
      title: product?.title ?? "",
      description: product?.description ?? "",
      price: product?.price ?? 0,
      stock: product?.stock ?? 0,
      categoryId: getInitialCategoryId(product),
    });
  }, [product, form]);

  const handleSubmit = async (values: ProductFormValues) => {
    const success = await onSubmit({
      title: values.title,
      description: values.description,
      price: values.price,
      stock: values.stock,
      categoryId: values.categoryId,
    });

    if (success) {
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>عنوان محصول</FormLabel>
              <FormControl>
                <Input placeholder="مثلاً گوشی آیفون ۱۶" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>قیمت (تومان)</FormLabel>
                <FormControl>
                  <Input
                    dir="ltr"
                    type="number"
                    min={0}
                    placeholder="75000"
                    value={field.value}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === "" ? 0 : Number(e.target.value),
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>موجودی</FormLabel>
                <FormControl>
                  <Input
                    dir="ltr"
                    type="number"
                    min={0}
                    placeholder="10"
                    value={field.value}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === "" ? 0 : Number(e.target.value),
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>دسته‌بندی</FormLabel>
              <Select
                disabled={isLoadingCategories}
                value={field.value > 0 ? String(field.value) : ""}
                onValueChange={(value) => field.onChange(Number(value))}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        isLoadingCategories
                          ? "در حال دریافت دسته‌بندی‌ها..."
                          : "انتخاب دسته‌بندی"
                      }
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={String(cat.id)}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                  placeholder="توضیحات و ویژگی‌های محصول را وارد کنید..."
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            disabled={isSubmitting}
            onClick={onCancel}
          >
            انصراف
          </Button>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
            {isSubmitting
              ? "در حال ذخیره..."
              : product
                ? "ذخیره تغییرات"
                : "ثبت محصول"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
