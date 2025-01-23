"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
// import { uploadImageService } from "@/services/product/primeryProduct";

interface ImageUploaderProps {
  onFilesChange: (files: File[]) => void; 
}

export default function ImageUploader({ onFilesChange }: ImageUploaderProps) {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setImagePreviews((prev) => [
        ...prev,
        ...fileArray.map((file) => URL.createObjectURL(file)),
      ]);
      onFilesChange(fileArray); // ارسال فایل‌ها به فرم اصلی
    }
  };

  return (
    <div className="flex justify-between flex-wrap">
      <Button type="button" variant="destructive" onClick={() => inputRef.current?.click()}>
        افزودن عکس
      </Button>
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        accept="image/*"
        onChange={handleImageChange}
        multiple
      />
      <div className="flex flex-wrap gap-2 mt-2">
        {imagePreviews.map((preview, index) => (
          <div key={index} className="relative">
            <Image
              src={preview}
              alt={`Preview ${index}`}
              width={100}
              height={100}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
