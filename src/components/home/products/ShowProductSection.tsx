"use client";
import { BiChevronLeft } from "react-icons/bi";
import { cn } from "@/lib/utils";
import { ShowBannerSectionProps } from "@/types/slider";
import ProductSlider from "./ProductSlider";
import useSWR from "swr";
import Link from "next/link";
import { ButtonBase } from "@/components/ui/primitives";
import { fetcherMixinApi } from "@/provider/fetchers";
import { ProductSliderSkeleton } from "./ProductSliderSkeleton";
export const ShowProductSection = ({
  title,
  link,
  style,
  fetchUrl
}:ShowBannerSectionProps ) => {
const { data, isLoading , error } = useSWR(fetchUrl, fetcherMixinApi);
  return (
    <section className={cn(`w-full fcc  gap-y-4`, style)} dir="rtl">
      <div className={`fbc  w-full  `}>
        {title && <h2 className="text-xl font-bold text-mainBlack">{title}</h2>}

        {link && (
          <>
            <ButtonBase
              className=" fjc gap-x-1 items-center   "
              variant="ghost"
            >
              <Link href="/products">نمایش همه</Link>
              <BiChevronLeft />
             </ButtonBase>
          </>
        )}
      </div>
       <>
      {!isLoading && !error  &&  data?.result ? (
        <ProductSlider  data={data?.result} />
        ) :<ProductSliderSkeleton/> }
        </>
    </section>
  );
};
