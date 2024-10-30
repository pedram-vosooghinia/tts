"use client";
import { useState } from "react";
import Modal from "@/components/Main/Modal";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { postOrderService } from "@/services/orders";
// import { deletePreFormaService } from "@/services/preForma";
import { calculateTotalValue } from "./utils";

import { Button } from "@/components/ui/button";
const PaymentMarketerButton = ({ order, orderId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const totalValue = calculateTotalValue(order.order_items);

  const orderData = {
    status: 5,
    total_price: order.total_price,
    discount_amount: order.discount_amount,
    marketer_discount: order.marketer_discount,
    final_pay: order.final_pay,
    jalali_date_nopay: order.jalali_date_nopay,
    total_value: totalValue,
    buy_type: order.buy_type,
    customer: order.customer,
    order_items: order.order_items,
  };

  const handlePay = async () => {
    setIsLoading(true);
    try {
      const response = await postOrderService({ orderData, orderId });
      if (response.data.success) {
        // const res = await deletePreFormaService(orderId);
        // if (res.data.success) {
        toast.success("پیش فاکتور با موفقیت به فاکتور اصلی تبدیل شد.");
        router.push("/dashboard/preForma");
        // } else {
        // toast.error("عدم پاک کردن پیش فاکتور");
        // }
      } else {
        toast.error("تبدیل به پیش فاکتور ناموفق بود");
      }
    } catch  {
      toast.error("Failed to confirm payment");
    } finally {
      setIsLoading(false);
    }
  };

  const buttonConfig = {
    disabled: isLoading,
    modalName: "paymentPreForma",
    buttonName: isLoading ? "در حال پردازش..." : "تایید پرداخت",
  };

  return (
    <>
      <Modal buttonConfig={buttonConfig}>
        <div className="flex flex-col justify-center items-center m-4">
          <div className="text-center">
            آیا از تایید و پرداخت کل فاکتور اطمینان دارید؟
          </div>
          <Button onClick={handlePay} className="   mt-8" disabled={isLoading}>
            {isLoading ? "در حال پردازش..." : "بله"}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default PaymentMarketerButton;
