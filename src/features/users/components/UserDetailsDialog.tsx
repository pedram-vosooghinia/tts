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
import { useUser } from "../hooks/useUser";
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
  const { user: fetchedUser } = useUser(open && user ? user.id : null);
  const currentUser = fetchedUser ?? user;

  if (!currentUser) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <div className="bg-muted/40 px-6 py-7">
          <DialogHeader className="items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <UserIcon className="h-8 w-8" />
            </div>

            <DialogTitle className="mt-3 text-xl">
              {currentUser.first_name} {currentUser.last_name}
            </DialogTitle>

            <DialogDescription>جزئیات حساب کاربری</DialogDescription>

            <Badge
              variant={currentUser.is_active ? "default" : "destructive"}
              className="mt-2"
            >
              {currentUser.is_active ? "حساب فعال" : "حساب غیرفعال"}
            </Badge>
          </DialogHeader>
        </div>

        <UserInfoList user={currentUser} />

        <UserRoleEditor user={currentUser} onSuccess={() => onOpenChange(false)} />

        <UserStatusAction user={currentUser} onSuccess={() => onOpenChange(false)} />
          
      </DialogContent>
    </Dialog>
  );
}
