"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { addHahstagsService } from "@/services/hashtags";
import LoadingModal from "@/components/MainComponents/LoadingModal";
import toast from "react-hot-toast";
import { useModalStore } from "@/store/modalStore";
import { hashtagTypeStore } from "@/store/hashtagTypeStore";
import { mutate } from "swr";

interface FormValues {
  hashatg_name: string;
  hashatg_type: "tts" | "rain.g" | "hebe";
  hashatg_count: number;
}

export default function AddHashtag() {
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
      await addHahstagsService(data);
      mutate(`/hashtags/getAll?type=${selectedType}`);

      toast.success("هشتگ با موفقیت ثبت شد");
    } catch {
      toast.error("خطایی رخ داد");
    } finally {
      setLoading(false);
      closeModal();
    }
  };

  if (loading) return <LoadingModal />;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <Label htmlFor="hashatg_name">نام</Label>
          <Input
            id="hashatg_name"
            type="text"
            placeholder="نام هشتگ را وارد کنید"
            {...register("hashatg_name", {
              required: "وارد کردن نام الزامی است",
            })}
          />
          {errors.hashatg_name && (
            <p className="text-red-500 text-sm">
              {errors.hashatg_name.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="hashatg_type">نوع</Label>
          <select
            id="hashatg_type"
            {...register("hashatg_type", { required: "انتخاب نوع الزامی است" })}
            className="border rounded-md p-2 w-full"
          >
            <option value="" disabled>
              نوع هشتگ را انتخاب کنید
            </option>
            <option value="tts">tts</option>
            <option value="rain.g">rain.g</option>
            <option value="hebe">hebe</option>
          </select>
          {errors.hashatg_type && (
            <p className="text-red-500 text-sm">
              {errors.hashatg_type.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="hashatg_count">مقدار</Label>
          <Input
            id="hashatg_count"
            type="number"
            placeholder="مقدار را وارد کنید"
            {...register("hashatg_count", {
              valueAsNumber: true,
              required: "وارد کردن نام الزامی است",
              min: { value: 0, message: "مقدار نمی‌تواند منفی باشد" },
              minLength: 0,
            })}
          />
          {errors.hashatg_count && (
            <p className="text-red-500 text-sm">
              {errors.hashatg_count.message}
            </p>
          )}
        </div>

        <Button type="submit">افزودن هشتگ</Button>
      </form>
    </>
  );
}
