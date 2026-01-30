"use client";
import { BsPersonFill } from "react-icons/bs";
import { FaCartShopping } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { IoHome } from "react-icons/io5";

const MenuBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const navItems = [
    {
      id: 4,
      name: "خانه",
      href: "/",
      icon: IoHome,
    },

    {
      id: 2,
      name: "سبدخرید",
      href: "/preForma",
      icon: FaCartShopping,
    },
    {
      id: 1,
      name: "حساب",
      href: "/dashboard",
      icon: BsPersonFill,
    },
  ];

  return (
    <div
      className="fixed bottom-0 left-1/2 z-50 w-full max-w-[700px] rounded-t-2xl -translate-x-1/2 bg-neutral-4
      h-[4.25rem] backdrop-blur-md border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.03)] pt-2 px-6"
    >
      <div className="flex justify-between items-center max-w-md mx-auto h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Button
              key={item.id}
              variant="outline"
              onClick={() => router.push(`${item?.href}`)}
              className={`
              group flex items-center justify-center rounded-full 
              transition-[background-color,box-shadow,transform,padding] duration-400 ease-in-out
              min-w-10 bg-neutral-1
                ${
                  isActive
                    ? " px-5 py-2.5 gap-2 shadow-sm scale-[1.02]"
                    : " p-2 "
                }
              `}
            >
              <Icon
                size={26}
                className={`transition-transform duration-400 ease-in-out

                   ${isActive ? "scale-105" : "group-hover:scale-110"}`}
              />

              <span
                className={`whitespace-nowrap overflow-hidden font-medium text-sm
                transition-[max-width,opacity,transform] duration-400 ease-in-out
                  ${
                    isActive
                      ? "max-w-[100px] opacity-100 translate-x-0"
                      : "max-w-0 opacity-0 -translate-x-2"
                  }
                `}
              >
                {item.name}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default MenuBar;
