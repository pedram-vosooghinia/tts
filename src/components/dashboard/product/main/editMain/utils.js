"use client";

import { deleteMainService } from "@/services/product/mainProduct";
import { deleteImageService } from "@/services/product/primeryProduct";
import toast from "react-hot-toast";
export const handelDeleteMain = async (product, router) => {
    try {
      const item = {
        id: product.id,
        images: product.images,
      };
  
      const resPrimery = await deleteMainService(item);
  
      if (resPrimery.data.success === true) {
        const resImages = await deleteImageService(item);
        if (resImages.data.success === true) {
          toast.success(`موفقیت: ${resImages?.data?.message}`);
          router.push("/dashboard/product/showMain");
        } else {
          toast.error(`خطا: ${resImages?.data?.message}`);
        }
      } else {
        toast.error(`خطا: ${resPrimery?.data?.message}`);
      }
    } catch  {
      toast.error("خطایی در پاک کردن محصول دارد. لطفا دوباره تلاش نمایید");
    }
  };