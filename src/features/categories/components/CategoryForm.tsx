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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import type { Category, CreateCategoryDto } from "../types/category.types";

const categorySchema = z.object({
  name: z
    .string()
    .min(2, "نام دسته‌بندی باید حداقل ۲ کاراکتر باشد")
    .max(100, "نام دسته‌بندی نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد"),

  slug: z
    .string()
    .min(1, "اسلاگ الزامی است")
    .max(120, "اسلاگ نمی‌تواند بیشتر از ۱۲۰ کاراکتر باشد")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "اسلاگ باید شامل حروف کوچک انگلیسی، اعداد و خط تیره باشد",
    ),

  description: z
    .string()
    .max(2000, "توضیحات نمی‌تواند بیشتر از ۲۰۰۰ کاراکتر باشد")
    .optional(),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

interface CategoryFormProps {
  category?: Category | null;
  isSubmitting: boolean;
  onSubmit: (data: CreateCategoryDto) => Promise<boolean>;
  onCancel: () => void;
}

export default function CategoryForm({
  category,
  isSubmitting,
  onSubmit,
  onCancel,
}: CategoryFormProps) {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name ?? "",
      slug: category?.slug ?? "",
      description: category?.description ?? "",
    },
  });

  useEffect(() => {
    form.reset({
      name: category?.name ?? "",
      slug: category?.slug ?? "",
      description: category?.description ?? "",
    });
  }, [category, form]);

  const handleSubmit = async (values: CategoryFormValues) => {
    const success = await onSubmit({
      name: values.name,
      slug: values.slug,
      description: values.description?.trim() || null,
    });

    if (success) {
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام دسته‌بندی</FormLabel>
              <FormControl>
                <Input placeholder="مثلاً موبایل و تبلت" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>اسلاگ</FormLabel>
              <FormControl>
                <Input
                  dir="ltr"
                  placeholder="مثلاً mobile-and-tablet"
                  {...field}
                />
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
              <FormLabel>توضیحات (اختیاری)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="توضیحات دسته‌بندی را وارد کنید..."
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3">
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
              : category
                ? "ذخیره تغییرات"
                : "ثبت دسته‌بندی"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
