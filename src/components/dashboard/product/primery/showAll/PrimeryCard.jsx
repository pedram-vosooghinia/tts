"use client";
import { useRouter } from "next/navigation";
import React from "react";
import OneImage from "@/components/Main/OneImage";
import { Button } from "@/components/ui/button";
const PrimeryCard = ({ product, counter }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/dashboard/product/primery/editPrimery/${product?.id}`);
  };
  return (
    <div className="flex  gap-4 flex-col justify-center items-center shadow-lg my-4 py-4 rtl bg-gray-200 rounded">
      <OneImage product={product} size={250} />
      <div className="mt-4 flex items-center justify-center">
        <span className="text bg-pedram-3 px-2 rounded">{counter}</span>
      </div>
      <Button onClick={handleClick}>مشاهده بیشتر</Button>
    </div>
  );
};

export default PrimeryCard;
