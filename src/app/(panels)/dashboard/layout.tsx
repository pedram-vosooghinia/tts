export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto flex w-full max-w-[700px] flex-col px-4 pb-24 pt-6">
      {children}
    </main>
  );
}
