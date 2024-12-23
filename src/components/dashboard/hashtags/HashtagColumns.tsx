"use client"
import { Hashtag } from "@/types/Hashtags";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    ColumnDef,

  } from "@tanstack/react-table";
export const Hashtagcolumns: ColumnDef<Hashtag>[] = [

    {
      id: "هشتگ",
      accessorKey: "hashtag",
      header: "هشتگ",
      cell: ({ row }) => <div className="capitalize">{row.getValue("هشتگ")}</div>,
    },
  
    {
      id: "هشتگ",
      accessorKey: "hashtag",
      header: "هشتگ",
      cell: ({ row }) => <div className="capitalize">{row.getValue("هشتگ")}</div>,
    },
  
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const hashtag = row.original;
  
        return (
          <div className="rtl felx justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>عملیات</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(hashtag.document_id)}
                >
                   تغییر نام هشتگ 
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(hashtag.document_id)}
                >
                  حذف هشتگ
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
  