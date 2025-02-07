"use client";
import Image from "next/image";
import React from "react";

interface OneImageProps {
  size: number;
  imageUrl: string;
}

const OneImage = ({ imageUrl, size }: OneImageProps) => {

  return (
    <div className="flex justify-center items-center w-80  ">
      <Image
        src={imageUrl}
        alt={`Image 1`}
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
