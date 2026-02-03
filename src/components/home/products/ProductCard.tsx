"use client";
import AddShoppingValues from "@/components/dashboard/preForma/carts/AddShoppingValues";
import { Card, CardContent } from "@/components/ui/card";
import ProductImage from "./ProductImage";
import { Product } from "@/types/product";
interface ProductCardProps {
  product: Product;
}

export default function ProductCard({product} :ProductCardProps) {
  return (
    <>
      <div className="flex flex-wrap justify-center items-center gap-4">
        <Card
          key={product.id}
          className="bg-neutral-6 shadow-lg rounded-2xl overflow-hidden flex flex-col w-full max-w-[300px] h-[550px]"
        >
          <CardContent className="p-4 flex flex-col justify-between h-full">
            <ProductImage src={product.image} alt={product.title} />

            <h2  className="text-neutral-1 text-lg font-semibold mt-4 line-clamp-2">
              {product.title}
            </h2>

            <p className="text-neutral-1 text-sm line-clamp-2">
              {product.description}
            </p>

            <div className="flex justify-between items-center mt-2 text-sm">
              <span className="text-neutral-1">{product.category}</span>
              <span className="text-neutral-1">
                ⭐ {product.rating.rate} ({product.rating.count})
              </span>
            </div>

            <p className="text-neutral-1 mt-2">{product.price} $</p>

            <AddShoppingValues product={product} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
