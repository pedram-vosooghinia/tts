"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Layers } from "lucide-react";

export default function HomeHero() {
  // if (!Array.isArray(data) || data.length === 0) {
  //   return null;
  // }
  return (
    // <div className="w-full   flex flex-col items-center max-w-xl mx-auto  gap-y-4">
    //   <Swiper
    //     modules={[Pagination, Autoplay]}
    //     spaceBetween={16}
    //     slidesPerView={1}
    //     autoplay={{ delay: 4000, disableOnInteraction: false }}
    //     pagination={{
    //       clickable: true,
    //       bulletClass: "swiper-pagination-bullet custom-bullet",
    //       bulletActiveClass:
    //         "swiper-pagination-bullet-active custom-bullet-active",
    //     }}
    //     className="w-full pb-10!"
    //   >
    //     {data?.map((slide: SliderDataType, index: number) => (
    //       <SwiperSlide key={slide.id}>
    //         <div className="flex flex-col items-center gap-3">
    //           <div className="relative w-full overflow-hidden rounded-2xl shadow-xs">
    //             <Image
    //               src={slide?.image_url}
    //               alt={slide?.title || "بنر تبلیغاتی"}
    //               width={700}
    //               height={700}
    //               className="h-44 object-cover"
    //               priority={index === 0}
    //               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 100vw"
    //             />
    //           </div>
    //         </div>
    //       </SwiperSlide>
    //     ))}
    //   </Swiper>

    //   <style jsx global>{`
    //     .swiper-pagination-bullet.custom-bullet {
    //       width: 8px;
    //       height: 8px;
    //       background-color: #dddfde;
    //       opacity: 1;
    //       border-radius: 50%;
    //       transition: all 0.3s ease;
    //       margin: 0 4px !important;
    //       display: inline-block;
    //     }
    //     .swiper-pagination-bullet-active.custom-bullet-active {
    //       width: 73px;
    //       background-color: #232325;
    //       border-radius: 999px;
    //     }
    //   `}</style>
    // </div>
    <section className="relative overflow-hidden rounded-2xl bg-primary px-6 py-10 text-primary-foreground shadow-soft">
      <div className="relative z-10 flex flex-col gap-4">
        <span className="inline-flex w-fit items-center rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-medium">
          فروشگاه TTS
        </span>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold leading-tight sm:text-3xl">
            همه چیز که نیاز دارید، در یک جا
          </h1>

          <p className="max-w-md text-sm leading-6 text-primary-foreground/85">
            محصولات و دسته‌بندی‌ها را مرور کنید و به‌راحتی آنچه می‌خواهید را
            پیدا کنید.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Button asChild variant="secondary" className="gap-2">
            <Link href="/categories">
              <Layers className="h-4 w-4" />
              مشاهده دسته‌بندی‌ها
            </Link>
          </Button>
        </div>
      </div>

      <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-primary-foreground/10" />
      <div className="absolute -bottom-12 left-16 h-28 w-28 rounded-full bg-primary-foreground/10" />
    </section>
  );
}
