"use client";
import Image from "next/image";
interface OneImageProps {
  size: number;
  imageUrl: string;
}

const OneImage = (props: OneImageProps) => {
  const { imageUrl, size } = props;
  const validImageUrl = imageUrl ? imageUrl : "/placeholder.jpg";
  return (
    <div className="flex justify-center items-center w-80  ">
      <Image
        src={validImageUrl}
        alt={`Image 1`}
        className="rounded-xl mt-4"
        width={size}
        height={size}
        loading="lazy"
        style={{ width: "auto", height: "auto" }}
      />
    </div>
  );
};

export default OneImage;
