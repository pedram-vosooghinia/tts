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
      const data: Order = {
        id: String(Date.now()),
        totalPrice: Number(totalInvoice.toFixed(2)),
        createdAt: new Date().toISOString(),
        isPaid: false,
        isDelivered: false,
        order_items: cartItems.map(
          (item): OrderItem => ({
            product_title: item.product.title,
            document_id: item.product.id,
            quantity: item.quantity,
            price: item.product.price,
            image: item.product.image,
            category: item.product.category,
          })
        ),
      };

      const existingOrders = localStorage.getItem("orderData");
      let ordersList: Order[] = [];
      if (existingOrders) {
        ordersList = JSON.parse(existingOrders);
      }

      ordersList.push(data);

      localStorage.setItem("orderData", JSON.stringify(ordersList));

      console.log("data", data);

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
