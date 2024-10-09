"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { acountingOrderService } from "@/services/orders";
import Modal from "@/components/Main/Modal";
import { Button } from "@/components/ui/button";
const AcountingOrderButton = ({
  order,
  buyPrices,
  totalNoClearProfitSum,
  totalClearProfitSum,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const updatedOrderItems = order?.order_items.map((item) => ({
    ...item,
    buy_price: buyPrices[item.barcode] || 0,
  }));

  const orderData = {
    id: order.id,
    status: 1,
    order_items: updatedOrderItems,
    no_clear_profit: totalNoClearProfitSum / 1000,
    clear_profit: totalClearProfitSum / 1000,
  };

  const handlePay = async () => {
    const hasZeroBuyPrice = updatedOrderItems.some(
      (item) => item.buy_price === 0
    );
    if (hasZeroBuyPrice) {
      toast.error("برخی از آیتم‌ها مقدار خرید ندارند.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await acountingOrderService(orderData);
      if (response.data.success) {
        toast.success("حسابداری  با موفقیت انجام شد.");
        router.push("/dashboard/orders");
      } else {
        toast.error("حسابداری ناموفق بود");
      }
    } catch (error) {
      toast.error("Failed to confirm payment");
    } finally {
      setIsLoading(false);
    }
  };
  const buttonConfig = {
    disabled: isLoading,
    modalName: "AcountingOrderButton",
    buttonName: isLoading ? "در حال پردازش..." : "تایید حسابداری",
    className: "m-4",
  };

  return (
    <>
      <Modal buttonConfig={buttonConfig}>
        <div className="flex flex-col justify-center items-center m-4">
          <div className="text-center">
            آیا از تایید و پرداخت کل فاکتور اطمینان دارید؟
          </div>
          <Button onClick={handlePay} className=" mt-8" disabled={isLoading}>
            {isLoading ? "در حال پردازش..." : "بله"}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default AcountingOrderButton;
