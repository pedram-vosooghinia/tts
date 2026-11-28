"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { MenuIcon, ShoppingCart } from "lucide-react";
import { useCart } from "@/features/cart/hooks/useCart";

const MenuDrawer = dynamic(() => import("./MenuDrawer"), {
  ssr: false,
  loading: () => (
    <Button variant="ghost" size="icon" aria-label="منو">
      <MenuIcon className="h-5 w-5" />
    </Button>
  ),
});

export default function Header() {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 w-full max-w-[700px] items-center justify-between px-4">
        <MenuDrawer />

        <Link
          href="/"
          className="text-base font-semibold tracking-tight text-foreground"
        >
          tts
        </Link>

        <Link
          href="/cart"
          className="relative flex items-center"
          aria-label="سبد خرید"
        >
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] text-primary-foreground">
              {itemCount.toLocaleString("fa-IR")}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
