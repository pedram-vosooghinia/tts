"use client";
import { BiChevronLeft } from "react-icons/bi";
import { cn } from "@/lib/utils";
import { MainBannerSectionProps } from "@/types/slider";
import ProductSlider from "./ProductSlider";
import LoadingModal from "@/components/MainComponents/LoadingModal";
import useSWR from "swr";
import { apiFakestore } from "@/services/api";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export const MainProductSection = ({
  title,
  link,
  style,
}: MainBannerSectionProps) => {
  const { data: products, isLoading } = useSWR("products", (url) =>
    apiFakestore.get(url).then((res) => res.data),
  );

  if (isLoading) return <LoadingModal />;
  return (
    <section className={cn(`w-full flex flex-col gap-y-4`, style)} dir="rtl">
      <div className={`flex w-full justify-between items-center `}>
        {title && <h2 className="text-xl font-bold text-neutral-5">{title}</h2>}

        {link && (
          <Link href="/products">
            <Button
              variant="ghost"
              className=" flex justify-between gap-x-1 items-center text-neutral-4 hover:bg-neutral-8 text-sm font-medium hover:text-neutral-4 transition-colors"
            >
              <span>نمایش همه</span>
              <BiChevronLeft className="inline" />
            </Button>
          </Link>
        )}
      </div>

      <ProductSlider hasCaption={true} data={products} />
    </section>
  );
};
