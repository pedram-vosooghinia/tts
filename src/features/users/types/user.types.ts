export type UserRole = "user" | "admin" | "support";

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  mobile: string;
  role: UserRole;
  is_active: boolean;
  created_at: string;
  update_at: string;
}

export interface UsersPaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface GetUsersResponse {
  data: User[];
  meta: UsersPaginationMeta;
}

export interface GetUsersParams {
  page?: number;
  limit?: number;
  isActive?: boolean;
  search?: string;
}
