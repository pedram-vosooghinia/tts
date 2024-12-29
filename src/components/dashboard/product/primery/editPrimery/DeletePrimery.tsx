"use client";
import toast from "react-hot-toast";
import { useModalStore } from "@/store/modalStore";
import Modal from "@/components/MainComponents/Modal";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  deletePrimeryService,
  deleteImageService,
} from "@/services/product/primeryProduct";
interface IDeletePrimery<T> {
  product: T;
}
interface Product {
  id: number;
  images: string[];
}
export const DeletePrimery = <T extends Product>({
  product,
}: IDeletePrimery<T>) => {
  const { closeModal } = useModalStore();
  const router = useRouter();

  const handelDeleteItem = async () => {
    try {
      const item = {
        id: product.id,
        images: product.images,
      };

      const resPrimery = await deletePrimeryService(item);

      if (resPrimery.data.success === true) {
        const resImages = await deleteImageService(item);
        if (resImages.data.success === true) {
          toast.success(`موفقیت: ${resImages?.data?.message}`);
          router.push("/dashboard/product/primery");
        } else {
          toast.error(`خطا: ${resImages?.data?.message}`);
        }
      } else {
        toast.error(`خطا: ${resPrimery?.data?.message}`);
      }
    } catch {
      toast.error("خطایی در پاک کردن محصول دارد. لطفا دوباره تلاش نمایید");
    } finally {
      closeModal();
    }
  };
  const buttonConfig = {
    modalName: "DeletePrimery",
    buttonName: "حذف محصول اولیه ",
    className: "mt-8 mb-4",
    color: "destructive" as
      | "link"
      | "default"
      | "destructive"
      | "outline"
      | "secondary"
      | "ghost"
      | null,
  };

  return (
    <>
      <Modal buttonConfig={buttonConfig}>
        <div className="flex flex-col justify-center items-center m-8 gap-4">
          <div>آیا از حذف محصول اطمینان دارید؟</div>
          <Button variant="destructive" onClick={handelDeleteItem}>
            بله
          </Button>
        </div>
      </Modal>
    </>
  );
};
