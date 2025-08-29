"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const preFormaCompleted = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen m-auto">
      <div className="m-4 text-center">فاکتور شما ثبت  شده است </div>
      <Link href="/dashboard/account/orders">
      <Button >مشاهده سفارشات</Button>
      </Link>
    </div>
  );
};

export default preFormaCompleted;
