
"use client";

import { useRouter } from "next/navigation";
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

import { useCreateTicket } from "../hooks/useCreateTicket";

const createTicketSchema = z.object({
  title: z
    .string()
    .min(3, "عنوان باید حداقل ۳ کاراکتر باشد")
    .max(150, "عنوان نمی‌تواند بیشتر از ۱۵۰ کاراکتر باشد"),

  priority: z.enum(["low", "medium", "high", "urgent"]),

  initialMessage: z
    .string()
    .min(10, "متن پیام باید حداقل ۱۰ کاراکتر باشد"),
});

type CreateTicketFormValues = z.infer<typeof createTicketSchema>;

export default function CreateTicketForm() {
  const router = useRouter();
  const { createTicket, isCreating } = useCreateTicket();

  const form = useForm<CreateTicketFormValues>({
    resolver: zodResolver(createTicketSchema),
    defaultValues: {
      title: "",
      priority: "medium",
      initialMessage: "",
    },
  });

  const onSubmit = async (values: CreateTicketFormValues) => {
    const ticket = await createTicket(values);

    if (ticket) {
      router.push(`/tickets/${ticket.id}`);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>عنوان تیکت</FormLabel>
              <FormControl>
                <Input
                  placeholder="مثلاً مشکل در ورود به حساب کاربری"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>اولویت درخواست</FormLabel>
              <Select
                value={field.value}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="انتخاب اولویت" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  <SelectItem value="low">کم</SelectItem>
                  <SelectItem value="medium">متوسط</SelectItem>
                  <SelectItem value="high">زیاد</SelectItem>
                  <SelectItem value="urgent">فوری</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="initialMessage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>شرح درخواست</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="مشکل یا درخواست خود را با جزئیات توضیح دهید..."
                  rows={6}
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
            disabled={isCreating}
            onClick={() => router.back()}
          >
            انصراف
          </Button>

          <Button type="submit" disabled={isCreating}>
            {isCreating && (
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            )}
            {isCreating ? "در حال ثبت..." : "ثبت تیکت"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
