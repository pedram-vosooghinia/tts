"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { updatePayOrderService } from "@/services/orders";
import Modal from "@/components/Main/Modal";
import { Button } from "@/components/ui/button";
const SendOrderButton = ({ orderId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleSend = async () => {
    setIsLoading(true);

    const payStatus = 3;
    try {
      const res = await updatePayOrderService(orderId, {
        id: orderId,
        payStatus,
      });
      if (res.data.data) {
        router.push("/dashboard/orders");
      }
    } catch (error) {
      toast.error("Failed to confirm payment");
    } finally {
      setIsLoading(false);
    }
  };

  const buttonConfig = {
    disabled: isLoading,
    modalName: "SendOrder",
    buttonName: isLoading ? "در حال پردازش..." : "تایید ارسال",
    className: "mx-2",
  };
  return (
    <div className="flex flex-wrap justify-center items-center">
      <div>
        <Button className="bg-pedram-6 text-gray-100 rounded px-2 py-2 my-2 ">
          مشاهده فاکتور
        </Button>
      </div>
      <div>
        <Modal buttonConfig={buttonConfig}>
          <div className="flex flex-col justify-center items-center m-4">
            <div className="text-center">
              آیا ارسال فاکتور را تایید می نمایید؟
            </div>
            <Button onClick={handleSend} className=" mt-8">
              بله
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default SendOrderButton;
