"use client";

import { RefreshCw } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  taskStatusLabels,
  taskStatusVariants,
} from "../constants/task.constants";
import { useTask } from "../hooks/useTasks";

interface TaskDetailsDialogProps {
  taskId: number | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function TaskDetailsDialog({
  taskId,
  open,
  onOpenChange,
}: TaskDetailsDialogProps) {
  const { task, isLoading, error, mutate } = useTask(open ? taskId : null);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[460px]">
        <DialogHeader>
          <DialogTitle>
            {taskId ? `جزئیات وظیفه #${taskId}` : "جزئیات وظیفه"}
          </DialogTitle>
          <DialogDescription>اطلاعات کامل وظیفه انتخاب‌شده</DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="py-8 text-center text-sm text-muted-foreground">
            در حال دریافت اطلاعات وظیفه...
          </div>
        ) : error || !task ? (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <p className="text-sm text-destructive">
              خطا در دریافت اطلاعات وظیفه
            </p>
            <Button variant="outline" size="sm" onClick={() => mutate()}>
              <RefreshCw className="ml-2 h-4 w-4" />
              تلاش مجدد
            </Button>
          </div>
        ) : (
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <span className="text-muted-foreground">عنوان</span>
              <span className="font-medium">{task.title}</span>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3">
              <span className="text-muted-foreground">وضعیت</span>
              <Badge variant={taskStatusVariants[task.status] ?? "outline"}>
                {taskStatusLabels[task.status] ?? task.status}
              </Badge>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3">
              <span className="text-muted-foreground">پروژه</span>
              <span className="font-medium">
                {task.project?.name ??
                  (task.projectId ? `پروژه #${task.projectId}` : "-")}
              </span>
            </div>

            {task.created_at && (
              <div className="flex items-center justify-between rounded-lg border p-3">
                <span className="text-muted-foreground">تاریخ ایجاد</span>
                <span>
                  {new Date(task.created_at).toLocaleDateString("fa-IR")}
                </span>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
