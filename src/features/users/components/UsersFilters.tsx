"use client";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UsersFiltersProps {
  search: string;
  isActive: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export default function UsersFilters({
  search,
  isActive,
  onSearchChange,
  onStatusChange,
}: UsersFiltersProps) {
  return (
    <div className="flex justify-between w-full items-center gap-3">
      <Input
        placeholder="جستجو بر اساس نام یا شماره موبایل..."
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        className="w-full max-w-sm min-w-0"
      />

      <Select value={isActive} onValueChange={onStatusChange}>
        <SelectTrigger className="w-[180px] shrink-0">
          <SelectValue placeholder="وضعیت کاربران" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">همه کاربران</SelectItem>
          <SelectItem value="true">کاربران فعال</SelectItem>
          <SelectItem value="false">کاربران غیرفعال</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
