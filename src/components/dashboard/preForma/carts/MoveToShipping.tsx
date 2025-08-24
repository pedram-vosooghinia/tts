"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useShoppingStore from "@/store/shoppingStore";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

const MoveToShipping = ({ totalInvoice }: MoveToShippingProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { cart, deleteAllCart } = useShoppingStore();
  const { cartItems } = cart;

  const placeOrderHandler = async () => {
    if (cartItems.length === 0) {
      toast.error("سبد خرید خالی است");
      return;
    }

    setLoading(true);

    try {
      const data: MoveToShippingRequestProps = {
        customer_id: null,
        total_price: totalInvoice,
        order_items: cartItems.map(
          (item): OrderItem => ({
            product_name: item.product.title,
            document_id: item.product.id,
            quantity: item.quantity,
            price: item.product.price,
            image: item.product.image,
            category: item.product.category,
          })
        ),
      };
    // localStorage.setItem("orderData", JSON.stringify(data));

const existingOrders = localStorage.getItem("orderData");
    let ordersList: MoveToShippingRequestProps[] = [];
    if (existingOrders) {
      ordersList = JSON.parse(existingOrders);
    }

    // اضافه کردن سفارش جدید
    ordersList.push(data);

    // ذخیره مجدد
    localStorage.setItem("orderData", JSON.stringify(ordersList));




    toast.success("فاکتور با موفقیت ثبت شد");
    router.push("/preForma/completed");
    deleteAllCart();

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
        onClick={() => router.push("/")}
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
