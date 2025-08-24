"use client";
import { Card, CardContent } from "@/components/ui/card";
import useShoppingStore from "@/store/shoppingStore";
const CartSummary = ({ totalPrice }) => {
  const summaryItems = [
    { label: "جمع فاکتور", value: totalPrice },
  ];
  const { cart } = useShoppingStore();
  const { cartItems } = cart;
  return (
    <>
      {cartItems.length !== 0 && (
        <Card className="my-8 mx-2">
          <CardContent>
            <div className="flex flex-wrap justify-center items-center text-xl mt-6">
              {summaryItems.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-center items-center m-2"
                >
                  <div className="px-2">{item.label}:</div>
                  <div>{item.value.toLocaleString()}</div>
                  <div className="px-2"> $ </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default CartSummary;
