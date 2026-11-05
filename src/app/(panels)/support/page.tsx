import { Button } from "@/components/ui/button";
import LogoutButton from "@/features/dashboard/LogoutButton";
import UserDetail from "@/features/dashboard/user-detail.page";
import Link from "next/link";
export default function page() {
  return (
    <>
      <div className="flex justify-between items-center w-full">
        <Link href="/support/tickets">
          <Button className="text-white">تیک ها</Button>
        </Link>
      </div>
      <UserDetail />;
      <LogoutButton />
    </>
  );
}
