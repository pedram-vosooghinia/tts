"use client";
import * as React from "react";
import { Hashtag } from "@/types/hashtags";
import { mutate } from "swr";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { deleteHashtagsService } from "@/services/hashtags";
import { ColumnDef } from "@tanstack/react-table";
import { hashtagTypeStore } from "@/store/hashtagTypeStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
export const Hashtagcolumns: ColumnDef<Hashtag>[] = [
  {
    id: "ردیف",
    header: "ردیف",
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    id: "نام",
    accessorKey: "name",
    header: "نام",
    cell: ({ row }) => <div className="capitalize">{row.getValue("نام")}</div>,
  },

  {
    id: "نوع",
    accessorKey: "type",
    header: "نوع",
    cell: ({ row }) => <div className="capitalize">{row.getValue("نوع")}</div>,
  },
  {
    id: "مقدار",
    accessorKey: "count",
    header: "مقدار",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("مقدار")}</div>
    ),
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const hashtag = row.original;
      const { selectedType } = hashtagTypeStore();
      const handleDelete = async () => {
        try {
          const response = await deleteHashtagsService({
            document_id: hashtag.document_id,
          });

          if (response.status === 204) {
            toast.error("هشتگ مورد نظر یافت نشد");
          } else {
            toast.success("هشتگ با موفقیت حذف شد!");
            mutate(`/hashtags/getAll?type=${selectedType}`);
          }
        } catch {
          toast.error("مشکلی پیش آمد، لطفاً دوباره تلاش کنید.");
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuItem>
              <Button onClick={handleDelete} variant="destructive">
                حذف
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
