"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
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
import { useProjects } from "@/features/projects/hooks/useProjects";
import TaskDialog from "@/features/tasks/components/TaskDialog";
import TasksTable from "@/features/tasks/components/TasksTable";
import { taskStatusOptions } from "@/features/tasks/constants/task.constants";
import { useTasks } from "@/features/tasks/hooks/useTasks";
import type { TaskStatus } from "@/features/tasks/types/task.types";

function TasksPageContent() {
  const searchParams = useSearchParams();
  const initialProjectId = searchParams.get("projectId") ?? "all";

  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [projectFilter, setProjectFilter] = useState<string>(initialProjectId);
  const [createOpen, setCreateOpen] = useState(false);

  const limit = 10;
  const projectId =
    projectFilter === "all" ? undefined : Number(projectFilter) || undefined;

  const { projects } = useProjects({ page: 1, limit: 100 });
  const { tasks, meta, isLoading } = useTasks({
    page,
    limit,
    status: statusFilter === "all" ? undefined : (statusFilter as TaskStatus),
    projectId,
  });

  return (
    <div className="space-y-6">
      <BreadcrumbMain
        items={[{ label: "داشبورد", href: "/dashboard" }, { label: "وظایف" }]}
      />

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <PageHeader
          title="مدیریت وظایف"
          description="مشاهده، فیلتر، ایجاد و حذف وظایف پروژه‌ها"
        />

        <Button onClick={() => setCreateOpen(true)}>
          <Plus className="ml-2 h-4 w-4" />
          افزودن وظیفه
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Select
          value={statusFilter}
          onValueChange={(value) => {
            setStatusFilter(value);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue placeholder="وضعیت وظیفه" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">همه وضعیت‌ها</SelectItem>
            {taskStatusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={projectFilter}
          onValueChange={(value) => {
            setProjectFilter(value);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-[220px] bg-white">
            <SelectValue placeholder="فیلتر پروژه" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">همه پروژه‌ها</SelectItem>
            {projects.map((project) => (
              <SelectItem key={project.id} value={String(project.id)}>
                {project.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <TasksTable tasks={tasks} isLoading={isLoading} />

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

      <TaskDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        defaultProjectId={projectId}
      />
    </div>
  );
}

export default function DashboardTasksPage() {
  return (
    <Suspense
      fallback={
        <div className="py-10 text-center text-muted-foreground">
          در حال بارگذاری...
        </div>
      }
    >
      <TasksPageContent />
    </Suspense>
  );
}
