"use client";

import Link from "next/link";
import { MenuIcon, ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { statcicMenuItems } from "./menuItems";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    x: 16,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut" as const,
    },
  },
};

const MenuDrawer = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="منو"
          className="rounded-xl"
        >
          <MenuIcon className="size-5" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 border-l border-border p-0 sm:max-w-sm"
        dir="rtl"
      >
        <SheetHeader className="border-b border-border px-5 py-5 text-right">
          <SheetTitle className="text-base font-semibold">منو</SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col gap-1 p-4">
          {statcicMenuItems.map((item) => (
            <div key={item.id}>
              <Link
                href={item.link}
                className="group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                <span>{item.title}</span>

                <ChevronLeft className="size-4 text-muted-foreground transition-transform duration-200 group-hover:-translate-x-1 group-hover:text-foreground" />
              </Link>
            </div>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MenuDrawer;
