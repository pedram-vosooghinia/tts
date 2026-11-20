"use client";
import { BsPersonFill } from "react-icons/bs";
import { FaCartShopping } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { IoHome } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { getDashboardPath } from "@/features/auth/utils/getDashboardPath";
import { cn } from "@/lib/utils";

const MenuBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const accountPath = user ? getDashboardPath(user.role) : "/login";
  const navItems = [
    { id: 1, name: "خانه", href: "/", icon: IoHome },
    { id: 2, name: "سبدخرید", href: "/preForma", icon: FaCartShopping },
    { id: 4, name: "جستجو", href: "/search", icon: CiSearch },
    { id: 3, name: "حساب", href: accountPath, icon: BsPersonFill },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background">
      <div className="mx-auto flex h-16 w-full max-w-[700px] items-center justify-around px-4">
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
              <Icon className="h-5 w-5" />
              <span>{item.name}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MenuBar;
