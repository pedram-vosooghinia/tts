"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { SliderDataType } from "@/types/slider";

export default function BannerSlider({
  data,
}: {
  hasCaption?: boolean;
  data?: SliderDataType[];
}) {
  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }
console.log("data",data)
  return (
    <div className="w-full   flex flex-col items-center max-w-xl mx-auto  gap-y-4">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={16}
        slidesPerView={1}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet custom-bullet",
          bulletActiveClass:
            "swiper-pagination-bullet-active custom-bullet-active",
        }}
        className="w-full !pb-10"
      >
        {data?.map((slide: SliderDataType, index: number) => (
          <SwiperSlide key={slide.id}>
            <div className="flex flex-col items-center gap-3">
              <div className="relative w-full overflow-hidden rounded-2xl shadow-sm">
                <Image
                  src={slide?.image_url}
                  alt={slide?.title || "بنر تبلیغاتی"}
                  width={700}
                  height={700}
                  className="h-44 object-cover"
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 100vw"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .swiper-pagination-bullet.custom-bullet {
          width: 8px;
          height: 8px;
          background-color: #dddfde;
          opacity: 1;
          border-radius: 50%;
          transition: all 0.3s ease;
          margin: 0 4px !important;
          display: inline-block;
        }
        .swiper-pagination-bullet-active.custom-bullet-active {
          width: 73px;
          background-color: #232325;
          border-radius: 999px;
        }
      `}</style>
    </div>
  );
}
