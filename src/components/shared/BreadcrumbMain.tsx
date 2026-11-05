"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

type BreadcrumbItemType = {
  label: string;
  href?: string;
};

interface BreadcrumbMainProps {
  items: BreadcrumbItemType[];
}

export default function BreadcrumbMain({ items }: BreadcrumbMainProps) {
  return (
    <Breadcrumb className="flex w-full items-center justify-center ">
      <BreadcrumbList className="m-2 flex rounded bg-gradient-to-tr from-lime-200 to-slate-400">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <div key={index} className="flex items-center gap-2">
              <BreadcrumbItem className="mx-4 my-2">
                {isLast ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={item.href ?? "#"} className="text-gray-700">
                      {item.label}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {!isLast && (
                <ChevronLeft className="text-muted-foreground h-4 w-4" />
              )}
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
