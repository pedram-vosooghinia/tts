"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="flex justify-center items-center h-screen text-gray-600">
        به tetisan خوش آمدید برای ورود
        <Link href="/login" className="text-red-400 mx-2">
          لاگین
        </Link>
        کنید
      </div>
    </div>
  );
}
