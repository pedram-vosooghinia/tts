"use client";

import { Button } from "@/components/ui/button";

interface DataPaginationProps {
  page: number;
  totalPages: number;
  total: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  isLoading?: boolean;
  onPageChange: (page: number) => void;
}

export default function DataPagination({
  page,
  totalPages,
  total,
  hasPreviousPage,
  hasNextPage,
  isLoading = false,
  onPageChange,
}: DataPaginationProps) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        صفحه {page} از {totalPages}
        {" | "}
        تعداد کل: {total}
      </p>

      <div className="flex gap-2">
        <Button
          variant="outline"
          disabled={!hasPreviousPage || isLoading}
          onClick={() => onPageChange(page - 1)}
        >
          قبلی
        </Button>

        <Button
          variant="outline"
          disabled={!hasNextPage || isLoading}
          onClick={() => onPageChange(page + 1)}
        >
          بعدی
        </Button>
      </div>
    </div>
  );
}
