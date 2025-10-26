import React from "react";
import { FaHeart } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { PiPhoneCallFill } from "react-icons/pi";
import { BiSolidCategoryAlt } from "react-icons/bi";
import saved from "@/public/images/dashboard/saved.svg";
import Image from "next/image";
const businessDashboardItems = [
  {
    id: 1,
    title: "(لایک)",
    icon: <FaHeart size={18} className="text-[#595959]" />,
    number: 325,
  },
  {
    id: 2,
    title: "(ذخیره)",
    icon: <Image src={saved} alt="saved" width={18} height={18} />,
    number: 42,
  },
  {
    id: 3,
    title: "(بازدید)",
    icon: <IoEye size={18} className="text-[#595959]" />,
    number: 325,
  },
  {
    id: 4,
    title: "(تماس)",
    icon: <PiPhoneCallFill size={18} className="text-[#595959]" />,
    number: 42,
  },
];

const businessDashboardLinkItems = [
  {
    id: 1,
    title: "املاک",
    link: "/",
    icon: <PiPhoneCallFill size={11} className="text-[#595959]" />,
  },
  {
    id: 2,
    title: "نیازمندیها",
    link: "/",
    icon: <PiPhoneCallFill size={11} className="text-[#595959]" />,
  },
  {
    id: 3,
    title: "استخدام",
    link: "/",
    icon: <PiPhoneCallFill size={11} className="text-[#595959]" />,
  },
  {
    id: 1,
    title: "کاریابی",
    link: "/",
    icon: <PiPhoneCallFill size={11} className="text-[#595959]" />,
  },
  {
    id: 1,
    title: "رویداد",
    link: "/",
    icon: <PiPhoneCallFill size={11} className="text-[#595959]" />,
  },
  {
    id: 1,
    title: "آب و هوا",
    link: "/",
    icon: <PiPhoneCallFill size={11} className="text-[#595959]" />,
  },
  {
    id: 1,
    title: "یادداشت",
    link: "/",
    icon: <PiPhoneCallFill size={11} className="text-[#595959]" />,
  },
  {
    id: 1,
    title: "نشان شده",
    link: "/",
    icon: <PiPhoneCallFill size={11} className="text-[#595959]" />,
  },
  {
    id: 1,
    title: "پشتیبانی",
    link: "/",
    icon: <PiPhoneCallFill size={11} className="text-[#595959]" />,
  },
];
const BusinessDashborad = () => {
  return (
    <div className=" w-full  rounded-[60px] border-y border-[#d66464] p-[15px] ">
      <div className="mt-[11px] mb-[8px] flex items-center justify-center gap-2 ">
        <h2 className=" tracking-tighter font-extrabold text-[15px] text-[#373737] whitespace-nowrap">
          داشبورد کسب و کار
        </h2>
        <BiSolidCategoryAlt size={17} className="text-[#292D32]" />
      </div>
      <div className="rtl  overflow-hidden  rounded-[25px] w-full flex items-center gap-5  ">
        <div className=" w-[130px] py-7 bg-gradient-to-r from-[#82E468] to-[#58A544] pr-[22px] ">
          <div className="text-white   whitespace-nowrap ">اشتراک شما:</div>
          <div className="text-[12px]  font-extrabold tracking-tighter text-white">
            29 روز مانده
          </div>
        </div>
        <div className="flex  flex-wrap justify-center items-center gap-[35px]  ">
          {businessDashboardItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center justify-center "
            >
              <div>{item.icon}</div>
              <div className="mt-[5px] mb-0.5 font-bold text-[11px] tracking-tighter text-[#585858]">
                {item.number}
              </div>
              <div className="font-light text-[9px] tracking-tighter text-[#585858]">
                {item.title}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="rtl grid grid-cols-4   gap-[10px] mt-5 mb-[26px]">
        {businessDashboardLinkItems.map((item) => (
          <div
            key={item.id}
            className="bg-yellow-200 flex  items-center justify-center gap-1 rounded-[50px] px-3 py-[11px] "
          >
            <div>{item.icon}</div>
            <div className="font-normal text-[12px] tracking-tighter text-[#303030]">
              {item.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessDashborad;
