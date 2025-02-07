"use client";
import { useRouter } from "next/navigation";
import { postOrderService } from "@/services/orders";
import useShoppingStore from "@/store/shoppingStore";
import toast from "react-hot-toast";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MoveToShippingProps } from "@/types/preForma";
import { MoveToShippingRequestProps } from "@/types/preForma";
import { OrderItem } from "@/types/preForma";
const MoveToShipping = ({
  exceptionsPrice,
  totalInvoice,
  discountAmount,
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

    setLoading(true);

    try {
      const data: MoveToShippingRequestProps = {
        customer_id: customer.document_id ? customer.document_id: null,
        total_price: totalInvoice ,
        order_items: cartItems.map(
          (item): OrderItem => ({
            product_name: item.name,
            document_id: item.id,
            second_price: exceptionsPrice[item.id] || 0,
            quantity: item.quantity,
            price: item.price,
          })
        ),
        status: 6,
        discount: discountAmount
          ? parseFloat((discountAmount ).toFixed(3))
          : 0,
      };
      const res = await postOrderService(data);

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
