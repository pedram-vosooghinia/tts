import { User } from "@/types/user";

export function getDashboardPath(role: User["role"]) {
  switch (role) {
    case "admin":
      return "/admin";

    case "support":
      return "/support";

    case "user":
      return "/dashboard";

    default:
      return "/login";
  }
}
