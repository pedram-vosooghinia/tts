"use client";
import PrimeryCard from "@/components/dashboard/product/primery/showAll/PrimeryCard";
import LoadingModal from "@/components/MainComponents/LoadingModal";
import useSWR from "swr";
import Modal from "@/components/MainComponents/Modal";
import AddPrimery from "@/components/dashboard/product/primery/showAll/AddPrimery";
export default function ShowPrimery() {
  const { data: primryProdctData, isLoading } = useSWR(
    "/product/primeryProduct/get"
  );

  if (isLoading) {
    return <LoadingModal />;
  }
  const products = primryProdctData?.data || [];
  const buttonConfig = {
    modalName: "AddPrimery",
    buttonName: "افزودن محصول",
    className: "my-8",
  };
  return (
    <>
      <div className="rtl flex flex-col justify-center items-center">
        <Modal buttonConfig={buttonConfig}>
          <AddPrimery />
        </Modal>
        <PrimeryCard products={products} />
        <div className="flex justify-center items-center mt-40">
          {products.length === 0 && (
            <div>هیج محصولی برای تکمیل و ادامه وجود ندارد</div>
          )}
        </div>
      </div>
    </>
  );
}
