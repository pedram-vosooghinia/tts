"use client";
import React from "react";
import { useState } from "react";
import EditProduct from "@/components/dashboard/product/edit/EditProduct";
import OneImage from "@/components/MainComponents/OneImage";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Product } from "../../../types/product";
import { Button } from "@/components/ui/button";

const PrimeryCard = ({ product }: { product: Product }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
  };
  return (
    <Card className="flex flex-col items-center m-2 ">
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
        <Button
          variant="destructive"
          onClick={() => handleEditProduct(product)}
          className="my-2"
        >
          ویرایش محصول
        </Button>
      </CardContent>

      {selectedProduct && (
        <EditProduct
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </Card>
  );
};

export default PrimeryCard;
