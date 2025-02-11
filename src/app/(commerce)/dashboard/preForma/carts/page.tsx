"use client";
import { useState, useEffect } from "react";

import EditShoppingValues from "@/components/dashboard/preForma/carts/EditShoppingValues";
import MoveToShipping from "@/components/dashboard/preForma/carts/MoveToShipping";
import useShoppingStore from "@/store/shoppingStore";
import OneImage from "@/components/MainComponents/OneImage";
import CustomerManagement from "@/components/dashboard/preForma/carts/CustomerManagement";
import DetailPreForma from "@/components/dashboard/preForma/carts/Discount";
import CartSummary from "@/components/dashboard/preForma/carts/CartSummary";
export default function Carts() {
  const { cart } = useShoppingStore();
  const [exceptionsPrice, setExceptionsPrice] = useState<Record<string, number>>({});
  const [numberInPack, setNumberInPack] = useState<Record<string, number>>({});

  const { cartItems, discount } = cart;
  // const { cartItems } = cart;
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;
  const handleExceptionsPriceChange = (id: string, value: number) => {
    setExceptionsPrice((prev) => ({ ...prev, [id]: value }));
  };
  
  const handleNumberInPackChange = (id: string, value: number) => {
    setNumberInPack((prev) => ({ ...prev, [id]: value }));
  };
  const calculateTotalPrice = (item: { id: string; quantity: number; omde_price: number }) => {
    const omde_price = exceptionsPrice[item.id] ?? item.omde_price;
    const number = numberInPack[item.id] ?? 1;
    return omde_price * item.quantity * number;
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + calculateTotalPrice(item),
    0
  );

  const finalPay = totalPrice - (cart.discount ?? 0);
  return (
    <>
      <div className="m-6 text-xl text-center">سبد خرید</div>
      {cartItems?.length ? (
        <div className="rtl flex flex-col justify-center items-center">
          <div className="flex flex-wrap justify-center items-end mx-4">
            {cart?.cartItems.map((item) => (
              <div key={item.id} className="flex justify-center items-center">
                <div className="flex flex-col">
                  <div className="flex flex-col mx-2">
                    <OneImage imageUrl={item.image} size={100} />
                    <EditShoppingValues key={item?.id} product={item} />
                  </div>
                  <div className="flex flex-col">
                    <div className="mx-2 font-bold">{item.name}</div>
                    <div className="mx-2">
                      قیمت:{" "}
                      {(item.omde_price ? item.omde_price : 0).toLocaleString()}{" "}
                      تومان
                    </div>

                    <div className="mx-2 mt-2">
                      <label className="block font-bold">قیمت استثنا :</label>
                      <input
                        type="number"
                        className="w-full p-2 border rounded"
                        min={1}
                        defaultValue={item.omde_price}
                        onChange={(e) =>
                          handleExceptionsPriceChange(
                            item.id,
                            Number(e.target.value)
                          )
                        }
                      />
                    </div>
                    <div className="mx-2 mt-2">
                      <label className="block font-bold">تعداد در جعبه :</label>
                      <input
                        type="number"
                        className="w-full p-2 border rounded"
                        min={1}
                        defaultValue={1}
                        onChange={(e) =>
                          handleNumberInPackChange(
                            item.id,
                            Number(e.target.value)
                          )
                        }
                      />
                    </div>

                    <div className="mx-2 font-bold">
                      قیمت کل:
                      {calculateTotalPrice(item).toLocaleString()} تومان
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <CartSummary totalPrice={totalPrice} finalPay={finalPay} />
          <CustomerManagement />
          <DetailPreForma />
        </div>
      ) : (
        <div className="text-center m-20">
          <div>سبد خرید شما خالی می باشد</div>
        </div>
      )}
      <MoveToShipping
        exceptionsPrice={exceptionsPrice}
        numberInPack={numberInPack}
        totalInvoice={totalPrice}
        discountAmount={discount}
      />
    </>
  );
}
