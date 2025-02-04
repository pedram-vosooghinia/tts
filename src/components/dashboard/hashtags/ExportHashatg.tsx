"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import LoadingModal from "@/components/MainComponents/LoadingModal";
import toast from "react-hot-toast";
import { useModalStore } from "@/store/modalStore";
import { hashtagTypeStore } from "@/store/hashtagTypeStore";
import Modal from "@/components/MainComponents/Modal";
import { Hashtag } from "@/types/hashtags";
interface FormValues {
  hashatg_count: number;
}

interface ExportHashatgProps {
  hashtags: Hashtag[];
}

export default function ExportHashatg({ hashtags }: ExportHashatgProps) {
  const { closeModal } = useModalStore();
  const [loading, setLoading] = useState(false);
  const { selectedType } = hashtagTypeStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
      const { hashatg_count } = data;
      const randomTags = getRandomHashtags(hashatg_count);
      const hashtagTextString = randomTags.join(" ");

      // کپی کردن متن هشتگ به کلیپ بورد
      await navigator.clipboard.writeText(hashtagTextString);
      toast.success("هشتگ‌ها با موفقیت کپی شدند");
    } catch {
      toast.error("خطا در کپی کردن هشتگ‌ها");
    } finally {
      setLoading(false);
      closeModal();
    }
  };

  const getRandomHashtags = (count: number) => {
    const shuffled = hashtags
      .map((tag) => `#${tag.name}`) // اضافه کردن # به ابتدای هر هشتگ
      .sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  if (loading) return <LoadingModal />;

  const buttonConfig = {
    modalName: "ExportHashtag",
    buttonName: "خروجی اینستاگرام",
  };

  return (
    <>
      <Modal buttonConfig={buttonConfig}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="hashatg_name">نوع</Label>
            <span className="text-xl text-red-500">{selectedType}</span>
          </div>

          <div>
            <Label htmlFor="hashatg_count">تعداد</Label>
            <select
              id="hashatg_count"
              {...register("hashatg_count", {
                required: "انتخاب تعداد الزامی است",
              })}
              className="border rounded-md p-2 w-full"
            >
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="6">6</option>
              <option value="8">8</option>
              <option value="10">10</option>
              <option value="12">12</option>
              <option value="14">14</option>
              <option value="16">16</option>
              <option value="18">18</option>
              <option value="20">20</option>
            </select>
            {errors.hashatg_count && (
              <p className="text-red-500 text-sm">
                {errors.hashatg_count.message}
              </p>
            )}
          </div>

          <Button type="submit">خروجی متن هشتگ</Button>
        </form>
      </Modal>
    </>
  );
}
