import type { PaginationMeta } from "@/lib/normalizePaginatedResponse";

export type ProjectStatus = "enable" | "disable";

export interface Project {
  id: number;
  name: string;
  status: ProjectStatus;
  created_at?: string;
  updated_at?: string;
}

export interface CreateProjectDto {
  name: string;
  status: ProjectStatus;
}

export type UpdateProjectDto = CreateProjectDto;

export interface GetProjectsParams {
  page?: number;
  limit?: number;
  status?: ProjectStatus;
}

export interface GetProjectsResponse {
  data: Project[];
  meta: PaginationMeta;
}
