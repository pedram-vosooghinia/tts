"use client";

import { useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProjects } from "@/features/projects/hooks/useProjects";

import { taskStatusOptions } from "../constants/task.constants";
import { useTaskMutations } from "../hooks/useTasks";
import type { TaskStatus } from "../types/task.types";

const taskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "عنوان وظیفه باید حداقل ۲ کاراکتر باشد")
    .max(200, "عنوان وظیفه نباید بیشتر از ۲۰۰ کاراکتر باشد"),
  status: z.enum(["set", "doing", "done"], {
    message: "انتخاب وضعیت الزامی است",
  }),
  projectId: z
    .number({ message: "انتخاب پروژه الزامی است" })
    .int()
    .min(1, "لطفاً یک پروژه انتخاب کنید"),
});

type TaskFormValues = z.infer<typeof taskSchema>;

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultProjectId?: number;
}

export default function TaskDialog({
  open,
  onOpenChange,
  defaultProjectId,
}: TaskDialogProps) {
  const { projects, isLoading: isLoadingProjects } = useProjects({
    page: 1,
    limit: 100,
  });
  const { createTask, isCreating } = useTaskMutations();

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      status: "set",
      projectId: defaultProjectId ?? 0,
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        title: "",
        status: "set",
        projectId: defaultProjectId ?? 0,
      });
    }
  }, [open, defaultProjectId, form]);

  const handleSubmit = async (values: TaskFormValues) => {
    const success = await createTask(values);
    if (success) {
      form.reset();
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>ایجاد وظیفه جدید</DialogTitle>
          <DialogDescription>
            اطلاعات وظیفه جدید را وارد و به یکی از پروژه‌ها متصل کنید.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>عنوان وظیفه</FormLabel>
                  <FormControl>
                    <Input placeholder="مثلاً تماس با مشتری" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="projectId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>پروژه</FormLabel>
                  <Select
                    disabled={isLoadingProjects}
                    value={field.value > 0 ? String(field.value) : ""}
                    onValueChange={(value) => field.onChange(Number(value))}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            isLoadingProjects
                              ? "در حال دریافت پروژه‌ها..."
                              : "انتخاب پروژه"
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {projects.map((project) => (
                        <SelectItem key={project.id} value={String(project.id)}>
                          {project.name}
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
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>وضعیت</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={(value) =>
                      field.onChange(value as TaskStatus)
                    }
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="انتخاب وضعیت" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {taskStatusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                {isCreating ? "در حال ثبت..." : "ثبت وظیفه"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
