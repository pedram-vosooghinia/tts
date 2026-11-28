"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import BreadcrumbMain from "@/components/shared/BreadcrumbMain";
import DataPagination from "@/components/shared/DataPagination";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProjectDialog from "@/features/projects/components/ProjectDialog";
import ProjectsTable from "@/features/projects/components/ProjectsTable";
import { useProjects } from "@/features/projects/hooks/useProjects";
import type { Project, ProjectStatus } from "@/features/projects/types/project.types";

export default function DashboardProjectsPage() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const limit = 10;
  const { projects, meta, isLoading } = useProjects({
    page,
    limit,
    status:
      statusFilter === "all" ? undefined : (statusFilter as ProjectStatus),
  });

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <BreadcrumbMain
        items={[
          { label: "داشبورد", href: "/dashboard" },
          { label: "پروژه‌ها" },
        ]}
      />

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <PageHeader
          title="مدیریت پروژه‌ها"
          description="مشاهده، ایجاد، ویرایش و حذف پروژه‌ها"
        />

        <Button
          onClick={() => {
            setEditingProject(null);
            setDialogOpen(true);
          }}
        >
          <Plus className="ml-2 h-4 w-4" />
          افزودن پروژه
        </Button>
      </div>

      <div className="flex items-center justify-between gap-3">
        <Select value={statusFilter} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="فیلتر وضعیت" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">همه وضعیت‌ها</SelectItem>
            <SelectItem value="enable">فعال</SelectItem>
            <SelectItem value="disable">غیرفعال</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ProjectsTable
        projects={projects}
        isLoading={isLoading}
        onEdit={(project) => {
          setEditingProject(project);
          setDialogOpen(true);
        }}
      />

      {meta && (
        <DataPagination
          page={meta.page}
          totalPages={meta.totalPages}
          total={meta.total}
          hasPreviousPage={meta.hasPreviousPage}
          hasNextPage={meta.hasNextPage}
          isLoading={isLoading}
          onPageChange={setPage}
        />
      )}

      <ProjectDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        project={editingProject}
      />
    </div>
  );
}
