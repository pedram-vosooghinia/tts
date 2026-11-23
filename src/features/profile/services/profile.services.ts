import { api } from "@/services/api";

import type { UpdateProfileDto } from "../types/profile.types";

export const updateProfileService = async (data: UpdateProfileDto) => {
  const res = await api.patch("/users/profile", data);

  return res.data.data ?? res.data;
};
