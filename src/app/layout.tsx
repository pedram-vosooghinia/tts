import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ToastProvider from "@/provider/ToastProvider";
import SwrProvider from "@/provider/SwrProvider";
import { cn } from "@/lib/utils";
const yekanBakh = localFont({
  src: [
    {
      path: "./fonts/YekanBakhFaNum-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/YekanBakhFaNum-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/YekanBakhFaNum-SemiBold.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/YekanBakhFaNum-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/YekanBakhFaNum-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-yekan",
  display: "swap",
});

export const metadata: Metadata = {
  title: "tts",
  description: "E-commerse",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={cn(
          yekanBakh.variable,
          "relative min-h-screen bg-background font-yekan antialiased"
        )}
      >
        <SwrProvider>
          <ToastProvider>{children}</ToastProvider>
        </SwrProvider>
      </body>
    </html>
  );
}
