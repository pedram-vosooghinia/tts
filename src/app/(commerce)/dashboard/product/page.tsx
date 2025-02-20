"use client";
import PrimeryCard from "@/components/dashboard/product/PrimeryCard";
import LoadingModal from "@/components/MainComponents/LoadingModal";
import useSWR from "swr";
import { Product } from "@/types/product";

export default function Products() {
  const { data: productData, isLoading: isLoadingProduct } =
    useSWR("/proxy/getProduct");

  const products = Array.isArray(productData) ? productData : [];

  const { data: imagesData, isLoading: isLoadingImages } = useSWR(
    products.length
      ? `/proxy/getImage/?ids=${products.map((p) => p.id).join(",")}`
      : null
  );

  if (isLoadingProduct || isLoadingImages) {
    return <LoadingModal />;
  }
  const fullProducts = products.map((p) => {
    const imageObj = imagesData.find(
      (item: Product) => item.id === String(p.id)
    );
    return {
      ...p,
      image: imageObj ? imageObj.images : [],
    };
  });

  return (
    <div className="rtl flex flex-col justify-center items-center">
        {fullProducts.map((product) => (
          <div key={product.id} >
            <PrimeryCard product={product} />
          </div>
        ))}
    </div>
  );
}
