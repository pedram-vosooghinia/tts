"use client";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import MenuDrop from "./MenuDrop";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Menuitems } from "./menuItems";
// import Shoping from "./Shoping";
import { ModeToggle } from "./ModeToggle";

export function MenuDashboard() {
  return (
    <div className=" z-50 flex dark:bg-black   bg-white  justify-between items-center  fixed  w-full h-20  gap-4  border-b  px-4 lg:px-6">
      <div className="   hidden  gap-6 text-lg font-medium  lg:justify-cnter  lg:flex lg:flex-row lg:flex-wrap lg:items-between   lg:text-sm lg:gap-4">
        {Menuitems.map((item) => (
          <div
            key={item.id}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <Link href={item.link}>{item.label}</Link>
          </div>
        ))}
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 lg:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetTitle className="pt-4">Menu</SheetTitle>

          <div className=" flex flex-col py-4 text-lg font-medium">
            {Menuitems.map((item) => (
              <SheetClose
                asChild
                key={item.id}
                className="text-muted-foreground py-2 transition-colors hover:text-foreground"
              >
                <Link href={item.link}>{item.label}</Link>
              </SheetClose>
            ))}
          </div>
        </SheetContent>
      </Sheet>
      <div className="flex justify-between items-center gap-4 lg:gap-8">
        {/* <Shoping /> */}
        <ModeToggle/>
        <MenuDrop />
      </div>
    </div>
  );
}
