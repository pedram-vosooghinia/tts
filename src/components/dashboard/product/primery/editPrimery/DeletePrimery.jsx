"use client"
import toast from "react-hot-toast";
import { useModalStore } from "@/store/modalStore";
import Modal from "@/components/Main/Modal";
import { useRouter } from "next/navigation";
import {
  deletePrimeryService,
  deleteImageService,
} from "@/services/product/primeryProduct";
export const DeletePrimery = ({ product }) => {
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
    } catch (error) {
      toast.error("خطایی در پاک کردن محصول دارد. لطفا دوباره تلاش نمایید");
    } finally {
      closeModal();
    }
  };
  const buttonConfig = {
    modalName: "DeletePrimery",
    buttonName: "حذف محصول",
    className: "mt-8 mb-4",
  };

  return (
    <>
      <Modal buttonConfig={buttonConfig}>
        <div className="flex flex-col justify-center items-center m-8">
          <div>آیا از حذف محصول اطمینان دارید؟</div>
          <button
            onClick={handelDeleteItem}
            className="rounded-xl bg-pedram-2 text-gray-100 px-4 py-2 mt-8"
          >
            بله
          </button>
        </div>
      </Modal>
    </>
  );
};
