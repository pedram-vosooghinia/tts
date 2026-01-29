"use client";
import Image from "next/image";
import LoadingModal from "@/components/MainComponents/LoadingModal";
import AddShoppingValues from "@/components/dashboard/preForma/carts/AddShoppingValues";
import { Card, CardContent } from "@/components/ui/card";
import useSWR from "swr";
import { apiFakestore } from "@/services/api";
export default function Home() {
  const { data: products, isLoading } = useSWR("products", (url) =>
    apiFakestore.get(url).then((res) => res.data),
  );
  if (isLoading) {
    return <LoadingModal />;
  }

  return (
    <main className=" ltr  flex flex-col items-center justify-center ">
      <h1 className="text-3xl font-bold mb-6">tts-shopsssss</h1>
      <div className="flex flex-wrap justify-center items-center gap-4 ">
        {products?.map((product: Product) => (
          <Card
            key={product.id}
            className="shadow-lg rounded-2xl overflow-hidden flex flex-col w-[240px] h-[550px]"
          >
            <CardContent className="p-4 flex flex-col justify-between h-full">
              <Image
                src={product.image}
                alt={product.title}
                width={200}
                height={200}
                className="h-40 object-contain mx-auto"
              />
              <h2 className="text-lg font-semibold mt-4 line-clamp-2">
                {product.title}
              </h2>
              <p className="text-sm text-gray-500 line-clamp-2">
                {product.description}
              </p>
              <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
                <span>{product.category}</span>
                <span>
                  ⭐ {product.rating.rate} ({product.rating.count})
                </span>
              </div>
              <p className="text-gray-600 mt-2">{product.price} $</p>
              <AddShoppingValues product={product} />
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
