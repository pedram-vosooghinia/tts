"use client";

import { usePathname } from "next/navigation";
import Footer from "./footer";
import MenuBar from "./layout/MenuBar";

const PANEL_PATHS = ["/dashboard", "/support"];

function isPanelPath(pathname: string) {
  return PANEL_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

export default function AppChrome() {
  const pathname = usePathname();

  if (isPanelPath(pathname)) return null;

  return (
    <>
      <Footer />
      <MenuBar />
    </>
  );
}
