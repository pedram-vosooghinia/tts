"use client";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCart } from "@/features/cart/hooks/useCart";
import { cn } from "@/lib/utils";
import { Home, Layout, LayoutDashboard, Search, User } from "lucide-react";

const MenuBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { itemCount } = useCart();
  const navItems = [
    { id: 1, name: "خانه", href: "/", icon: Home },
    { id: 2, name: "دسته بندی", href: "/categories", icon: LayoutDashboard },
    { id: 4, name: "جستجو", href: "/search", icon: Search },
    { id: 3, name: "حساب", href: "/profile", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background">
      <div className="mx-auto flex h-16 w-full max-w-175 items-center justify-around px-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => router.push(item.href)}
              className={cn(
                "flex min-w-0 flex-1 flex-col items-center justify-center gap-1 py-2 text-xs transition-colors",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <span className="relative">
                <Icon className="h-5 w-5" />
                {item.id === 5 && itemCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] text-primary-foreground">
                    {itemCount.toLocaleString("fa-IR")}
                  </span>
                )}
              </span>
              <span>{item.name}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MenuBar;
