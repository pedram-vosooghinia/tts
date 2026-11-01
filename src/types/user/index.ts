export interface User {
  id: number;
  first_name: string;
  last_name: string;
  mobile: string;
  is_active: boolean;
  role: "user" | "admin" | "support";
}