"use client";
import toast from "react-hot-toast";
import { useState } from "react";
import useShoppingStore from "@/store/shoppingStore";
const AddShoppingValues = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { firstAddToCart, cart } = useShoppingStore();
  const increaseQuantity = () => {
    if (quantity < product?.validation_value && quantity < product?.inventory) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const addToCartHandler = () => {
    const newItem = { ...product, quantity };
    firstAddToCart(newItem);
    toast.success("محصول اضافه شد");
  };
  const isInCart = cart.cartItems.some((item) => item.id === product.id); 
  return (
    <>
      {!isInCart ? (
        <div className=" flex flex-col">
          <div className=" flex items-center justify-between mx-8 ">
            <button
              className="bg-pedram-1 text-white px-4 py-2 rounded-md hover:bg-pedram-2 focus:outline-none"
              onClick={increaseQuantity}
            >
              +
            </button>
            <span className="text-gray-700 text-xl">{quantity}</span>
            <button
              className="bg-pedram-1 text-white px-4 py-2 rounded-md hover:bg-pedram-2 focus:outline-none"
              onClick={decreaseQuantity}
            >
              -
            </button>
          </div>
          <div>
            <button
              onClick={addToCartHandler}
              className="flex mx-auto rounded-md bg-pedram-3 text-gray-100 m-2 p-3"
            >
              افزودن به سبد خرید
            </button>
          </div>
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
