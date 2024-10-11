"use client";
export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col min-h-screen ">
      <div className="body flex-grow pt-20 md:pt-28   ">{children}</div>
    </div>
  );
}