"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useCreateUser } from "../hooks/useCreateUser";

const createUserSchema = z.object({
  first_name: z
    .string()
    .trim()
    .min(1, "نام الزامی است")
    .max(50, "نام نباید بیشتر از ۵۰ کاراکتر باشد"),
  last_name: z
    .string()
    .trim()
    .max(100, "نام خانوادگی نباید بیشتر از ۱۰۰ کاراکتر باشد")
    .optional(),
  mobile: z
    .string()
    .trim()
    .regex(/^09\d{9}$/, "شماره موبایل باید ۱۱ رقم و با 09 شروع شود"),
  password: z
    .string()
    .optional()
    .refine(
      (val) => !val || (val.length >= 8 && val.length <= 16),
      "رمز عبور باید بین ۸ تا ۱۶ کاراکتر باشد",
    )
    .refine(
      (val) => !val || /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s])/.test(val),
      "رمز عبور باید شامل حرف بزرگ انگلیسی، عدد و کاراکتر خاص باشد",
    ),
});

type CreateUserFormValues = z.infer<typeof createUserSchema>;

interface CreateUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateUserDialog({
  open,
  onOpenChange,
}: CreateUserDialogProps) {
  const { createUser, isCreating } = useCreateUser();

  const form = useForm<CreateUserFormValues>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      mobile: "",
      password: "",
    },
  });

  const handleSubmit = async (values: CreateUserFormValues) => {
    const success = await createUser({
      first_name: values.first_name,
      last_name: values.last_name?.trim() || undefined,
      mobile: values.mobile,
      password: values.password?.trim() || undefined,
    });

    if (success) {
      form.reset();
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>ایجاد کاربر جدید</DialogTitle>
          <DialogDescription>
            اطلاعات کاربر جدید را برای ثبت در سامانه وارد کنید.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نام</FormLabel>
                    <FormControl>
                      <Input placeholder="مثلاً پدرام" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نام خانوادگی (اختیاری)</FormLabel>
                    <FormControl>
                      <Input placeholder="مثلاً وثوقی" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>شماره موبایل</FormLabel>
                  <FormControl>
                    <Input
                      dir="ltr"
                      placeholder="09123456789"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>رمز عبور (اختیاری)</FormLabel>
                  <FormControl>
                    <Input
                      dir="ltr"
                      type="password"
                      placeholder="StrongPass123!"
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
                disabled={isCreating}
                onClick={() => onOpenChange(false)}
              >
                انصراف
              </Button>

              <Button type="submit" disabled={isCreating}>
                {isCreating && (
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                )}
                {isCreating ? "در حال ثبت..." : "ثبت کاربر"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
