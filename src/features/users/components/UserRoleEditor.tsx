"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import type { User } from "../types/user.types";
import { useUpdateUserRole } from "../hooks/useUpdateUserRole";

type AssignableRole = "user" | "support";

interface UserRoleEditorProps {
  user: User;
  onSuccess?: () => void;
}

const roleLabels: Record<AssignableRole, string> = {
  user: "کاربر عادی",
  support: "پشتیبان",
};

export default function UserRoleEditor({
  user,
  onSuccess,
}: UserRoleEditorProps) {
  const [selectedRole, setSelectedRole] = useState<AssignableRole>(
    user.role === "admin" ? "user" : user.role,
  );

  const [confirmOpen, setConfirmOpen] = useState(false);

  const { updateRole,  isUpdatingRole } = useUpdateUserRole();

  const handleRoleChange = async () => {
    if (selectedRole === user.role) return;

    const success = await updateRole(user.id, selectedRole);

    if (success) {
      setConfirmOpen(false);
      onSuccess?.();
    }
  };

  return (
    <div className="space-y-3 border-t px-6 py-4">
      <label className="text-sm font-medium">تغییر نقش کاربر</label>

      {user.role === "admin" ? (
        <p className="text-sm text-muted-foreground">
          نقش مدیر از طریق این بخش قابل تغییر نیست.
        </p>
      ) : (
        <>
          <div className="flex items-center gap-3">
            <Select
              value={selectedRole}
              onValueChange={(value) =>
                setSelectedRole(value as AssignableRole)
              }
            >
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="انتخاب نقش" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="user">کاربر عادی</SelectItem>

                <SelectItem value="support">پشتیبان</SelectItem>
              </SelectContent>
            </Select>

            <Button
              disabled={selectedRole === user.role || isUpdatingRole}
              onClick={() => setConfirmOpen(true)}
            >
              ذخیره نقش
            </Button>
          </div>

          <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>تغییر نقش کاربر</AlertDialogTitle>

                <AlertDialogDescription>
                  آیا از تغییر نقش این کاربر به {roleLabels[selectedRole]}{" "}
                  اطمینان داری؟
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel disabled={isUpdatingRole}>
                  انصراف
                </AlertDialogCancel>

                <AlertDialogAction
                  disabled={isUpdatingRole}
                  onClick={(event) => {
                    event.preventDefault();
                    handleRoleChange();
                  }}
                >
                  {isUpdatingRole ? "در حال ذخیره..." : "تأیید تغییر نقش"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </div>
  );
}
