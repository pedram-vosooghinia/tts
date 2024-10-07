"use client"
import { SWRConfig } from 'swr'
import { api } from '@/services/api'
export default function SwrProvider({ children }) {
  const fetcher = (url) => api.get(url).then(res => res.data)

  return (
      <>
        <SWRConfig
          value={{
            fetcher,
            revalidateOnFocus: false, 
            errorRetryCount: 3,
            refreshWhenOffline:true
          }}
        >
          {children}
        </SWRConfig>
      </>
  )
}
