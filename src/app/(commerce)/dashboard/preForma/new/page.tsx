"use client";
import { useState } from "react";
import ProductCart from "@/components/dashboard/preForma/carts/ProductCart";
import LoadingModal from "@/components/MainComponents/LoadingModal";
import { Button } from "@/components/ui/button";
import useSWR from "swr";
import { Product } from "@/types/product";
export default function New() {
  const [searchedProduct, setSearchedProduct] = useState<Product | null>(null);
 
  const { data: prodctData, isLoading } = useSWR("/products/get");

  const products = prodctData?.data || [];

  if (isLoading) {
    return <LoadingModal />;
  }
  console.log("products", products);

  const handleClearSearch = () => {
    setSearchedProduct(null);
  };
  const displayedProducts = searchedProduct ? [searchedProduct] : products;

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
        <div className="flex my-6 gap-4 flex-wrap justify-center items-start">
          {displayedProducts.map((product: Product) => (
            <ProductCart key={product.document_id} product={product} />
          ))}
        </div>

        {displayedProducts.length === 0 && (
          <div className="flex justify-center items-center mt-40">
            هیچ محصولی برای نمایش وجود ندارد
          </div>
        )}
      </div>
    </>
  );
}
