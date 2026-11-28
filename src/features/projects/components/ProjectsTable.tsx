"use client";

import { useState } from "react";
import Link from "next/link";
import { ListTodo, Loader2, Pencil, Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useProjectMutations } from "../hooks/useProjects";
import type { Project } from "../types/project.types";

interface ProjectsTableProps {
  projects: Project[];
  isLoading: boolean;
  onEdit: (project: Project) => void;
}

export default function ProjectsTable({
  projects,
  isLoading,
  onEdit,
}: ProjectsTableProps) {
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const { deleteProject, isDeleting } = useProjectMutations();

  const handleDelete = async () => {
    if (!projectToDelete) return;
    const success = await deleteProject(projectToDelete.id);
    if (success) {
      setProjectToDelete(null);
    }
  };

  if (isLoading) {
    return (
      <div className="py-10 text-center text-muted-foreground">
        در حال دریافت پروژه‌ها...
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">شناسه</TableHead>
              <TableHead className="text-right">نام پروژه</TableHead>
              <TableHead className="text-right">وضعیت</TableHead>
              <TableHead className="text-right">تاریخ ایجاد</TableHead>
              <TableHead className="text-center">عملیات</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {projects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  پروژه‌ای پیدا نشد.
                </TableCell>
              </TableRow>
            ) : (
              projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>#{project.id}</TableCell>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        project.status === "enable" ? "default" : "secondary"
                      }
                    >
                      {project.status === "enable" ? "فعال" : "غیرفعال"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {project.created_at
                      ? new Date(project.created_at).toLocaleDateString("fa-IR")
                      : "-"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-1">
                      <Button
                        asChild
                        variant="ghost"
                        size="icon"
                        title="مشاهده وظایف پروژه"
                      >
                        <Link href={`/dashboard/tasks?projectId=${project.id}`}>
                          <ListTodo className="h-4 w-4" />
                        </Link>
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(project)}
                        title="ویرایش"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => setProjectToDelete(project)}
                        title="حذف"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog
        open={!!projectToDelete}
        onOpenChange={(open) => {
          if (!open && !isDeleting) {
            setProjectToDelete(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>حذف پروژه</AlertDialogTitle>
            <AlertDialogDescription>
              آیا از حذف پروژه «{projectToDelete?.name}» اطمینان دارید؟ این
              عملیات قابل بازگشت نیست.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>انصراف</AlertDialogCancel>
            <AlertDialogAction
              disabled={isDeleting}
              onClick={(event) => {
                event.preventDefault();
                handleDelete();
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
              حذف پروژه
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
