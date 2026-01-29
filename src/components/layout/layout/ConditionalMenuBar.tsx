"use client";

import { usePathname } from "next/navigation";
import MenuBar from "./MenuBar";
export default function ConditionalMenuBar() {
  const pathname = usePathname();

  const hiddenPaths = ["/auth/login"];

  // const isBusinessDynamic = /^\/business\/[^/]+$/.test(pathname);

  // const shouldHideHeader = hiddenPaths.includes(pathname) || isBusinessDynamic;
  const shouldHideHeader = hiddenPaths.includes(pathname);

  return shouldHideHeader ? null : <MenuBar />;
}
