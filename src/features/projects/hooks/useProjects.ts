"use client";

import { useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import toast from "react-hot-toast";

import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import {
  createProjectService,
  deleteProjectService,
  getProjectsService,
  updateProjectService,
} from "../services/projects.services";
import type {
  CreateProjectDto,
  GetProjectsParams,
  GetProjectsResponse,
  UpdateProjectDto,
} from "../types/project.types";

export function useProjects(params: GetProjectsParams = {}) {
  const queryString = new URLSearchParams(
    Object.entries(params)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => [key, String(value)]),
  ).toString();

  const key = `/projects${queryString ? `?${queryString}` : ""}`;

  const { data, error, isLoading, mutate } = useSWR<GetProjectsResponse>(
    key,
    () => getProjectsService(params),
  );

  return {
    projects: data?.data ?? [],
    meta: data?.meta,
    error,
    isLoading,
    mutate,
  };
}

export function useProjectMutations() {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { mutate } = useSWRConfig();

  const revalidateProjects = () =>
    mutate((key) => typeof key === "string" && key.startsWith("/projects"));

  const createProject = async (data: CreateProjectDto) => {
    try {
      setIsCreating(true);
      await createProjectService(data);
      await revalidateProjects();
      toast.success("پروژه با موفقیت ایجاد شد");
      return true;
    } catch (error) {
      toast.error(getApiErrorMessage(error, "خطا در ایجاد پروژه"));
      return false;
    } finally {
      setIsCreating(false);
    }
  };

  const updateProject = async (id: number, data: UpdateProjectDto) => {
    try {
      setIsUpdating(true);
      await updateProjectService(id, data);
      await revalidateProjects();
      toast.success("پروژه با موفقیت ویرایش شد");
      return true;
    } catch (error) {
      toast.error(getApiErrorMessage(error, "خطا در ویرایش پروژه"));
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  const deleteProject = async (id: number) => {
    try {
      setIsDeleting(true);
      await deleteProjectService(id);
      await revalidateProjects();
      toast.success("پروژه با موفقیت حذف شد");
      return true;
    } catch (error) {
      toast.error(getApiErrorMessage(error, "خطا در حذف پروژه"));
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    createProject,
    updateProject,
    deleteProject,
    isCreating,
    isUpdating,
    isDeleting,
  };
}
