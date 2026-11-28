import { api } from "@/services/api";
import type { CreateUserDto, User } from "../types/user.types";

export const createUserService = async (data: CreateUserDto): Promise<User> => {
  const res = await api.post("/users", data);
  return res.data.data ?? res.data;
};

export const getUserService = async (id: number | string): Promise<User> => {
  const res = await api.get(`/users/${id}`);
  return res.data.data ?? res.data;
};

export const updateUserStatusService = async (
  id: number,
  is_active: boolean,
) => {
  const res = await api.patch(`/users/${id}/status`, {
    is_active,
  });

  return res.data;
};

export const updateUserRoleService = async (
  id: number,
  role: "user"  | "support",
) => {
  const res = await api.patch(`/users/${id}/role`, {
    role,
  });

  return res.data;
};
