"use client";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { MenuIcon } from "lucide-react";
import { statcicMenuItems } from "./menuItems";

const MenuDrawer = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="منو">
          <MenuIcon className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-sm">
        <SheetHeader className="text-right">
          <SheetTitle className="text-base font-medium">منو</SheetTitle>
        </SheetHeader>
        <nav className="mt-6 flex flex-col gap-1">
          {statcicMenuItems.map((item) => (
            <Link
              key={item.id}
              href={item.link}
              className="rounded-md px-3 py-2 text-sm text-foreground transition-colors hover:bg-accent"
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MenuDrawer;
