import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { MenuDashboard } from "@/components/menu/MenuDashboard";
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
      <body className={`rtl ${vazirFont.className} `}>
        <MenuDashboard />
        {children}
      </body>
    </html>
  );
}
