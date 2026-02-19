"use client";
import { ProductItem } from "@/types/product";
import AddShoppingValues from "./AddShoppingValues";
import OneImage from "@/components/MainComponents/OneImage";
interface IProductCart {
  product: ProductItem;
}
function ProductCart(props: IProductCart) {
  const { product } = props;
  return (
    <>
      <div className="flex rounded bg-gray-100  flex-col justify-center items-center">
        <OneImage imageUrl={product.images[0].image} size={250} />
        <div className="flex flex-col justify-center items-center shadow-lg w-full rtl ">
          <div className="mt-4">{product?.name}</div>
          <div className="flex justify-between w-80 rounded-md   text-sm  px-2 py-4 m-4">
            <div className="flex">
              <div className="rtl px-2">کد</div>
              <div>{product.id}</div>
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
