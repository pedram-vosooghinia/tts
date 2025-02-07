"use client";
import { useState } from "react";
import ProductCart from "@/components/dashboard/preForma/carts/ProductCart";
import LoadingModal from "@/components/MainComponents/LoadingModal";
// import PrimeryCard from "@/components/dashboard/product/PrimeryCard";

import { Button } from "@/components/ui/button";
import useSWR from "swr";
import { Product } from "@/types/product";
export default function New() {
  const [searchedProduct, setSearchedProduct] = useState<Product | null>(null);
 
  // const { data: prodctData, isLoading } = useSWR("/products/get");

  const { data: prodctData, isLoading } = useSWR("/proxy/getProduct");


  if (isLoading) {
    return <LoadingModal />;
  }

  const handleClearSearch = () => {
    setSearchedProduct(null);
  };
  const products = Array.isArray(prodctData) ? prodctData : [];

  return (
    <>
      {searchedProduct && (
        <div className="flex justify-center items-center m-4">
          <Button
            onClick={handleClearSearch}
            className="bg-red-500  hover:bg-red-700"
          >
            حذف جستجو
          </Button>
        </div>
      )}
      <div className="flex flex-col justify-center items-center">
       
        <div className="flex justify-center flex-wrap">
        {products.length > 0 ? (
         products.map((product: Product) => (
          <ProductCart key={product.id} product={product} />
        ))
        ) : (
          <div className="flex justify-center items-center mt-40">
            هیچ محصولی برای تکمیل و ادامه وجود ندارد
          </div>
        )}
      </div>
      </div>
    </>
  );
}
