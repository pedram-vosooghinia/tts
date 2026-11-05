import RoleGuard from "@/components/guards/RoleGuard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard allowedRoles={["user"]}>
      <div className="w-full space-y-6">{children}</div>
    </RoleGuard>
  );
}
