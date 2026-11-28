"use client";

import { useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import toast from "react-hot-toast";

import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import {
  createTaskService,
  deleteTaskService,
  getTaskService,
  getTasksService,
} from "../services/tasks.services";
import type {
  CreateTaskDto,
  GetTasksParams,
  GetTasksResponse,
  Task,
} from "../types/task.types";

export function useTasks(params: GetTasksParams = {}) {
  const queryString = new URLSearchParams(
    Object.entries(params)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => [key, String(value)]),
  ).toString();

  const key = `/tasks${queryString ? `?${queryString}` : ""}`;

  const { data, error, isLoading, mutate } = useSWR<GetTasksResponse>(key, () =>
    getTasksService(params),
  );

  return {
    tasks: data?.data ?? [],
    meta: data?.meta,
    error,
    isLoading,
    mutate,
  };
}

export function useTask(id: number | null) {
  const key = id && id > 0 ? `/tasks/${id}` : null;

  const { data, error, isLoading, mutate } = useSWR<Task>(key, () =>
    getTaskService(id as number),
  );

  return {
    task: data ?? null,
    error,
    isLoading: !!key && isLoading,
    mutate,
  };
}

export function useTaskMutations() {
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { mutate } = useSWRConfig();

  const revalidateTasks = () =>
    mutate((key) => typeof key === "string" && key.startsWith("/tasks"));

  const createTask = async (data: CreateTaskDto) => {
    try {
      setIsCreating(true);
      await createTaskService(data);
      await revalidateTasks();
      toast.success("وظیفه با موفقیت ایجاد شد");
      return true;
    } catch (error) {
      toast.error(getApiErrorMessage(error, "خطا در ایجاد وظیفه"));
      return false;
    } finally {
      setIsCreating(false);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      setIsDeleting(true);
      await deleteTaskService(id);
      await revalidateTasks();
      toast.success("وظیفه با موفقیت حذف شد");
      return true;
    } catch (error) {
      toast.error(getApiErrorMessage(error, "خطا در حذف وظیفه"));
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    createTask,
    deleteTask,
    isCreating,
    isDeleting,
  };
}
