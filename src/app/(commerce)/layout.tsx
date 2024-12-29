import { MenuDashboard } from "@/components/menu/MenuDashboard";
import "../globals.css";
import localFont from "next/font/local";
import ToastProvider from "@/provider/ToastProvider";
import SwrProvider from "@/provider/SwrProvider";

const vazirFont = localFont({
  src: "../fonts/Vazir-Medium.woff2",
  variable: "--font-geist-mono",
});
export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`rtl ${vazirFont.className} flex flex-col min-h-screen `}
      >
        <ToastProvider>
          <SwrProvider>
            <div className="pb-28 ">
              <MenuDashboard />
            </div>
            {children}
          </SwrProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
