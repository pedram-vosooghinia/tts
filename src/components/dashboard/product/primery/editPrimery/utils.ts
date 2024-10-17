"use client";
import toast from "react-hot-toast";
import { deletePrimeryService } from "@/services/product/primeryProduct";
import { postMainProductService } from "@/services/product/mainProduct";
export const cleanText = (text) => {
  let cleanedText = text.replace(/\n+/g, "\n");
  cleanedText = cleanedText.replace(/#/g, "");
  return cleanedText;
};

export const handleCopy = (text) => {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("متن کپی شد");
      })
      .catch(() => {
        toast.error("خطا در کپی کردن متن");
      });
  } else {
    toast.error("مرورگر شما از قابلیت کپی پشتیبانی نمی‌کند.");
  }
};

export const uploadValuePrimery = async ({ values, product, router }) => {
  const finalValuePrimery = {
    product_name: values?.product_name,
    price: parseInt(values?.price),
    inventory: parseInt(values?.inventory),
    number_in_pack: parseInt(values?.number_in_pack),
    size: values?.size,
    images: product?.images,
    category: values?.category,
    season: values?.season,
    validation_value: parseInt(values?.validation_value),
    sell_code: parseInt(values?.sell_code),
    person: values?.person,
    detail_color: values?.detail_color,
    title: values?.title,
  };
  const item = {
    id: product.id,
  };

  try {
    await postMainProductService(finalValuePrimery);
    await deletePrimeryService(item);
    toast.success("محصول با موفقیت ثبت شد");
    router.push("/dashboard/product/primery");
  } catch (e) {
    toast.error(e.response?.data?.message || "An error occurred");
  }
};
