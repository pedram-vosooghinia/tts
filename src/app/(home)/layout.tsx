import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import ToastProvider from "@/provider/ToastProvider";
import SwrProvider from "@/provider/SwrProvider";
import { MenuDashboard } from "@/components/layout/menu/MenuDashboard";
import Footer from "@/components/layout/footer";
const vazirFont = localFont({
  src: "../fonts/Vazir-Medium.woff2",
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
      <body className={`rtl ${vazirFont.className} flex flex-col min-h-screen`}>
        <main className="w-full h-screen flex flex-col  ">
          <ToastProvider>
            <SwrProvider>
              <MenuDashboard />

              <div className="pt-28 bg-theme text-theme">{children}</div>
              <Footer/>
            </SwrProvider>
          </ToastProvider>
        </main>
      </body>
    </html>
  );
}
