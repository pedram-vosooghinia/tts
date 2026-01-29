"use client";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { MenuIcon } from "lucide-react";
import { statcicMenuItems } from "./menuItems";

const MenuDrawer = () => {
  return (
    <>
      <Sheet key="top">
        <SheetTrigger asChild>
          <Button variant="outline" className="capitalize">
            <MenuIcon size={28} />
          </Button>
        </SheetTrigger>
        <SheetContent side="top" className=" w-full max-w-[580px] mx-auto rounded-b-2xl ">
          <SheetHeader>
            <SheetTitle>
              <MenuIcon size={28} />
            </SheetTitle>
            <SheetDescription>
              {statcicMenuItems.map((item) => (
                <div className="flex flex-col pl-6" key={item.id}>
                  <Link
                    href={item.link || ""}
                    className="flex items-center gap-2 py-2 text-sm text-gray-700"
                  >
                    <span>{item.title}</span>
                  </Link>
                </div>
              ))}
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MenuDrawer;
