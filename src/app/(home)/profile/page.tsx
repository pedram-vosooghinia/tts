import { Button } from "@/components/ui/button";
import UserDetail from "@/features/dashboard/user-detail.page";
import Link from "next/link";
export default function page() {
  return (
    <>
      <div className="flex justify-between gap-6 items-center w-full"></div>
      <UserDetail />
      {/* <LogoutButton /> */}
    </>
  );
}
