import type { PaginationMeta } from "@/lib/normalizePaginatedResponse";
import type { Project } from "@/features/projects/types/project.types";

export type TaskStatus = "set" | "doing" | "done";

export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
  projectId?: number;
  project?: Project | null;
  created_at?: string;
  updated_at?: string;
}

export interface CreateTaskDto {
  title: string;
  status: TaskStatus;
  projectId: number;
}

export interface GetTasksParams {
  page?: number;
  limit?: number;
  status?: TaskStatus;
  projectId?: number;
}

export interface GetTasksResponse {
  data: Task[];
  meta: PaginationMeta;
}
