"use client";

import { SWRConfig, type SWRConfiguration } from "swr";

interface SwrFallbackProviderProps {
  fallback: SWRConfiguration["fallback"];
  children: React.ReactNode;
}

export default function SwrFallbackProvider({
  fallback,
  children,
}: SwrFallbackProviderProps) {
  return <SWRConfig value={{ fallback }}>{children}</SWRConfig>;
}
