"use client";
import { useParams } from "next/navigation";
import LoadingModal from "@/components/MainComponents/LoadingModal";
import useSWR from "swr";
import { ProductItem } from "@/types/product";

export default function ProductDetailPage() {
  const { id } = useParams(); 
  
  // const { data: product, isLoading } = useSWR<IProduct>(
  //   id ? `products/${id}` : null,
  //   (url: string) => apiFakestore.get(url).then((res) => res.data)
  // );

  // if (isLoading) return <LoadingModal />;
  // if (!product) return <div>محصول یافت نشد</div>;

  return (
    <>
      <div></div>
    </>
  );
}
