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
import { hashToPrice } from "@/utils/price/hashPrice";

const PrimeryCard = ({ product }: { product: Product }) => {
  const englishName = product?.english_name ?? "";
  const match = englishName.match(/PRD-[A-F0-9]+/);
  const omdePrise: number | null = match ? hashToPrice(match[0]) : null;

  return (
      <Card className="">
        <CardContent className="flex flex-col items-center">
          <CardDescription>{product.id}</CardDescription>
          {product.image ? (
            <OneImage imageUrl={product.image} size={150} />
          ) : (
            <p>تصویری یافت نشد</p>
          )}
          <CardHeader>{product.name}</CardHeader>
          <CardDescription>
            {product.brand === 1 ? "راین جی" : "هبه"}
          </CardDescription>
          <CardFooter>
            قیمت تک:
            {product?.price ? product.price.toLocaleString() : "نامشخص"} تومان
          </CardFooter>
          <CardFooter>
            قیمت عمده:
            {typeof omdePrise === "number"
              ? `${(omdePrise * 1000).toLocaleString()} تومان`
              : "نامعتبر"}
          </CardFooter>
        </CardContent>
      </Card>
  );
};

export default PrimeryCard;
