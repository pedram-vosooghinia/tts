"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

export default function ConditionalHeader() {
  const pathname = usePathname();

  const isHomePage = pathname === "/";
  const searchAds = pathname.startsWith("/search");
  const shouldHeader = isHomePage || searchAds;
  // const searchShow = isHomePage ? true : false;
  return shouldHeader ? <Header  /> : null;
}
