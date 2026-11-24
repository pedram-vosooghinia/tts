import type { Metadata } from "next";
import localFont from "next/font/local";
import ToastProvider from "@/provider/ToastProvider";
import SwrProvider from "@/provider/SwrProvider";
import Footer from "@/components/layout/footer";
import { cn } from "@/lib/utils";
import Header from "@/components/layout/header/Header";
import MenuBar from "@/components/layout/layout/MenuBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="mx-auto flex w-full max-w-[700px] flex-col px-4 pb-24 pt-6">
        {children}
      </main>
      <MenuBar/>
      <Footer />
    </>
  );
}
