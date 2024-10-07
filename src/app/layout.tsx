import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { MenuDashboard } from "@/components/menu/MenuDashboard";
import { ThemeProvider } from "@/provider/ThemeProvider";
import ToastProvider from "@/provider/ToastProvider";
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
      <body className={`rtl ${vazirFont.className} flex flex-col min-h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ToastProvider>
            <MenuDashboard />
            <div className="body flex-grow pt-20 md:pt-28   ">{children}</div>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
