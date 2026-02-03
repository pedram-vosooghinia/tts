"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { BiChevronLeft } from "react-icons/bi";
import Link from "next/link";

export default function ProductSlider({
  hasCaption,
  data,
}: {
  hasCaption?: boolean;
  data?: Product[];
}) {
  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  return (
    <div className="w-full ">
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
        {data?.map((slide: Product, index: number) => (
          <SwiperSlide key={slide.id}>
            <div className="flex flex-col gap-3">
              <div
                // href={`/business/${data?.id}/${item?.id}`}
                className="relative w-full overflow-hidden rounded-2xl shadow-sm"
              >
                <Image
                  src={slide.image}
                  alt={slide.title || "بنر تبلیغاتی"}
                  width={500}
                  height={700}
                  className="h-44 object-cover"
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 100vw"
                />
              </div>

              {hasCaption && (
                <div className="flex items-center justify-between px-1">
                  <span className="text-base font-bold text-gray-800">
                    {slide?.title}
                  </span>
                  <Link
                    href={`/${slide?.id}`}
                    className="flex items-center gap-1 text-sm font-medium text-green-700 hover:text-green-800 transition-colors"
                  >
                    {"نمایش بیشتر"}
                    <BiChevronLeft className="inline" />
                  </Link>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .swiper-pagination-bullet.custom-bullet {
          width: 8px;
          height: 8px;
          background-color: #e5e7eb;
          opacity: 1;
          border-radius: 50%;
          transition: all 0.3s ease;
          margin: 0 4px !important;
          display: inline-block;
        }
        .swiper-pagination-bullet-active.custom-bullet-active {
          width: 73px;
          background-color: #15803d;
          border-radius: 999px;
        }
      `}</style>
    </div>
  );
}
