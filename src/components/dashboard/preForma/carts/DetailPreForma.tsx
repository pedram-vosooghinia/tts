"use client";
import toast from "react-hot-toast";
import useShoppingStore from "@/store/shoppingStore";
import Modal from "@/components/MainComponents/Modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useModalStore } from "@/store/modalStore";




const DetailPreForma = () => {
  const { setDiscount, removeDiscount, cart } = useShoppingStore();
  const {  cartItems } = cart;
  const { closeModal } = useModalStore();

  const handleFormSubmit = async (values) => {
    setDiscount(values);
    closeModal();
    toast.success("جزئیات با موفقیت ذخیره شد");
  };

  const handleRemoveDetails = () => {
    removeDiscount();
    toast.success("جزئیات حذف شد");
  };
  const buttonConfig = {
    modalName: "DetailPreForma",
    buttonName: "افزودن جزییات",
    className: "m-4",
  };
  return (
    <div className="my-8">
      {cart.discount && (
        <Card className="mx-2">
          <CardContent className="flex flex-wrap justify-center items-center gap-4 mt-6">
            <div>تخفیف: {cart.discount}</div>
            <div>
              <Button className=" bg-red-500 " onClick={handleRemoveDetails}>
                حذف تخفیف
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      {!cart.discount && cartItems.length !== 0 && (
        <Modal buttonConfig={buttonConfig}>
      {/* const detailCartItems = [
  [
    {
      id: 1,
      label: "تخفیف",
      type: "number",
      name: "discount",
    },
  
  ],

]; */}

        </Modal>
      )}
    </div>
  );
};

export default DetailPreForma;
