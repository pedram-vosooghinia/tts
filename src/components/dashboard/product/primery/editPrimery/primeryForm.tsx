"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { deletePrimeryService } from "@/services/product/primeryProduct";
import { postMainProductService } from "@/services/product/mainProduct";

interface FormValues {
  category: string;
  product_name: string;
  detail: string;
  number_in_pack: string;
  price: string;
  inventory: string;
  person: string;
}

export default function PrimeryForm({product}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  console.log("product", product);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      category: "",
    },
  });
  // const onSubmit = (data: FormValues) => {
  //   console.log(data);
  // };

  const onSubmit = async (values: FormValues) => {
    setLoading(true);

    const finalValuePrimery = {
      product_name: values?.product_name,
      price: values?.price,
      inventory: values?.inventory,
      number_in_pack: values?.number_in_pack,
      images: product?.images,
      category: values?.category,
      person: values?.person,
    };
    const item = {
      id: product.id,
    };

    try {
      await postMainProductService(finalValuePrimery);
      await deletePrimeryService(item);
      toast.success("محصول با موفقیت ثبت شد");
      router.push("/dashboard/product/primery");
    } catch {
      toast.error("An error occurred");
    }

    setLoading(false);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-wrap gap-4 p-4 max-w-lg mx-auto justify-center md:justify-between items-center"
    >
      <div className="flex flex-col gap-2 w-52">
        <Label htmlFor="category">دسته بندی</Label>
        <select
          id="category"
          {...register("category", {
            required: "دسته بندی را انتخاب کنید",
          })}
          className="border  rounded-md p-2"
        >
          <option value=""></option>
          <option value="shoyande">شوینده</option>
          <option value="jelobande">جلوبندی</option>
          <option value="girbox">گیربکس</option>
        </select>
        {errors.category && (
          <div className="text-red-500">{errors.category.message}</div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="product_name">نام محصول</Label>
        <Input
          type="text"
          minLength={5}
          id="product_name"
          {...register("product_name", {
            required: "نام محصول را وارد کنید",
          })}
        />
        {errors.product_name && (
          <div className="text-red-500">{errors.product_name.message}</div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="number_in_pack">تعداد در بسته</Label>
        <Input
          type="number"
          min="0"
          id="number_in_pack"
          {...register("number_in_pack", {
            required: "تعداد در بسته را وارد کنید",
          })}
        />
        {errors.number_in_pack && (
          <div className="text-red-500">{errors.number_in_pack.message}</div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="price">قیمت</Label>
        <Input
          type="number"
          min="0"
          id="price"
          {...register("price", {
            required: "قیمت را وارد کنید",
          })}
        />
        {errors.price && (
          <div className="text-red-500">{errors.price.message}</div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="inventory">موجودی</Label>
        <Input
          type="number"
          id="inventory"
          min="0"
          {...register("inventory", {
            required: "موجودی را وارد کنید",
          })}
        />
        {errors.inventory && (
          <div className="text-red-500">{errors.inventory.message}</div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="person">شخص</Label>
        <Input
          id="person"
          type="text"
          minLength={2}

          {...register("person", {
            required: "شخص را وارد کنید",
          })}
        />
        {errors.person && (
          <div className="text-red-500">{errors.person.message}</div>
        )}
      </div>
      <div className="flex flex-col gap-2 w-96">
        <Label htmlFor="detail">توضیحات</Label>
        <Textarea
          itemType="text"
          id="detail"
          minLength={5}

          {...register("detail", {
            required: "جزییات  را وارد کنید",
          })}
        />
        {errors.detail && (
          <div className="text-red-500">{errors.detail.message}</div>
        )}
      </div>
      <div className="w-full flex justify-center items-center m-2">
        <Button type="submit">ارسال</Button>
      </div>
    </form>
  );
}
