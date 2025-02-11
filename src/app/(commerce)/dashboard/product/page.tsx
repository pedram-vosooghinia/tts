"use client";
import { useState } from "react";
import PrimeryCard from "@/components/dashboard/product/PrimeryCard";
import LoadingModal from "@/components/MainComponents/LoadingModal";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import EditProduct from "@/components/dashboard/product/edit/EditProduct";
import { Product } from "@/types/product";

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { data: productData, isLoading } = useSWR("/proxy/getProduct");

  const products = Array.isArray(productData) ? productData : [];
  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  if (isLoading) {
    return <LoadingModal />;
  }

  return (
    <div className="rtl flex flex-col justify-center items-center">
      <div className="flex justify-center flex-wrap">
        {products.map((product) => (
          <div key={product.id} className="flex flex-col items-center m-2">
            <PrimeryCard product={product} />
            <Button
              variant="destructive"
              onClick={() => handleEditProduct(product)}
              className="mt-2"
            >
              ویرایش محصول
            </Button>
          </div>
        ))}
        {selectedProduct && (
          <EditProduct
            product={selectedProduct}
            isOpen={!!selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </div>
    </div>
  );
}
