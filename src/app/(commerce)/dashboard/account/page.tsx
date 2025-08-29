import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import React from "react";
import { accountItems } from "@/components/dashboard/acount/accountItems";

const PAGE_TITLEـP = "حساب کاربری شما";


export default function AccountPage() {
  return (
    <div className="m-4">
      <h1 className="h1-bold py-4">{PAGE_TITLEـP}</h1>
      <div className="grid md:grid-cols-3 gap-4 items-stretch">
        {accountItems.map((item) => (
          <Card key={item.id}>
            <Link href={item.href}>
              <CardContent className="flex items-start gap-4 p-6">
                <div>
                  <item.icon className="w-12 h-12" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{item.title}</h2>
                  <p className="text-muted-foreground">{item.content}</p>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
