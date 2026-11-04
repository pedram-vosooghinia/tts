import { api } from "@/services/api";
import { GetUsersParams, GetUsersResponse } from "../types/user.types";

export const getUsersServices = async (
  params: GetUsersParams,
): Promise<GetUsersResponse> => {
  const res = await api.get("/users", {
    params,
  });

  return res.data.data;
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
  role: "user" | "admin" | "support",
) => {
  const res = await api.patch(`/users/${id}/role`, {
    role,
  });

  return res.data;
};
