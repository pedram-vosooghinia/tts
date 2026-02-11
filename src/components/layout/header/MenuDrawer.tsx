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
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="">
            <MenuIcon size={28} />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className=" w-full max-w-[700px] mx-auto rounded-b-2xl "
        >
          <SheetHeader>
            <SheetTitle>
              <MenuIcon size={28} />
            </SheetTitle>

            <div className="flex flex-col pl-6">
              {statcicMenuItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.link}
                  className="flex items-center gap-2 py-2 text-sm text-gray-700"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MenuDrawer;
