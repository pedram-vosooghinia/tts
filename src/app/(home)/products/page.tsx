"use client";

import ProductCard from "@/components/home/products/ProductCard";
import LoadingModal from "@/components/MainComponents/LoadingModal";
import { apiFakestore } from "@/services/api";
import useSWR from "swr";

export default function Products() {
  const { data: products, isLoading } = useSWR("products", (url) =>
    apiFakestore.get(url).then((res) => res.data),
  );

  if (isLoading) return <LoadingModal />;
  return (
    <>
      <div className=" flex justify-center items-center flex-wrap gap-6">
        {products.map((item: Product) => (
          <ProductCard product={item} key={item.id} />
        ))}
      </div>
    </>
  );
}
