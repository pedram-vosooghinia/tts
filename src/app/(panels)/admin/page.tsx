"use client";
import LogoutButton from "@/features/dashboard/LogoutButton";
import UserDetail from "@/features/dashboard/user-detail.page";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function page() {
  return (
    <>
      <Link href="/admin/users">
        <Button className="text-white">کاربران</Button>
      </Link>
      <UserDetail />;
      <LogoutButton />
    </>
  );
}
