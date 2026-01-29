"use client";
import Image from "next/image";
import logo from "@/public/images/home/tts-logo.jpg";
import Link from "next/link";
import MenuDrawer from "./MenuDrawer";
// import SearchComponent from "../homePage/Search";
export default function Header() {
  return (
    <>
      <div className="bg-white w-full sticky top-0 z-[30]  px-6 pb-2.5 rounded-b-2xl ">
        <div className="w-full flex justify-between  items-center pt-4   ">
          <MenuDrawer />
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
        <div className="max-w-[580px] mx-auto border-t border-e-grayborder my-2.5"></div>
        {/* {searchShow && <SearchComponent />} */}
      </div>
    </>
  );
}
