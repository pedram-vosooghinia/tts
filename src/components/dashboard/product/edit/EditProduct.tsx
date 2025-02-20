"use client";
import OneImage from "@/components/MainComponents/OneImage";
import { Product } from "@/types/product";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import LoadingModal from "@/components/MainComponents/LoadingModal";
import toast from "react-hot-toast";
import ModalSimple from "@/components/MainComponents/ModalSimple";
import { mutate } from "swr";
import {
  editProductTetisanService,
  addOrEditProductTtsService,
} from "@/services/product";
import { priceToHash } from "@/utils/price/hashPrice";
interface EditProductProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

interface FormValues {
  omde_price: number;
  percent_tak: number;
}

export default function EditProduct({
  product,
  isOpen,
  onClose,
}: EditProductProps) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>();

  const omde_price = Number(watch("omde_price", 0));
  const percentTak = Number(watch("percent_tak", 5));

  const singlePrice = omde_price + omde_price * (percentTak / 100);

  const onSubmit = async (value: FormValues) => {
    const mohasebetak = priceToHash(
      Number(value.omde_price) / 1000,
      Number(value.percent_tak)
    );
    const updatedEnglishName = product.english_name.replace(
      /(\s*PRD-[\d\w_]+)$/,
      ` ${mohasebetak}`
    );
    const dataTetisan = {
      pk: product.id,
      english_name: updatedEnglishName,
      price: singlePrice,
    };
    const dataTts = {
      id: product.id,
      available: product.available,
      brand: product.brand,
      name: product.name,
      english_name: updatedEnglishName,
      image: product.image,
      omde_price: omde_price,
      main_category: product.main_category,
      tak_price: singlePrice,
    };

    try {
      setLoading(true);
      await editProductTetisanService(dataTetisan);
      await addOrEditProductTtsService(dataTts);
      mutate("/proxy/getProduct");

      toast.success("محصول با موفقیت ثبت شد");
    } catch {
      toast.error("خطایی رخ داد");
    } finally {
      setLoading(false);
      onClose();
    }
  };

  if (loading) return <LoadingModal />;

  return (
    <ModalSimple isOpen={isOpen} onClose={onClose}>
      <Card>
        <CardContent>
          <div className="flex flex-col justify-center items-center">
            <OneImage
              imageUrl={product?.image[0] || "/placeholder.jpg"}
              size={100}
            />
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 mt-4"
          >
            <div>
              <div className=" flex items-center gap-2">
                <Label htmlFor="omde_price">قیمت عمده</Label>
                <div>{(product?.omde_price).toLocaleString()}</div>
              </div>
              <Input
                id="omde_price"
                type="number"
                placeholder="قیمت عمده جدید را وارد کنید"
                {...register("omde_price", {
                  required: "وارد کردن قیمت الزامی است",
                })}
              />
              {errors.omde_price && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.omde_price.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="percent_tak">درصد سود تک</Label>
              <select
                id="percent_tak"
                {...register("percent_tak", {
                  required: "انتخاب درصد سود الزامی است",
                })}
                className="border rounded-md p-2 w-full"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
                <option value="30">30</option>
                <option value="35">35</option>
                <option value="40">40</option>
                <option value="45">45</option>
                <option value="50">50</option>
                <option value="55">55</option>
                <option value="60">60</option>
                <option value="65">65</option>
                <option value="75">70</option>
                <option value="80">80</option>
                <option value="85">85</option>
                <option value="90">90</option>
                <option value="95">95</option>
                <option value="100">100</option>
              </select>
              {errors.percent_tak && (
                <p className="text-red-500 text-sm">
                  {errors.percent_tak.message}
                </p>
              )}
            </div>
            <p className="text-lg font-semibold">
              {singlePrice ? singlePrice.toLocaleString() : "0"} تومان
            </p>

            <Button type="submit">تغییر قیمت</Button>
          </form>
        </CardContent>
      </Card>
    </ModalSimple>
  );
}
