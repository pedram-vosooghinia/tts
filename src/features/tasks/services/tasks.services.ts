import { normalizePaginatedResponse } from "@/lib/normalizePaginatedResponse";
import { api } from "@/services/api";

import type {
  CreateTaskDto,
  GetTasksParams,
  GetTasksResponse,
  Task,
} from "../types/task.types";

export const getTasksService = async (
  params: GetTasksParams = {},
): Promise<GetTasksResponse> => {
  const { page = 1, limit = 10, status, projectId } = params;
  const res = await api.get("/tasks", {
    params: {
      page,
      limit,
      ...(status ? { status } : {}),
      ...(projectId ? { projectId } : {}),
    },
  });

  return normalizePaginatedResponse<Task>(res.data.data ?? res.data, page, limit);
};

export const getTaskService = async (id: number | string): Promise<Task> => {
  const res = await api.get(`/tasks/${id}`);
  return res.data.data ?? res.data;
};

export const createTaskService = async (data: CreateTaskDto): Promise<Task> => {
  const res = await api.post("/tasks", data);
  return res.data.data ?? res.data;
};

export const deleteTaskService = async (id: number | string): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};
