"use client";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import logo from "@/public/images/home/logo.jpg";

const MenuDrawer = dynamic(() => import("./MenuDrawer"), {
  ssr: false,
  loading: () => (
    <Button variant="ghost" size="icon" aria-label="منو">
      <MenuIcon className="h-5 w-5" />
    </Button>
  ),
});

export default function Header() {
  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-[700px] items-center justify-between px-4">
        <MenuDrawer />

        <Link href="/" className="text-base font-semibold tracking-tight text-foreground">
          tts
        </Link>

        <Link href="/" className="flex items-center" aria-label="خانه">
          <Image
            src={logo}
            alt="tts"
            width={32}
            height={32}
            className="rounded-full object-cover"
            priority
          />
        </Link>
      </div>
    </header>
  );
}
