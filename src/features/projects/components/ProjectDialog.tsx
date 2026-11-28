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

import { useProjectMutations } from "../hooks/useProjects";
import type { Project, ProjectStatus } from "../types/project.types";

const projectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "نام پروژه باید حداقل ۲ کاراکتر باشد")
    .max(120, "نام پروژه نباید بیشتر از ۱۲۰ کاراکتر باشد"),
  status: z.enum(["enable", "disable"], {
    message: "انتخاب وضعیت الزامی است",
  }),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

interface ProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project?: Project | null;
}

export default function ProjectDialog({
  open,
  onOpenChange,
  project,
}: ProjectDialogProps) {
  const { createProject, updateProject, isCreating, isUpdating } =
    useProjectMutations();

  const isEditing = !!project;
  const isSubmitting = isCreating || isUpdating;

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: project?.name ?? "",
      status: project?.status ?? "enable",
    },
  });

  useEffect(() => {
    form.reset({
      name: project?.name ?? "",
      status: project?.status ?? "enable",
    });
  }, [project, form]);

  const handleSubmit = async (values: ProjectFormValues) => {
    const success = project
      ? await updateProject(project.id, values)
      : await createProject(values);

    if (success) {
      form.reset();
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[460px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "ویرایش پروژه" : "ایجاد پروژه جدید"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "اطلاعات پروژه را ویرایش کنید."
              : "نام و وضعیت پروژه جدید را وارد کنید."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نام پروژه</FormLabel>
                  <FormControl>
                    <Input placeholder="مثلاً پروژه فروشگاه" {...field} />
                  </FormControl>
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
                      field.onChange(value as ProjectStatus)
                    }
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="انتخاب وضعیت" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="enable">فعال (enable)</SelectItem>
                      <SelectItem value="disable">غیرفعال (disable)</SelectItem>
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
                disabled={isSubmitting}
                onClick={() => onOpenChange(false)}
              >
                انصراف
              </Button>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                )}
                {isSubmitting
                  ? "در حال ذخیره..."
                  : isEditing
                    ? "ذخیره تغییرات"
                    : "ثبت پروژه"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
