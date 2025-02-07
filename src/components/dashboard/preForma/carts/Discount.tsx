"use client";
import toast from "react-hot-toast";
import useShoppingStore from "@/store/shoppingStore";
import Modal from "@/components/MainComponents/Modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useModalStore } from "@/store/modalStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

interface Discount {
  discount: number;
}

const Discount = () => {
  const { setDiscount, removeDiscount, cart } = useShoppingStore();
  const { cartItems } = cart;
  const { closeModal } = useModalStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Discount>();
  const onSubmit = async (values: Discount) => {
    setDiscount(values.discount * 1000);
    closeModal();
    toast.success("تخفیف با موفقیت ذخیره شد");
  };

  const handleRemoveDetails = () => {
    removeDiscount();
    toast.success("تخفیف حذف شد");
  };
  const buttonConfig = {
    modalName: "Discount",
    buttonName: "افزودن تخفیف",
    className: "m-4",
  };
  return (
    <div className="my-8">
      {cart.discount && typeof cart.discount === "number" && (
        <Card className="mx-2">
          <CardContent className="flex flex-wrap justify-center items-center gap-4 mt-6">
            <div>تخفیف: {cart.discount.toLocaleString()}</div>
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
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div>
              <Label htmlFor="hashatg_count">تخفیف</Label>
              <Input
                id="discount"
                type="number"
                {...register("discount", {
                  required: "وارد کردن تخفیف الزامی است",
                })}
              />
              {errors.discount && (
                <p className="text-red-500 text-sm">
                  {errors.discount.message}
                </p>
              )}
            </div>

            <Button type="submit">افزودن تخفیف</Button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Discount;
