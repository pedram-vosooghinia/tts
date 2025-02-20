"use client";
import React from "react";
import OneImage from "@/components/MainComponents/OneImage";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Product } from "../../../types/product";

const PrimeryCard = ({ product }: { product: Product }) => {
  return (
    <Card className="">
      <CardContent className="flex flex-col items-center">
        <CardDescription>{product.id}</CardDescription>
        {product.image ? (
          <OneImage imageUrl={product.image[0]} size={150} />
        ) : (
          <div>تصویری یافت نشد</div>
        )}
        <CardHeader>{product.name}</CardHeader>
        <CardDescription>
          {product.brand === 1 ? "راین جی" : "هبه"}
        </CardDescription>
        <CardFooter>
          قیمت تک:
          {product?.price ? product.price.toLocaleString() : 0}
          <div>تومان</div>
        </CardFooter>
        <CardFooter>
          قیمت عمده:
          {product?.omde_price ? product.omde_price.toLocaleString() : 0}
          <div>تومان</div>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default PrimeryCard;
