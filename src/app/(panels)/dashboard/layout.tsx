import RoleGuard from "@/components/guards/RoleGuard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RoleGuard allowedRoles={["user"]}>{children}</RoleGuard>;
}
