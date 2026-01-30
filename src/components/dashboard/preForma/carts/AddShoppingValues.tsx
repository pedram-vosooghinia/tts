"use client";
import toast from "react-hot-toast";
import { useState } from "react";
import useShoppingStore from "@/store/shoppingStore";
import { Button } from "@/components/ui/button";
const AddShoppingValues = ({ product }: ProductCartProps) => {
  const [quantity, setQuantity] = useState(1);
  const { firstAddToCart, cart } = useShoppingStore();

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const addToCartHandler = () => {
    const newItem = { product, quantity };
    firstAddToCart(newItem);
    toast.success("محصول اضافه شد");
  };
  const isInCart = cart.cartItems.some(
    (item) => item?.product?.id === product?.id,
  );
  return (
    <>
      {!isInCart ? (
        <div className="rtl flex flex-col items-center ">
          <div className=" flex w-full items-center justify-between ">
            <Button
              variant="ghost"
              className="bg-neutral-4 text-white px-4 py-2 rounded-md  focus:outline-none"
              onClick={increaseQuantity}
            >
              +
            </Button>
            <span className="text-neutral-1 text-xl">{quantity}</span>
            <Button
              className="bg-neutral-4 text-white px-4 py-2 rounded-md  focus:outline-none"
              onClick={decreaseQuantity}
              variant="destructive"
            >
              -
            </Button>
          </div>
          <Button
            onClick={addToCartHandler}
            className="w-full bg-neutral-7 text-gray-100 m-2 p-3"
          >
            افزودن به سبد خرید
          </Button>
        </div>
      ) : (
        <div className="text-center m-4 py-2 rounded bg-pedram-12">
          محصول به سبد خرید شما اضافه شده است
        </div>
      )}
    </>
  );
};

export default AddShoppingValues;
