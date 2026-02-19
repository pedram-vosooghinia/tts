"use client";

import ProductCard from "@/components/home/products/ProductCard";
import { fetcherMixinApi } from "@/provider/fetchers";
import useSWR from "swr";
import { ProductItem } from "@/types/product";
import { ProductCardSkeleton } from "@/components/home/products/ProductCardSkeleton";

export default function Products() {
  const { data, isLoading = true } = useSWR(
    "management/v1/products",
    fetcherMixinApi,
  );
  return (
    <>
      <div className="bg-red-400 w-full flex justify-center   sm:justify-between  items-center flex-wrap gap-y-6">
        {isLoading &&
          data &&
          Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}

        {!isLoading &&
          data &&
          data?.result.map((item: ProductItem) => (
            <ProductCard product={item} key={item.id} />
          ))}
      </div>
    </>
  );
}
