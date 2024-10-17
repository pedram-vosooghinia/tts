"use client";
import { PForm } from "@/components/PForm/PForm";
import { useState } from "react";
import toast from "react-hot-toast";
import usePost from "@/hooks/usePost";
import { uploadImageService } from "@/services/product/primeryProduct";
import LoadingModal from "@/components/Main/LoadingModal";
import { cleanTextAddPrimery, prepareFormData } from "./utils";
import { useModalStore } from "@/store/modalStore";
import { SubmitHandler } from "react-hook-form";
import { primeryItems , primeybutton } from "./inputItem";
interface FormValues {
  product_need_text: string;
  files: FileList;
}

export default function AddPrimery() {
  const [loading, setLoading] = useState(false);

  const { postData } = usePost({
    postUrl: "/product/primeryProduct/add",
    getUrl: "/product/primeryProduct/get",
  });
  const { closeModal } = useModalStore();

  const handleFormSubmit: SubmitHandler<FormValues> = async (values) => {
    console.log("first", values);
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
    } catch {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
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
        onSubmit={handleFormSubmit as SubmitHandler<FormValues>}
        />
    </>
  );
}
