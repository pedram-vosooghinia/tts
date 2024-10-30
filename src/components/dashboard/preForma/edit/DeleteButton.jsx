"use client";
import { useState } from "react";
import Modal from "@/components/Main/Modal";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deletePreFormaService } from "@/services/preForma";
import { Button } from "@/components/ui/button";
const DeleteButton = ({ orderId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleCancel = async () => {
    setIsLoading(true);
    try {
      const res = await deletePreFormaService(orderId);
      if (res.data.success) {
        router.push("/dashboard/preForma");
      }
    } catch  {
      toast.error("حذف پیش فاکتور ناموفق بود");
    } finally {
      setIsLoading(false);
    }
  };

  const buttonConfig = {
    className: "bg-pedram-2",
    disabled: isLoading,
    modalName: "cancelPreForma",
    buttonName: isLoading ? "در حال پردازش..." : "حذف کردن",
  };

  return (
    <>
      <Modal buttonConfig={buttonConfig}>
        <div className="flex flex-col justify-center items-center m-8">
          <div className="text-center">
            آیا از حذف کردن فاکتور اطمینان دارید؟
          </div>
          <Button
            onClick={handleCancel}
            className=" bg-pedram-2  mt-8"
            disabled={isLoading}
          >
            {isLoading ? "در حال پردازش..." : "بله"}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteButton;
