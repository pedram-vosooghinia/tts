"use client";
import { Card, CardContent } from "@/components/ui/card";
import useShoppingStore from "@/store/shoppingStore";
const CartSummary = ({
  totalInvoice,
  discountAmount,
  marketerDiscount,
  finalPay,
}) => {
  const summaryItems = [
    { label: "جمع فاکتور", value: totalInvoice },
    { label: "مبلغ تخفیف", value: discountAmount },
    { label: "کسر بازاریاب", value: marketerDiscount },
    { label: "مبلغ واریزی", value: finalPay },
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
                  <div className="px-2"> تومان </div>
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
