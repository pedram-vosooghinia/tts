import type { TaskStatus } from "../types/task.types";

export const taskStatusLabels: Record<TaskStatus, string> = {
  set: "ثبت شده",
  doing: "در حال انجام",
  done: "انجام شده",
};

export const taskStatusVariants: Record<
  TaskStatus,
  "default" | "secondary" | "outline"
> = {
  set: "outline",
  doing: "secondary",
  done: "default",
};

export const taskStatusOptions = (
  Object.keys(taskStatusLabels) as TaskStatus[]
).map((value) => ({
  value,
  label: taskStatusLabels[value],
}));
