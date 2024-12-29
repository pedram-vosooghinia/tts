"use client";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cleanTextAddPrimery, prepareFormData } from "./utils";
import LoadingModal from "@/components/MainComponents/LoadingModal";
import toast from "react-hot-toast";
import usePost from "@/hooks/usePost";
import { uploadImageService } from "@/services/product/primeryProduct";
import { useModalStore } from "@/store/modalStore";
interface FormValues {
  product_need_text: string;
  files: File[];
}

export default function AddPrimery() {
  const { closeModal } = useModalStore();
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const { postData } = usePost({
    postUrl: "/product/primeryProduct/add",
    getUrl: "/product/primeryProduct/get",
  });
  const inputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();
  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      const previews = fileArray.map((file) => URL.createObjectURL(file));

      setImagePreviews((prev) => [...prev, ...previews]);
      setSelectedFiles((prev) => [...prev, ...fileArray]);
      setValue("files", fileArray);
    }
  };
  const handleRemoveImage = (index: number) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setValue(
      "files",
      selectedFiles.filter((_, i) => i !== index)
    );
  };

  const onSubmit = async (data: FormValues) => {
    data.files = selectedFiles;
    data.product_need_text = cleanTextAddPrimery(data.product_need_text);

    const { formData, images } = prepareFormData(data.files);
    const formValue = {
      product_need_text: data.product_need_text,
      images: images,
    };
    console.log("formValue", formValue);

    try {
      setLoading(true);
      await postData(formValue);
      await uploadImageService(formData);
      toast.success("محصول با موفقیت ثبت شد");
    } catch (error) {
      toast.error("خطایی رخ داد");
      console.error(error);
    } finally {
      setLoading(false);
      closeModal();
    }
  };

  if (loading) return <LoadingModal />;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <Label htmlFor="product_need_text">متن در صورت نیاز</Label>
        <Textarea
          id="product_need_text"
          {...register("product_need_text", { maxLength: 255 })}
          placeholder="متن محصول"
        />
        {errors.product_need_text && (
          <span className="text-red-500 text-sm mt-1">
            {errors.product_need_text.message}
          </span>
        )}

        <div className="flex flex-col gap-2">
          <Label>افزودن عکس</Label>
          <Button
            type="button"
            variant="destructive"
            onClick={handleButtonClick}
          >
            انتخاب عکس
          </Button>
          <Input
            type="file"
            accept="image/*"
            {...register("files", {
              required: "لطفاً یک فایل انتخاب کنید",
            })}
            onChange={handleImageChange}
            ref={inputRef}
            className="hidden"
          />
          {errors.files && (
            <span className="text-red-500 text-sm mt-1">
              {errors.files.message}
            </span>
          )}

          <div className="flex flex-wrap mt-2">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative m-2">
                <Image
                  src={preview}
                  alt={`Selected ${index}`}
                  width="100"
                  height="100"
                  onLoad={() => URL.revokeObjectURL(preview)}
                />
                <Button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="w-5 h-5 absolute top-0 right-0 bg-red-500 text-white rounded-full"
                >
                  &times;
                </Button>
              </div>
            ))}
          </div>
        </div>

        <Button type="submit">افزودن محصول</Button>
      </form>
    </>
  );
}
