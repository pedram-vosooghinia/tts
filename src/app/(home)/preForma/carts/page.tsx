"use client";

import EditShoppingValues from "@/components/dashboard/preForma/carts/EditShoppingValues";
import MoveToShipping from "@/components/dashboard/preForma/carts/MoveToShipping";
import useShoppingStore from "@/store/shoppingStore";
import OneImage from "@/components/MainComponents/OneImage";
import CartSummary from "@/components/dashboard/preForma/carts/CartSummary";
export default function Carts() {
  const { cart } = useShoppingStore();

  const { cartItems } = cart;
  console.log("cart", cartItems);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <>
      <div className="m-6 text-xl text-center">سبد خرید</div>
      {cartItems?.length ? (
        <div className="rtl flex flex-col justify-center items-center">
          <div className="flex flex-wrap justify-center items-end mx-4">
            {cart?.cartItems.map((item) => (
              <div
                key={item?.product?.id}
                className="flex justify-center items-center"
              >
                <div className="flex flex-col">
                  <div className="flex flex-col mx-2">
                    <OneImage imageUrl={item?.product?.image} size={100} />
                    <EditShoppingValues
                      key={item?.product?.id}
                      product={item}
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="mx-2 font-bold">{item?.product?.title}</div>
                    <p className="text-gray-600 mt-2">
                      {item?.product?.price} $
                    </p>
                    <div className="mx-2 font-bold">
                      قیمت کل : {item.product.price * item.quantity} $
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <CartSummary totalPrice={totalPrice} />
        </div>
      ) : (
        <div className="text-center m-20">
          <div>سبد خرید شما خالی می باشد</div>
        </div>
      )}
      <MoveToShipping
        totalInvoice={totalPrice}
      />
    </>
  );
}
