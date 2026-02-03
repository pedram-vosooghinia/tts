"use client";
import { BsPersonFill } from "react-icons/bs";
import { FaCartShopping } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { IoHome } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";

const MenuBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const navItems = [
    {
      id: 1,
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
      id: 4,
      name: "جستجو",
      href: "/search",
      icon: CiSearch,
    },
    {
      id: 3,
      name: "حساب",
      href: "/dashboard",
      icon: BsPersonFill,
    },
  ];

  return (
    <div className="fixed bottom-0  z-1000 w-full max-w-[43.75rem]  rounded-t-2xl  flex justify-center items-center">
      <div className=" w-full  rounded-t-2xl  bg-neutral-4 pt-2 px-6">
        <div className="flex  justify-between  items-center w-full mx-auto h-20">
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
    </div>
  );
};

export default MenuBar;
