"use client";
import AddShoppingValues from "@/components/dashboard/preForma/carts/AddShoppingValues";
import { Card, CardContent } from "@/components/ui/card";
import ProductImage from "./ProductImage";
import { ProductItem } from "@/types/product";
import Link from "next/link";
interface ProductCardProps {
  product: ProductItem;
}

export default function ProductCard(props: ProductCardProps) {
  const { product } = props;
  return (
    <>
      <Card
        key={product.id}
        className=" flex-wrap justify-center items-center gap-4 bg-mainblack shadow-lg rounded-2xl overflow-hidden flex flex-col w-full max-w-[18.75rem] "
      >
        <CardContent className="p-4 flex flex-col justify-between h-full">
          <ProductImage
            src={product?.images[0].image}
            alt={product?.images[0].image || ""}
          />

          <Link
            href={`/products/${product.id}`}
            className="text-mainWhite text-lg font-semibold mt-4 line-clamp-2"
          >
            {product?.name}
          </Link>

          <div className="flex justify-between items-center mt-2 text-sm">
            <span className="text-mainWhite">{product.main_category}</span>
          </div>

          <span className="text-mainWhite mt-2">{product.price} $</span>

          <AddShoppingValues product={product} />
        </CardContent>
      </Card>
    </>
  );
}
