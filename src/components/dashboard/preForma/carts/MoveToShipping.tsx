"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { postOrderService } from "@/services/orders";
import useShoppingStore from "@/store/shoppingStore";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  MoveToShippingProps,
  MoveToShippingRequestProps,
  OrderItem,
} from "@/types/preForma";

const MoveToShipping = ({
  exceptionsPrice,
  numberInPack,
  totalInvoice,
  discountAmount,
}: MoveToShippingProps) => {
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const { cart, deleteAllCart } = useShoppingStore();
  const { cartItems, customer } = cart;

  useEffect(() => {
    setIsClient(true);
  }, []);

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
        customer_id: customer.document_id || null,
        total_price: totalInvoice,
        order_items: cartItems.map(
          (item): OrderItem => ({
            product_name: item.name,
            document_id: item.id,
            quantity: item.quantity,
            omde_price: exceptionsPrice[item.id] || item.omde_price,
            number_in_pack: numberInPack[item.id] || 1,
          })
        ),
        status: 6,
        discount: discountAmount ? parseFloat(discountAmount.toFixed(3)) : 0,
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
    <div className="flex justify-between items-center w-full px-4 mb-6">
      <Button
        className="bg-pedram-2 text-gray-100"
        onClick={() => router.push("/dashboard/preForma/new")}
      >
        افزودن محصول
      </Button>
      {isClient && cartItems.length > 0 && (
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
