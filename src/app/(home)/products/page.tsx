"use client";

import ProductCard from "@/components/home/products/ProductCard";
import { fetcherMixinApi } from "@/provider/fetchers";
import useSWR from "swr";
import { ProductItem } from "@/types/product";
import { ProductCardSkeleton } from "@/components/home/products/ProductCardSkeleton";

export default function Products() {
  const { data: products, isLoading = true } = useSWR(
    "management/v1/products",
    fetcherMixinApi,
  );

  return (
    <>
      <div className=" w-full flex justify-between items-start flex-wrap gap-6">
        {isLoading &&
          Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}

        {!isLoading &&
          products?.result.map((item: ProductItem) => (
            <ProductCard product={item} key={item.id} />
          ))}
      </div>
    </>
  );
}
