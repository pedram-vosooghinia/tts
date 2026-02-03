"use client";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

export default function SwiperComponent() {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
      className=" mt-12"
    >
      <SwiperSlide>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur harum
        qui blanditiis in culpa at, doloremque magnam quidem accusantium nihil
        enim facilis, quaerat saepe laboriosam aliquam dicta quibusdam aliquid
        esse illum officia ex cum quo! Eaque maxime corrupti eius. Illo,
        cupiditate. Dolor amet, eos iusto soluta exercitationem neque quia autem
        sapiente excepturi ut similique! Vel quae molestiae reiciendis! Numquam
        fuga dolor sit. Sunt quasi harum ipsam voluptate quibusdam rerum. Autem
        iste nam reprehenderit repellendus voluptates ipsa repellat omnis minus
        quia, voluptatem nemo, fuga quae. Debitis ut harum aperiam quasi? Modi
        ducimus possimus veniam atque consequuntur amet dicta quo tempora
        eligendi?
      </SwiperSlide>
      <SwiperSlide>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur harum
        qui blanditiis in culpa at, doloremque magnam quidem accusantium nihil
        enim facilis, quaerat saepe laboriosam aliquam dicta quibusdam aliquid
        esse illum officia ex cum quo! Eaque maxime corrupti eius. Illo,
        cupiditate. Dolor amet, eos iusto soluta exercitationem neque quia autem
        sapiente excepturi ut similique! Vel quae molestiae reiciendis! Numquam
        fuga dolor sit. Sunt quasi harum ipsam voluptate quibusdam rerum. Autem
        iste nam reprehenderit repellendus voluptates ipsa repellat omnis minus
        quia, voluptatem nemo, fuga quae. Debitis ut harum aperiam quasi? Modi
        ducimus possimus veniam atque consequuntur amet dicta quo tempora
        eligendi?
      </SwiperSlide>
      <SwiperSlide>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur harum
        qui blanditiis in culpa at, doloremque magnam quidem accusantium nihil
        enim facilis, quaerat saepe laboriosam aliquam dicta quibusdam aliquid
        esse illum officia ex cum quo! Eaque maxime corrupti eius. Illo,
        cupiditate. Dolor amet, eos iusto soluta exercitationem neque quia autem
        sapiente excepturi ut similique! Vel quae molestiae reiciendis! Numquam
        fuga dolor sit. Sunt quasi harum ipsam voluptate quibusdam rerum. Autem
        iste nam reprehenderit repellendus voluptates ipsa repellat omnis minus
        quia, voluptatem nemo, fuga quae. Debitis ut harum aperiam quasi? Modi
        ducimus possimus veniam atque consequuntur amet dicta quo tempora
        eligendi?
      </SwiperSlide>
      <SwiperSlide>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur harum
        qui blanditiis in culpa at, doloremque magnam quidem accusantium nihil
        enim facilis, quaerat saepe laboriosam aliquam dicta quibusdam aliquid
        esse illum officia ex cum quo! Eaque maxime corrupti eius. Illo,
        cupiditate. Dolor amet, eos iusto soluta exercitationem neque quia autem
        sapiente excepturi ut similique! Vel quae molestiae reiciendis! Numquam
        fuga dolor sit. Sunt quasi harum ipsam voluptate quibusdam rerum. Autem
        iste nam reprehenderit repellendus voluptates ipsa repellat omnis minus
        quia, voluptatem nemo, fuga quae. Debitis ut harum aperiam quasi? Modi
        ducimus possimus veniam atque consequuntur amet dicta quo tempora
        eligendi?
      </SwiperSlide>
    </Swiper>
  );
}
