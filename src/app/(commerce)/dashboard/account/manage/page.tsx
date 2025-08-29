"use client";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import useUserStore from "@/store/userStore";
const PAGE_TITLE = "ورود و امنیت";

export default function ProfilePage() {
  const { user } = useUserStore();

  return (
    <div className="flex flex-col w-full p-4 ">
      <div className="flex gap-2 ">
        <Link href="/dashboard/account">حساب شما</Link>
        <span>›</span>
        <span>{PAGE_TITLE}</span>
      </div>
      <h1 className=" h1-bold py-4">{PAGE_TITLE}</h1>
      <Card className="w-full  ">
        <CardContent className="p-4 flex justify-between flex-wrap">
          <div>
            <h3 className="font-bold">نام</h3>
            <p>{user?.first_name}</p>
          </div>
          <div>
            <Link href="/account/manage/name">
              <Button className="rounded-full w-32" variant="outline">
                ویرایش
              </Button>
            </Link>
          </div>
        </CardContent>
        <Separator />

        <CardContent className="p-4 flex justify-between flex-wrap">
          <div>
            <h3 className="font-bold">موبایل</h3>
            <p>{user?.mobile}</p>
            <p>فعلاً قابل تغییر نیست</p>
          </div>
          <div>
            <Button disabled className="rounded-full w-32" variant="outline">
              ویرایش
            </Button>
          </div>
        </CardContent>
        <Separator />

        <CardContent className="p-4 flex justify-between flex-wrap">
          <div>
            <h3 className="font-bold">رمز عبور</h3>
            <p>************</p>
            <p>فعلاً قابل تغییر نیست</p>
          </div>
          <div>
            <Button disabled className="rounded-full w-32" variant="outline">
              ویرایش
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
