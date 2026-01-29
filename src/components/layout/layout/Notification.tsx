'use client'
import useAuthFetcher from '@/app/hook/useAuthFetcher'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import notif from '@/public/icons/notif.svg'

export default function Notification() {
    const [data, setData] = useState()
    const [liading, setLiading] = useState(false)
    const fetchData = async ()=>{
        try {
          setLiading(true)
            const res = await useAuthFetcher(`${process.env.NEXT_PUBLIC_API}/v2/dashboard/all/notification/count/notread`)
            
            setData(res)
        } catch (error) {
            
        }finally{
          setLiading(false)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    
    if(liading){
      return (
        <Link href={'/notifications'}
        className="bg-white cursor-pointer  relative mx-1 rounded-lg w-[40px] h-[40px] transition-all duration-200 ease-in-out active:scale-95 flex justify-center items-center shadow-md"
      >
        <Image src={notif} width={20} height={20} alt=""/>
      </Link>
      )
    }
  return (
    <Link href={'/notifications'}
    className="bg-white cursor-pointer  relative mx-1 rounded-lg w-[40px] h-[40px] transition-all duration-200 ease-in-out active:scale-95 flex justify-center items-center shadow-md"
  >
    <Image src={notif} width={20} height={20} alt=""/>
    {data !== 0 && 
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-orange-500 rounded-full"></span>
          }
  </Link>
  )
}
