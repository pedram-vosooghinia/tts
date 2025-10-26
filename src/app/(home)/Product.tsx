import React from "react";
import { MdFileCopy } from "react-icons/md";
import { TfiGallery } from "react-icons/tfi";
import { CiLocationOn } from "react-icons/ci";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { PiPhoneCall } from "react-icons/pi";
import { CgMenuBoxed } from "react-icons/cg";
import { TbRoute2 } from "react-icons/tb";
import { useState } from "react";
const productsTabs = [
  {
    id: 1,
    title: "جزئیات",
    icon: <MdFileCopy size={11} />,
  },
  {
    id: 2,
    title: "گالری",
    icon: <TfiGallery size={11} />,
  },
  {
    id: 3,
    title: "آدرس",
    icon: <CiLocationOn size={11} />,
  },
  {
    id: 4,
    title: "اطلاعات بیشتر",
    icon: <IoIosInformationCircleOutline size={11} />,
  },
];
const productConenct = [
  {
    id: 1,
    title: "اطلاعات تماس",
    icon: <PiPhoneCall className="" size={20} />,
    backgroundFrom: "bg-[#82E468]",
    backgroundTo: "bg-[#58A544]",
  },
  {
    id: 2,
    title: "چت با مالک",
    icon: <IoChatbubbleEllipsesOutline size={20} />,
    backgroundFrom: "bg-[#797979]",
    backgroundTo: "bg-[#3F3F3F]",
  },
];
const moreDescription = [
  {
    id: 1,
    title: "معرفی فازها",
    icon: <CgMenuBoxed className="" size={15} />,
  },
  {
    id: 2,
    title: "جاذبه های گردشگری",
    icon: <TbRoute2 size={15} />,
  },
];

const Product = () => {
  const [activeTab, setActiveTab] = useState(1);
  const handleTabClick = (id: number) => {
    setActiveTab(id);
  };

  return (
    <>
      <div className=" mx-[17px] mb-5 mt-[15px] flex items-center justify-between gap-[11px]">
        {productConenct.map((connect) => (
          <div
            key={connect.id}
            className={`backdrop-blur-[19px] rounded-[100px] py-[15px] px-[18px] text-white flex items-center justify-center gap-2.5 ${connect.backgroundFrom} ${connect.backgroundTo} bg-gradient-to-r`}
          >
            <div className="text-xs font-bold tracking-tighter whitespace-nowrap">
              {connect.title}
            </div>
            <div>{connect.icon}</div>
          </div>
        ))}
      </div>
      <div className="rtl flex flex-col justify-end px-4  rounded-[60px] pt-[11px] border-y border-[#d66464]">
        <div className="flex items-center justify-center gap-2.5">
          {productsTabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`rounded-[50px] flex items-center gap-2.5 p-3   ${
                activeTab === tab.id ? "bg-[#58A544]" : "bg-gray-200"
              } 
              
              `}
            >
              <div
                className={`${
                  activeTab === tab.id ? "  text-white" : "text-[#303030]"
                }`}
              >
                {tab.icon}
              </div>
              <div
                className={`${
                  activeTab === tab.id ? "text-white" : "text-[#303030]"
                } font-bold text-xs tracking-tighter whitespace-nowrap`}
              >
                {tab.title}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-[21px] font-extrabold text-[13px] tracking-tighter">
          توضیحات بیشتر راجب محصول:{" "}
        </div>
        <div className="mt-1.5 pb-[34px] font-light text-[10px] tracking-[-0.06px]">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
          از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و
          سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
          متنوع با هدف و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی و دیزاین
          وبسایت به این شکل میباشد که است و رفته اساسا مورد استفاده قرار گیرد.
        </div>
      </div>
      <div className="flex items-center justify-center">
        {moreDescription.map((description) => (
          <div
            key={description.id}
            className={`bg-[#fafafa] my-[15px] flex items-center justify-center gap-[25px] rounded-[100px] p-[10px]`}
          >
            <div className="text-xs font-bold tracking-tighter whitespace-nowrap">
              {description.title}
            </div>
            <div>{description.icon}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Product;
