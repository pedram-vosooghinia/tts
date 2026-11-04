"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";
import { User as UserIcon } from "lucide-react";
import type { User } from "../types/user.types";
import UserInfoList from "./UserInfoList";
import UserRoleEditor from "./UserRoleEditor";
import UserStatusAction from "./UserStatusAction";
interface UserDetailsDialogProps {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function UserDetailsDialog({
  user,
  open,
  onOpenChange,
}: UserDetailsDialogProps) {
  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <div className="bg-muted/40 px-6 py-7">
          <DialogHeader className="items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <UserIcon className="h-8 w-8" />
            </div>

            <DialogTitle className="mt-3 text-xl">
              {user.first_name} {user.last_name}
            </DialogTitle>

            <DialogDescription>جزئیات حساب کاربری</DialogDescription>

            <Badge
              variant={user.is_active ? "default" : "destructive"}
              className="mt-2"
            >
              {user.is_active ? "حساب فعال" : "حساب غیرفعال"}
            </Badge>
          </DialogHeader>
        </div>

        <UserInfoList user={user} />

        <UserRoleEditor user={user} onSuccess={() => onOpenChange(false)} />

        <UserStatusAction user={user} onSuccess={() => onOpenChange(false)} />
          
      </DialogContent>
    </Dialog>
  );
}
