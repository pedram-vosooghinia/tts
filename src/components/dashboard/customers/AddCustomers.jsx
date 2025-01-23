"use client";
import { PForm } from "@/components/PForm/PForm";
import { customerItem, customerbutton } from "./customersInput";
import toast from "react-hot-toast";
import Modal from "@/components/Main/Modal";
import { useModalStore } from "@/store/modalStore";
export const AddCustomers = () => {
  const { closeModal } = useModalStore();
  // const { postData } = usePost("/customers/add", "/customers/getAll");
  const handleFormSubmit = async (values) => {
    try {
      await postData(values);
      toast.success("مشتری با موفقیت ثبت شد");
      closeModal(true);
    } catch (e) {
      toast.error(e.response?.data?.message || "An error occurred");
    }
  };
  const buttonConfig = {
    modalName: "AddCustomers",
    buttonName: "افزودن مشتری",
  };
  return (
    <Modal buttonConfig={buttonConfig}>
      <PForm
        Items={customerItem}
        button={customerbutton}
        onSubmit={handleFormSubmit}
      />
    </Modal>
  );
};
