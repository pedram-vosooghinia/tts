"use client";
import ProductCopyActions from "./ProductCopyActions";
import ProductDescription from "./ProductDescription";
import AllImage from "@/components/Main/AllImage";
const MainCard = ({ product }) => {
  return (
    <div className=" flex s rounded  bg-gray-100 w-80 flex-col justify-center items-center my-2">
      <div className="font-bold text-xl mb-2 text-center my-2">
        {product?.barcode}
      </div>
      <AllImage product={product} sameSize={false} />
      <ProductDescription product={product} />
      <ProductCopyActions product={product} />
    </div>
  );
};

export default MainCard;
