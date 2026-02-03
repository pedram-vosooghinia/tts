"use client"
import { BiChevronLeft } from "react-icons/bi";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MainBannerSectionProps } from "@/types/slider";
import ProductSlider from "./ProductSlider";
import LoadingModal from "@/components/MainComponents/LoadingModal";
import useSWR from "swr";
import { apiFakestore } from "@/services/api";

export const MainProductSection = ({
  title,
  link,
  style,
}: MainBannerSectionProps) => {
  const { data: products, isLoading } = useSWR("products", (url) =>
    apiFakestore.get(url).then((res) => res.data),
  );

  if (isLoading) return <LoadingModal />;
  console.log("p", products);
  return (
    <section
      className={cn(`w-full flex flex-col max-w-md mx-auto  gap-y-4`, style)}
      dir="rtl"
    >
      <div className={`flex justify-between items-center `}>
        {title && <h2 className="text-xl font-bold text-primary">{title}</h2>}

        {link && (
          <Link
            href={link || "/"}
            className="flex items-center text-greenprimary text-sm font-medium hover:text-green-950 transition-colors"
          >
            نمایش همه
            <BiChevronLeft className="inline" />
          </Link>
        )}
      </div>

      <ProductSlider hasCaption={true} data={products} />
    </section>
  );
};
