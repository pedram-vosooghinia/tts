"use client";
import LogoutButton from "@/features/dashboard/LogoutButton";
import UserDetail from "@/features/dashboard/user-detail.page";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function page() {
  return (
    <>
      <div className="flex justify-between items-center w-full">
        <Link href="/admin/users">
          <Button className="text-white">کاربران</Button>
        </Link>
        <Link href="/admin/categories">
          <Button className="text-white">دسته بندی ها</Button>
        </Link>
      </div>
      <UserDetail />;
      <LogoutButton />
    </>
  );
}
