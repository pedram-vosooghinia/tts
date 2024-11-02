import { useState } from "react";
import toast from "react-hot-toast";
import usePost from "@/hooks/usePost";
import { uploadImageService } from "@/services/product/primeryProduct";
import LoadingModal from "@/components/Main/LoadingModal";
import { cleanTextAddPrimery, prepareFormData } from "./utils";
import { useModalStore } from "@/store/modalStore";
import { useForm, FormProvider } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import ImageInput from "@/components/PForm/ImageInput";

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
  const methods = useForm<FormValues>();
  const { setError } = methods;

  const onSubmit = async (data: FormValues) => {
    if (!data.files || data.files.length === 0) {
      setError("files", { type: "manual", message: "فایل مورد نیاز است" });
      return;
    }

    data.product_need_text = cleanTextAddPrimery(data.product_need_text);
    const { formData, images } = prepareFormData(data.files);
    const formValue = {
      product_need_text: data.product_need_text,
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

  if (loading) return <LoadingModal />;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="product_need_text">متن در صورت نیاز</Label>
          <Textarea
            id="product_need_text"
            {...methods.register("product_need_text", { maxLength: 255 })}
            placeholder="متن محصول"
          />
          {methods.formState.errors.product_need_text && (
            <p className="text-red-500 text-sm">
              {methods.formState.errors.product_need_text.message}
            </p>
          )}
        </div>
        <ImageInput imageItems={{  required: true }} />
        
        <Button type="submit">افزودن محصول</Button>
      </form>
    </FormProvider>
  );
}
