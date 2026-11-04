"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import UserDetailsDialog from "./UserDetailsDialog";
import { User } from "../types/user.types";

interface UsersTableProps {
  users: User[];
  isLoading: boolean;
}

const roleLabels = {
  user: "کاربر",
  admin: "مدیر",
  support: "پشتیبان",
};

export default function UsersTable({ users, isLoading }: UsersTableProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="py-10 text-center text-muted-foreground">
        در حال دریافت کاربران...
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-right">شناسه</TableHead>
            <TableHead className="text-right">نام و نام خانوادگی</TableHead>
            <TableHead className="text-right">شماره موبایل</TableHead>
            <TableHead className="text-right">نقش</TableHead>
            <TableHead className="text-right">وضعیت</TableHead>
            <TableHead className="text-right">تاریخ ثبت‌نام</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                کاربری پیدا نشد.
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow
                key={user.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleUserClick(user)}
              >
                <TableCell>{user.id}</TableCell>

                <TableCell>
                  {user.first_name} {user.last_name}
                </TableCell>

                <TableCell dir="ltr" className="text-right">
                  {user.mobile}
                </TableCell>

                <TableCell>{roleLabels[user.role]}</TableCell>

                <TableCell>
                  <span
                    className={
                      user.is_active ? "text-green-600" : "text-red-500"
                    }
                  >
                    {user.is_active ? "فعال" : "غیرفعال"}
                  </span>
                </TableCell>

                <TableCell>
                  {new Date(user.created_at).toLocaleDateString("fa-IR")}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <UserDetailsDialog
        user={selectedUser}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  );
}