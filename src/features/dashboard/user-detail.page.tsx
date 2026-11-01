"use client";

import useUserStore from "@/store/userStore";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import {
  UserRound,
  Phone,
  ShieldCheck,
  CircleCheck,
  CircleX,
} from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";

const roleLabels = {
  user: "کاربر",
  admin: "مدیر",
  support: "پشتیبانی",
};

export default function UserDetail() {
  const { loading } = useAuth();
  const { user } = useUserStore();
  if (loading) {
    return <div>در حال دریافت اطلاعات کاربر...</div>;
  }

  if (!user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted-foreground">اطلاعات کاربر در دسترس نیست.</p>
      </div>
    );
  }

  const fullName = `${user.first_name} ${user.last_name}`.trim() || "کاربر";

  return (
    <div className="container mx-auto max-w-3xl p-6" dir="rtl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">داشبورد</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          خوش آمدید، {fullName}
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-primary/10 text-xl text-primary ">
                <span>{user.first_name?.charAt(0)}</span>
                <span>{user.last_name?.charAt(0)}</span>
              </AvatarFallback>
            </Avatar>

            <div className="space-y-2">
              <CardTitle>{fullName}</CardTitle>
              <CardDescription>اطلاعات حساب کاربری شما</CardDescription>

              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{roleLabels[user.role]}</Badge>

                <Badge
                  variant={user.is_active ? "outline" : "destructive"}
                  className="text-cyan-300"
                >
                  {user.is_active ? "حساب فعال" : "حساب غیرفعال"}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="flex flex-wrap justify-around items-center gap-4 pt-6 ">
          <div className="flex items-center gap-3">
            <UserRound className="h-5 w-5 text-muted-foreground" />

            <div>
              <p className="text-sm text-muted-foreground">
                نام و نام خانوادگی
              </p>
              <p className="font-medium">{fullName}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-muted-foreground" />

            <div>
              <p className="text-sm text-muted-foreground">شماره موبایل</p>
              <p className="font-medium" dir="ltr">
                {user.mobile}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-muted-foreground" />

            <div>
              <p className="text-sm text-muted-foreground">نقش کاربری</p>
              <p className="font-medium">{roleLabels[user.role]}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {user.is_active ? (
              <CircleCheck className="h-5 w-5 text-green-600" />
            ) : (
              <CircleX className="h-5 w-5 text-destructive" />
            )}

            <div>
              <p className="text-sm text-muted-foreground">وضعیت حساب</p>
              <p className="font-medium">
                {user.is_active ? "فعال" : "غیرفعال"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
