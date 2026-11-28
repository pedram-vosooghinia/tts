"use client";

import { useState } from "react";
import { Eye, Loader2, Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  taskStatusLabels,
  taskStatusVariants,
} from "../constants/task.constants";
import { useTaskMutations } from "../hooks/useTasks";
import type { Task } from "../types/task.types";
import TaskDetailsDialog from "./TaskDetailsDialog";

interface TasksTableProps {
  tasks: Task[];
  isLoading: boolean;
}

export default function TasksTable({ tasks, isLoading }: TasksTableProps) {
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const { deleteTask, isDeleting } = useTaskMutations();

  const handleDelete = async () => {
    if (!taskToDelete) return;
    const success = await deleteTask(taskToDelete.id);
    if (success) {
      setTaskToDelete(null);
    }
  };

  if (isLoading) {
    return (
      <div className="py-10 text-center text-muted-foreground">
        در حال دریافت وظایف...
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">شناسه</TableHead>
              <TableHead className="text-right">عنوان</TableHead>
              <TableHead className="text-right">پروژه</TableHead>
              <TableHead className="text-right">وضعیت</TableHead>
              <TableHead className="text-right">تاریخ ایجاد</TableHead>
              <TableHead className="text-center">عملیات</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {tasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  وظیفه‌ای پیدا نشد.
                </TableCell>
              </TableRow>
            ) : (
              tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>#{task.id}</TableCell>
                  <TableCell className="font-medium">{task.title}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {task.project?.name ??
                      (task.projectId ? `پروژه #${task.projectId}` : "-")}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={taskStatusVariants[task.status] ?? "outline"}
                    >
                      {taskStatusLabels[task.status] ?? task.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {task.created_at
                      ? new Date(task.created_at).toLocaleDateString("fa-IR")
                      : "-"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedTaskId(task.id);
                          setDetailsOpen(true);
                        }}
                        title="جزئیات"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => setTaskToDelete(task)}
                        title="حذف"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <TaskDetailsDialog
        taskId={selectedTaskId}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />

      <AlertDialog
        open={!!taskToDelete}
        onOpenChange={(open) => {
          if (!open && !isDeleting) {
            setTaskToDelete(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>حذف وظیفه</AlertDialogTitle>
            <AlertDialogDescription>
              آیا از حذف وظیفه «{taskToDelete?.title}» اطمینان دارید؟
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>انصراف</AlertDialogCancel>
            <AlertDialogAction
              disabled={isDeleting}
              onClick={(event) => {
                event.preventDefault();
                handleDelete();
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
              حذف وظیفه
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
