"use client";
import AddShoppingValues from "./AddShoppingValues";
import OneImage from "@/components/Main/OneImage";
import ProductDescription from "../../product/main/showAll/ProductDescription";

function ProductCart({ product }) {
  return (
    <>
      <div className="flex rounded bg-gray-100  flex-col justify-center items-center">
        <OneImage product={product} size={250} />
        <ProductDescription product={product} />
        <div className="flex flex-col justify-center items-center shadow-lg w-full rtl ">
          <div className="flex justify-between w-80 rounded-md  bg-pedram-1 text-sm text-gray-100 px-2 py-4 m-4">
            <div className="flex">
              <div className="rtl px-2">کد</div>
              <div>{product.barcode}</div>
            </div>
            <div className="flex">
              <div>{product.price}</div>
              <div className="rtl px-2">تومان</div>
            </div>
          </div>
          <div className="w-80">
            <AddShoppingValues product={product} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCart;
