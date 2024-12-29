"use client";
import AllImage from "@/components/MainComponents/AllImage";
import { Card, CardContent } from "@/components/ui/card";
interface IMainCard {
  product: MainProduct;
}
export default function MainCardShop({ product }: IMainCard) {
  return (
    <div className=" flex s rounded  bg-gray-100 w-80 flex-col justify-center items-center my-2">
      <Card>
        <CardContent>
          <div className="font-bold text-xl mb-2 text-center my-2">
            {product?.barcode}
          </div>
          <AllImage product={product} sameSize={false} />
        </CardContent>
      </Card>
    </div>
  );
}
