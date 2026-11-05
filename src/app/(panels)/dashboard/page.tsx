import { Button } from "@/components/ui/button";
import LogoutButton from "@/features/dashboard/LogoutButton";
import UserDetail from "@/features/dashboard/user-detail.page";
import Link from "next/link";
export default function page() {
  return (
    <>
      <Link href="/dashboard/tickets/create">
        <Button className="text-white">تیکت</Button>
      </Link>
      <UserDetail />;
      <LogoutButton />
    </>
  );
}
