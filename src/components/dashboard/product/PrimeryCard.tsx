"use client";
import { useRouter } from "next/navigation";
import React from "react";
// import OneImage from "@/components/MainComponents/OneImage";
import { Button } from "@/components/ui/button";
import { ProductAddProp } from "./type"; 
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
const PrimeryCard = ({ products }: ProductAddProp) => {
  const router = useRouter();

  const handleClick = (document_id: string) => {
    router.push(`/dashboard/product/editPrimery/${document_id}`);
  };
  console.log("products", products);
  return (
    <div className="flex flex-col justify-center   md:flex-row">
      {products.map((product, index) => (
        <div key={index} className="m-4">
          <Card>
            <CardContent className=" flex flex-col items-center  ">
              {/* <OneImage product={product} size={250} justOneImage={false} /> */}
              <div>{index + 1}</div>
              <CardHeader>{product.product_name}</CardHeader>
              <CardDescription>{product.brand}</CardDescription>
              <CardDescription>{product.sale_type}</CardDescription>
              <CardFooter>{product.price}</CardFooter>
              <Button
                variant="destructive"
                onClick={() => handleClick(product.document_id)}
              >
                ویرایش محصول
              </Button>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default PrimeryCard;
