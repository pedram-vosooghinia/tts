"use client";
import { useRouter } from "next/navigation";
import React from "react";
import OneImage from "@/components/MainComponents/OneImage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
const PrimeryCard = <T extends { id: number; images: { image1: string } }>({
  products,
}: PrimeryCardProps<T>) => {
  const router = useRouter();

  const handleClick = (id: number) => {
    router.push(`/dashboard/product/primery/editPrimery/${id}`);
  };

  return (
    <div className="flex flex-col justify-center   md:flex-row">
      {products.map((product, index) => (
        <div key={index} className="m-4">
          <Card>
            <CardContent className=" flex flex-col items-center ">
              <OneImage product={product} size={250} justOneImage={false} />
              <CardHeader>{index + 1}</CardHeader>
              <Button
                variant="destructive"
                onClick={() => handleClick(product.id)}
              >
                مشاهده بیشتر
              </Button>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default PrimeryCard;
