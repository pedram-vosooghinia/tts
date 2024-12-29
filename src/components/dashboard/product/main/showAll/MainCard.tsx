"use client";
// import ProductCopyActions from "./ProductCopyActions";
import ProductDescription from "./ProductDescription";
import AllImage from "@/components/MainComponents/AllImage";
import { Card, CardContent } from "@/components/ui/card";
interface IMainCard {
  product: MainProduct;
}
const MainCard = ({ product }: IMainCard) => {
  return (
    <div className=" flex s rounded  bg-gray-100 w-80 flex-col justify-center items-center my-2">
      <Card>
        <CardContent>
          <div className="font-bold text-xl mb-2 text-center my-2">
            {product?.barcode}
          </div>
          <AllImage product={product} sameSize={false} />
          <ProductDescription product={product} />
          {/* <ProductCopyActions product={product} /> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default MainCard;
