import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { MenuDashboard } from "@/components/menu/MenuDashboard";
import { ThemeProvider } from "@/provider/ThemeProvider";
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
        <ThemeProvider 
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange>
          <MenuDashboard />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
