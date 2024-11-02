import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface ImageInputProps {
  imageItems: {
    required?: boolean;
  };
}

const ImageInput: React.FC<ImageInputProps> = ({ imageItems }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newPreviews = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-2">
      <Label>افزودن عکس</Label>
      <Button variant="destructive" onClick={handleButtonClick}>
        انتخاب عکس
      </Button>
      <Input
        type="file"
        accept="image/*"
        multiple
        {...register("files", {
          required: {
            value: imageItems.required ?? false,
            message: "لطفاً یک فایل انتخاب کنید",
          },
        })}
        onChange={handleImageChange}
        ref={inputRef}
        className="hidden"
      />

      {errors["files"]?.message &&
        typeof errors["files"]?.message === "string" && (
          <p className="text-red-500 text-sm mt-1">
            {String(errors["files"]?.message)}
          </p>
        )}
      <div className="text-red-500 text-sm mt-2 rtl"></div>
      <div className="flex flex-wrap mt-2">
        {imagePreviews.map((preview, index) => (
          <div key={index} className="relative m-2">
            <Image
              src={preview}
              alt={`Selected ${index}`}
              width="100"
              height="100"
            />
            <Button
              type="button"
              onClick={() =>
                setImagePreviews((prev) => prev.filter((_, i) => i !== index))
              }
              className="w-5 h-5 absolute top-0 right-0 bg-red-500 text-white rounded-full"
            >
              &times;
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageInput;
