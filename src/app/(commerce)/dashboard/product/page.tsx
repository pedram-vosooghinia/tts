"use client";
import PrimeryCard from "@/components/dashboard/product/PrimeryCard";
import LoadingModal from "@/components/MainComponents/LoadingModal";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ShowPrimery() {
  const router = useRouter();
  const { data: prodctData, isLoading } = useSWR("/proxy/getProduct");
  const products = Array.isArray(prodctData) ? prodctData : [];
  console.log("products",products)
  const handleAddProduct = () => {
    router.push("/dashboard/product/add");
  };

  const handleEditProduct = (id: string) => {
    router.push(`/dashboard/product/editPrimery/${id}`);
  };

  if (isLoading) {
    return <LoadingModal />;
  }

  return (
    <div className="rtl flex flex-col justify-center items-center">
      <Button onClick={handleAddProduct}>افزودن محصول</Button>
      <div className="flex justify-center flex-wrap">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className=" flex flex-col items-center m-2">
              <PrimeryCard product={product} />
              <Button
                variant="destructive"
                onClick={() => handleEditProduct(product.id)}
                className="mt-2"
              >
                ویرایش محصول
              </Button>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center mt-40">
            هیچ محصولی برای تکمیل و ادامه وجود ندارد
          </div>
        )}
      </div>
    </div>
  );
}
