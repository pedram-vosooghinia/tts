"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Card, CardContent } from "@/components/ui/card";
import ProductImage from "./ProductImage";
import { ProductItem } from "@/types/product";

export default function ProductSlider({
  data,
}: {
  hasCaption?: boolean;
  data?: ProductItem[];
}) {
  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  return (
    <>
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={16}
        slidesPerView={1.5}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet custom-bullet",
          bulletActiveClass:
            "swiper-pagination-bullet-active custom-bullet-active",
        }}
        className="w-full !pb-16"
      >
        {data?.map((product: ProductItem) => (
          <SwiperSlide key={product?.id}>
            <Card
              key={product?.id}
              className="bg-mainblack shadow-lg rounded-2xl overflow-hidden flex flex-col w-full max-w-[350px] "
            >
              <CardContent className="p-4 flex flex-col justify-between h-full">
                <ProductImage
                  src={product?.images[0].image}
                  alt={product?.images[0].image_alt || ""}
                />

                <h2 className=" cursor-pointer text-mainWhite text-lg font-semibold mt-4 line-clamp-1">
                  {product?.name}
                </h2>

                <div className="flex justify-between items-center mt-2 text-sm">
                  <span className="text-mainWhite">{product?.brand}</span>
                </div>

                <span className="text-mainWhite mt-2">{product?.price} $</span>
              </CardContent>
            </Card>
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
    </>
  );
}
