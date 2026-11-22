import { api } from "@/services/api";



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
