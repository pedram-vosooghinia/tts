"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

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
import { useUpdateUserStatus } from "../hooks/useUpdateUserStatus";

interface UserStatusActionProps {
  user: User;
  onSuccess?: () => void;
}

export default function UserStatusAction({
  user,
  onSuccess,
}: UserStatusActionProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const { updateStatus, isUpdatingStatus } = useUpdateUserStatus();

  const handleStatusChange = async () => {
    const success = await updateStatus(user.id, !user.is_active);

    if (success) {
      setConfirmOpen(false);
      onSuccess?.();
    }
  };

  return (
    <>
      <div className="border-t px-6 py-4">
        <Button
          variant={user.is_active ? "destructive" : "default"}
          className="w-full"
          onClick={() => setConfirmOpen(true)}
          disabled={isUpdatingStatus}
        >
          {user.is_active ? "غیرفعال کردن حساب کاربر" : "فعال کردن حساب کاربر"}
        </Button>
      </div>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {user.is_active ? "غیرفعال کردن حساب؟" : "فعال کردن حساب؟"}
            </AlertDialogTitle>

            <AlertDialogDescription>
              آیا از {user.is_active ? "غیرفعال" : "فعال"} کردن حساب{" "}
              {user.first_name} {user.last_name} اطمینان داری؟
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isUpdatingStatus}>انصراف</AlertDialogCancel>

            <AlertDialogAction
              disabled={isUpdatingStatus}
              onClick={(event) => {
                event.preventDefault();
                handleStatusChange();
              }}
            >
              {isUpdatingStatus ? "در حال انجام..." : "تأیید"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
