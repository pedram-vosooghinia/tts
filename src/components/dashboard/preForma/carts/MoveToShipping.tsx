"use client";
import { useRouter } from "next/navigation";
import { postPreFormaService } from "@/services/preForma";
import useShoppingStore from "@/store/shoppingStore";
import toast from "react-hot-toast";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MoveToShippingProps } from "@/types/preForma";

const MoveToShipping = ({
  exceptionsPrice,
  totalInvoice,
  discountAmount,
  finalPay,
}: MoveToShippingProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { cart, deleteAllCart } = useShoppingStore();
  const { cartItems, customer } = cart;

  const placeOrderHandler = async () => {
    if (!customer) {
      toast.error("لطفا یک مشتری انتخاب کنید");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("سبد خرید خالی است");
      return;
    }

    const orderItems = cartItems.map((item) => {
      const numberInPack = exceptionsPrice[item.document_id] || 0;

      return {
        product_name: item.product_name,
        document_id: item.document_id,
        number_in_pack: numberInPack,
        quantity: item.quantity,
        price: item.price,
      };
    });

    setLoading(true);

    try {
      const bodyreq = JSON.stringify({
        order_items: orderItems,
        total_price: totalInvoice / 1000,
        status: 6,
        customer: customer,
        discount_amount: discountAmount
          ? (discountAmount / 1000).toFixed(3)
          : 0,
        final_pay: (finalPay / 1000).toFixed(3),
      });

      const res = await postPreFormaService(bodyreq);

      if (res.data.status === 200) {
        toast.success("فاکتور با موفقیت ثبت شد");
        router.push("/dashboard/preForma/completed");
        deleteAllCart();
      } else {
        toast.error("خطا در ثبت سفارش");
      }
    } catch {
      toast.error("لطفا دوباره تلاش نمایید");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rtl flex justify-between items-center w-full px-4 mb-6">
      <Button
        className="bg-pedram-2 text-gray-100"
        onClick={() => router.push("/dashboard/preForma/new")}
      >
        افزودن محصول
      </Button>
      {cartItems.length > 0 && (
        <Button
          className="bg-pedram-1 text-gray-100"
          onClick={placeOrderHandler}
          disabled={loading}
        >
          {loading ? "درحال پردازش" : "ثبت سفارش اولیه"}
        </Button>
      )}
    </div>
  );
};

export default MoveToShipping;
