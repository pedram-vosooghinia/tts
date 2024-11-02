"use client";
import useUserStore from "@/store/userStore";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { CircleUser, UserPlus, LogOut, LogIn } from "lucide-react";
import useLogout from "@/hooks/useLogout";
const MenuDrop = () => {
  const { user } = useUserStore() as { user: User | null };
  const handleLogout = useLogout();
  const router = useRouter();

  return (
    <div className="flex  gap-4 mr-auto md:gap-2 lg:gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="py-4">
          {user !== null && (
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <UserPlus className="mr-2 h-4 w-4" />
                <span>پروفایل من</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <div>نام: {user?.first_name}</div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div>نام خانوادگی: {user?.last_name}</div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <div>موبایل: {user?.mobile}</div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div className="rtl"> نقش: {user?.role}</div>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          )}
          {/* <DropdownMenuSeparator /> */}
          {user === null ? (
            <DropdownMenuItem
              className="pt-12"
              onClick={() => router.push("/login")}
            >
              <Button className="cursor-pointer ">
                <span className="flex justify-between items-center mx-2 ">
                  <LogIn className="mr-2 h-4 w-4" />
                  <div>ورود</div>
                </span>
              </Button>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem className="pt-12" onClick={handleLogout}>
              <Button className="cursor-pointer ">
                <span className="flex justify-between items-center mx-2 ">
                  <LogOut className="mr-2 h-4 w-4" />
                  <div>خروج</div>
                </span>
              </Button>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default MenuDrop;
