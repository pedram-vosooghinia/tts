"use client";

import { useState } from "react";
import { useSWRConfig } from "swr";
import toast from "react-hot-toast";

import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import {
  createProjectService,
  deleteProjectService,
  updateProjectService,
} from "../services/projects.services";
import type { CreateProjectDto, UpdateProjectDto } from "../types/project.types";

export function useCreateProject() {
  const [isCreating, setIsCreating] = useState(false);
  const { mutate } = useSWRConfig();

  const createProject = async (data: CreateProjectDto) => {
    try {
      setIsCreating(true);
      await createProjectService(data);
      await mutate(
        (key) => typeof key === "string" && key.startsWith("/projects"),
      );
      toast.success("پروژه با موفقیت ایجاد شد");
      return true;
    } catch (error) {
      toast.error(getApiErrorMessage(error, "خطا در ایجاد پروژه"));
      return false;
    } finally {
      setIsCreating(false);
    }
  };

  return { createProject, isCreating };
}

export function useUpdateProject(projectId: number) {
  const [isUpdating, setIsUpdating] = useState(false);
  const { mutate } = useSWRConfig();

  const updateProject = async (data: UpdateProjectDto) => {
    try {
      setIsUpdating(true);
      await updateProjectService(projectId, data);
      await mutate(
        (key) => typeof key === "string" && key.startsWith("/projects"),
      );
      toast.success("پروژه با موفقیت ویرایش شد");
      return true;
    } catch (error) {
      toast.error(getApiErrorMessage(error, "خطا در ویرایش پروژه"));
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  return { updateProject, isUpdating };
}

export function useDeleteProject() {
  const [isDeleting, setIsDeleting] = useState(false);
  const { mutate } = useSWRConfig();

  const deleteProject = async (id: number) => {
    try {
      setIsDeleting(true);
      await deleteProjectService(id);
      await mutate(
        (key) => typeof key === "string" && key.startsWith("/projects"),
      );
      toast.success("پروژه با موفقیت حذف شد");
      return true;
    } catch (error) {
      toast.error(getApiErrorMessage(error, "خطا در حذف پروژه"));
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteProject, isDeleting };
}
