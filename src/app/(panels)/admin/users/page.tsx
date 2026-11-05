"use client";

import { useEffect, useState } from "react";
import { useUsers } from "@/features/users/hooks/useUsers";
import UsersTable from "@/features/users/components/UsersTable";
import UsersFilters from "@/features/users/components/UsersFilters";
import DataPagination from "@/components/shared/DataPagination";
import BreadcrumbMain from "@/components/shared/BreadcrumbMain";
import PageHeader from "@/components/shared/PageHeader";

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const [isActive, setIsActive] = useState("all");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

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
    <>
      <BreadcrumbMain
        items={[
          { label: "داشبرد", href: "/admin" },
          { label: "کاربران", href: "#" },
        ]}
      />
      <PageHeader
        title="مدیریت کاربران"
        description="مشاهده و مدیریت کاربران سامانه"
      />
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
    </>
  );
}
