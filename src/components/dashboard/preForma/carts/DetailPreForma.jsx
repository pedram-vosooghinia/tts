"use client";
import toast from "react-hot-toast";
import useShoppingStore from "@/store/shoppingStore";
import { PForm } from "@/components/PForm/PForm";
import { detailCartbutton, detailCartItems } from "./inputItems";
import Modal from "@/components/Main/Modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useModalStore } from "@/store/modalStore";

const DetailPreForma = () => {
  const { setDetails, removeDetails, cart } = useShoppingStore();
  const { details, cartItems } = cart;
  const { closeModal } = useModalStore();

  const handleFormSubmit = async (values) => {
    setDetails(values);
    closeModal();
    toast.success("جزئیات با موفقیت ذخیره شد");
  };

  const handleRemoveDetails = () => {
    removeDetails();
    toast.success("جزئیات حذف شد");
  };
  const buttonConfig = {
    modalName: "DetailPreForma",
    buttonName: "افزودن جزییات",
    className: "m-4",
  };
  return (
    <div className="my-8">
      {details && (
        <Card className="mx-2">
          <CardContent className="flex flex-wrap justify-center items-center gap-4 mt-6">
            <div>تخفیف: {details.discount}</div>
            <div>نام فروشنده: {details.marketer_name}</div>
            <div>
              نوع خرید: {details.buy_type === "onsite" ? "حضوری" : "ارسال"}
            </div>
            <div>
              <Button className=" bg-red-500 " onClick={handleRemoveDetails}>
                حذف جزییات
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      {!details && cartItems.length !== 0 && (
        <Modal buttonConfig={buttonConfig}>
          <PForm
            Items={detailCartItems}
            button={detailCartbutton}
            onSubmit={handleFormSubmit}
          />
        </Modal>
      )}
    </div>
  );
};

export default DetailPreForma;
