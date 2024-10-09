"use client";
import { PForm } from "@/components/PForm/PForm";
import { useState } from "react";
import toast from "react-hot-toast";
import usePost from "@/hooks/usePost";
import { primeryItems, primeybutton } from "./inputItem";

import { uploadImageService } from "@/services/product/primeryProduct";
import LoadingModal from "@/components/Main/LoadingModal";
import { cleanTextAddPrimery, prepareFormData } from "./utils";
import { useModalStore } from "@/store/modalStore";
export default function AddPrimery() {
  const [loading, setLoading] = useState(false);
  const { postData } = usePost(
    "/product/primeryProduct/add",
    "/product/primeryProduct/get"
  );
  const { closeModal } = useModalStore();
  const handleFormSubmit = async (values) => {
    const { formData, images } = prepareFormData(values.files);
    values.product_need_text = cleanTextAddPrimery(values.product_need_text);
    const formValue = {
      product_need_text: values.product_need_text,
      images: images,
    };
    try {
      setLoading(true);
      await postData(formValue);
      await uploadImageService(formData);
      toast.success("محصول با موفقیت ثبت شد");
      setLoading(false);
    } catch (e) {
      toast.error(e.response?.data?.message || "An error occurred");
    } finally {
      closeModal();
    }
  };

  if (loading) {
    return <LoadingModal />;
  }
  return (
    <>
      <PForm
        Items={primeryItems}
        button={primeybutton}
        onSubmit={handleFormSubmit}
      />
    </>
  );
}
