"use client";
import Image from "next/image";
import React from "react";

interface OneImageProps<T> {
  product: T;
  size: number;
  justOneImage: boolean;
}

const OneImage = <
  T extends {
    images?: { image1: string };
    image?: string;
    product_name?: string;
  }
>({
  product,
  size,
  justOneImage,
}: OneImageProps<T>) => {
  const BASE_URL = process.env.NEXT_PUBLIC_IMAGE_APP_BASE_URL;
  const srcImage = justOneImage
    ? `${BASE_URL}${product?.image}`
    : `${BASE_URL}${product?.images?.image1}`;
  return (
    <div className="flex justify-center items-center w-80  ">
      <Image
        src={srcImage}
        alt={product?.product_name || `Image 1`}
        className="rounded-xl mt-4"
        width={size}
        height={size}
        priority={true}
        style={{ width: "auto", height: "auto" }}
      />
    </div>
  );
};

export default OneImage;
