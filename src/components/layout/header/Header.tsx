"use client";
import Image from "next/image";
import logo from "@/public/images/home/tts-logo.jpg";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import { ReturnButton } from "./ReturnButton";
// import SearchComponent from "./Search";
const MenuDrawer = dynamic(() => import("./MenuDrawer"), {
  ssr: false,
  loading: () => (
    <Button variant="outline" className="">
      <MenuIcon size={28} />
    </Button>
  ),
});

// import SearchComponent from "../homePage/Search";
export default function Header() {


  return (
    <>
      <div className="bg-thirdGray w-full max-w-[43.75rem] sticky top-0 z-[30]  px-6 pb-2.5 rounded-b-2xl ">
        <div className="w-full flex justify-between  items-center pt-4   ">
          <MenuDrawer />
          <div className="flex justify-center items-center">
            <h1 className="text-3xl font-bold text-mainGold ">tts </h1>
          </div>

          <Link href="/" className="justify-self-end">
            <Image
              src={logo.src}
              loading="eager"
              alt="دس به دس"
              width={50}
              height={50}
              className=" object-contain min-w-[50px] rounded-full"
              priority={true}
            />
          </Link>
        </div>
        <div className=" mx-auto border-t border-e-grayborder my-2.5"></div>
        <div className="flex justify-between items-center">
          <ReturnButton />
          {/* <SearchComponent /> */}
        </div>
      </div>
    </>
  );
}
