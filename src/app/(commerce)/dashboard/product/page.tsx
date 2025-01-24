"use client";
import PrimeryCard from "@/components/dashboard/product/showAll/PrimeryCard";
import LoadingModal from "@/components/MainComponents/LoadingModal";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
export default function ShowPrimery() {
  const router = useRouter();
  const { data: prodctData, isLoading } = useSWR(
    "/products/get"
  );

  if (isLoading) {
    return <LoadingModal />;
  }
  const products = prodctData?.data || [];
  const handelAddProduct = () => {
    router.push("/dashboard/product/add");
  };
  return (
    <div className="rtl flex flex-col justify-center items-center">
      <Button onClick={handelAddProduct}>افزودن محصول</Button>
      <PrimeryCard products={products} />
      <div className="flex justify-center items-center mt-40">
        {products.length === 0 && (
          <div>هیج محصولی برای تکمیل و ادامه وجود ندارد</div>
        )}
      </div>
    </div>
  );
}
