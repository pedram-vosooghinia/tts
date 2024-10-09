"use client";
import { copyDetailsToClipboard, saveAllImages } from "./utils";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/userStore";
import { Button } from "@/components/ui/button";
const ProductCopyActions = ({ product }) => {
  const { user } = useUserStore();
  const router = useRouter();
  const handleEdit = () => {
    router.push(`/dashboard/product/main/editMain/${product?.barcode}`);
  };
  return (
    <div className="flex flex-wrap justify-between w-full my-4 rtl">
      <Button
        onClick={() => copyDetailsToClipboard(product, "telegram")}
        className=" bg-pedram-2 "
      >
        کپی تلگرام
      </Button>
      <Button
        onClick={() => copyDetailsToClipboard(product, "instagram")}
        className=" bg-pedram-9 "
      >
        کپی اینستا
      </Button>
      <Button onClick={() => saveAllImages(product)} className="  bg-pedram-1 ">
        ذخیره تصاویر
      </Button>
      {(user?.role === "cto" || user?.role === "manager") && (
        <Button onClick={handleEdit} className="  bg-pedram-12 text-gray-900 ">
          ویرایش محصولات
        </Button>
      )}
    </div>
  );
};

export default ProductCopyActions;
