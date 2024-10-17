import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { MenuDashboard } from "@/components/menu/MenuDashboard";
import ToastProvider from "@/provider/ToastProvider";
import SwrProvider from "@/provider/SwrProvider";
const vazirFont = localFont({
  src: "./fonts/Vazir-Medium.woff2",
  variable: "--font-geist-mono",
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
    <html lang="en">
      <body className={`rtl ${vazirFont.className} flex flex-col min-h-screen  `}>
          <SwrProvider>
            <ToastProvider>
              <MenuDashboard />
              <div className="body flex-grow pt-28   ">
                {children}
              </div>
            </ToastProvider>
          </SwrProvider>
      </body>
    </html>
  );
}
