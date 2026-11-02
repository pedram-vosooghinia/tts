"use client";
import { SWRConfig } from "swr";
import { fetcherApi } from "./fetchers";
interface SwrProviderProps {
  children: React.ReactNode;
}

export default function SwrProvider({ children }: SwrProviderProps) {
  return (
    <>
      <SWRConfig
        value={{
          fetcher: fetcherApi,
          revalidateOnFocus: false,
          // errorRetryCount: 1,
          // refreshWhenOffline: true,
          shouldRetryOnError: false,
          dedupingInterval: 2000,
        }}
      >
        {children}
      </SWRConfig>
    </>
  );
}
