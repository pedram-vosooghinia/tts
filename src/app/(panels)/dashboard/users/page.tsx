"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useUsers } from "@/features/users/hooks/useUsers";
import UsersTable from "@/features/users/components/UsersTable";
import UsersFilters from "@/features/users/components/UsersFilters";
import CreateUserDialog from "@/features/users/components/CreateUserDialog";
import DataPagination from "@/components/shared/DataPagination";
import BreadcrumbMain from "@/components/shared/BreadcrumbMain";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const [isActive, setIsActive] = useState("all");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [createOpen, setCreateOpen] = useState(false);

  const limit = 10;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  const { users, meta, isLoading } = useUsers({
    page,
    limit,
    search: debouncedSearch || undefined,
    isActive: isActive === "all" ? undefined : isActive === "true",
  });
  const handleFilterChange = (value: string) => {
    setIsActive(value);
    setPage(1);
  };
  return (
    <div className="space-y-6">
      <BreadcrumbMain
        items={[
          { label: "داشبورد", href: "/dashboard" },
          { label: "کاربران" },
        ]}
      />
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <PageHeader
          title="مدیریت کاربران"
          description="مشاهده و مدیریت کاربران سامانه"
        />
        <Button onClick={() => setCreateOpen(true)}>
          <Plus className="ml-2 h-4 w-4" />
          افزودن کاربر
        </Button>
      </div>
      <UsersFilters
        search={search}
        isActive={isActive}
        onSearchChange={setSearch}
        onStatusChange={handleFilterChange}
      />
      <UsersTable users={users} isLoading={isLoading} />
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
      <CreateUserDialog open={createOpen} onOpenChange={setCreateOpen} />
    </div>
  );
}
