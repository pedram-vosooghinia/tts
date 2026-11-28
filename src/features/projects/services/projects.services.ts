import { normalizePaginatedResponse } from "@/lib/normalizePaginatedResponse";
import { api } from "@/services/api";

import type {
  CreateProjectDto,
  GetProjectsParams,
  GetProjectsResponse,
  Project,
  UpdateProjectDto,
} from "../types/project.types";

export const getProjectsService = async (
  params: GetProjectsParams = {},
): Promise<GetProjectsResponse> => {
  const { page = 1, limit = 10, status } = params;
  const res = await api.get("/projects", {
    params: {
      page,
      limit,
      ...(status ? { status } : {}),
    },
  });

  return normalizePaginatedResponse<Project>(res.data.data ?? res.data, page, limit);
};

export const getProjectService = async (id: number | string): Promise<Project> => {
  const res = await api.get(`/projects/${id}`);
  return res.data.data ?? res.data;
};

export const createProjectService = async (
  data: CreateProjectDto,
): Promise<Project> => {
  const res = await api.post("/projects", data);
  return res.data.data ?? res.data;
};

export const updateProjectService = async (
  id: number | string,
  data: UpdateProjectDto,
): Promise<Project> => {
  const res = await api.patch(`/projects/${id}`, data);
  return res.data.data ?? res.data;
};

export const deleteProjectService = async (id: number | string): Promise<void> => {
  await api.delete(`/projects/${id}`);
};
