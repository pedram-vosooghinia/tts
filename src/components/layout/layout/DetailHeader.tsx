"use client";

import React from "react";
import { BsShare } from "react-icons/bs";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { HiChevronRight } from "react-icons/hi2";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Shopping from "@/app/components/layout/Shoping";
interface SliderNavbarProps {
  isFavorite?: boolean;
  showFavorite?: boolean;
  showNotification?: boolean;
  onShareClick?: () => void;
  onNotificationClick?: () => void;
  onFavoriteClick?: () => void;
  onReturnClick?: () => void;
  showReturn?: boolean;
  isBusiness?: boolean;
}

const DetailHeader: React.FC<SliderNavbarProps> = ({
  showNotification,
  isFavorite,
  showFavorite,
  onShareClick,
  onNotificationClick,
  onFavoriteClick,
  onReturnClick,
  showReturn = true,
  isBusiness,
}) => {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <div className="z-30 w-full mt-2" dir="rtl">
      <div className="  flex justify-between flex-nowrap items-center px-3 w-full">
        {showReturn && (
          <div className=" flex justify-start">
            <button
              onClick={onReturnClick}
              className="w-10 h-10 backdrop-blur-md bg-white/70 flex items-center justify-center rounded-full shadow-sm"
              aria-label="بازگشت"
              style={{ boxShadow: "rgb(189 189 189 / 95%) 0px 0px 10px -1px" }}
            >
              <HiChevronRight className="text-[#8D8D8D]  " />
            </button>
          </div>
        )}
        <div className="  w-full flex items-center justify-end space-x-2 space-x-reverse">
          {showFavorite && (
            <button
              onClick={onFavoriteClick}
              className="w-10 h-10 backdrop-blur-md bg-white/70 flex items-center justify-center rounded-full shadow-sm"
              style={{ boxShadow: "rgb(189 189 189 / 95%) 0px 0px 10px -1px" }}
              aria-label={
                isFavorite ? "حذف از علاقه‌مندی" : "افزودن به علاقه‌مندی"
              }
            >
              {isFavorite ? (
                <FaHeart className="text-[#ff0000]  " />
              ) : (
                <FaRegHeart className="text-[#8D8D8D]  " />
              )}
            </button>
          )}

          {isDashboard && isBusiness !== true && (
            <Link
              href="/dashboard/dashboard-register-business"
              className="relative animate-shineMove group w-auto h-10 px-4 backdrop-blur-md bg-white/70 flex items-center justify-center rounded-full shadow-sm overflow-hidden"
              style={{ boxShadow: "rgb(189 189 189 / 95%) 0px 0px 10px -1px" }}
            >
              <span className="text-[#8D8D8D] text-xs z-10">
                کسب و کار خودت رو بساز
              </span>

              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent translate-x-[-150%] animate-[shineMove_2s_linear_infinite] rounded-full" />
            </Link>
          )}

          {showNotification && (
            <button
              onClick={onNotificationClick}
              className="w-10 h-10 backdrop-blur-md bg-white/70 flex items-center justify-center rounded-full shadow-sm"
              aria-label="اعلان"
              style={{ boxShadow: "rgb(189 189 189 / 95%) 0px 0px 10px -1px" }}
            >
              <IoNotificationsOutline className="text-[#8D8D8D]  " />
            </button>
          )}
          <button
            onClick={onShareClick}
            className="w-10 h-10 backdrop-blur-md bg-white/70 flex items-center justify-center rounded-full shadow-sm"
            aria-label="اشتراک‌گذاری"
            style={{ boxShadow: "rgb(189 189 189 / 95%) 0px 0px 10px -1px" }}
          >
            <BsShare className="text-[#8D8D8D] " />
          </button>

          <Shopping />
        </div>
      </div>
    </div>
  );
};

export default DetailHeader;
