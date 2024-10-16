import { useState } from "react";
import { useFormContext } from "react-hook-form";
import Image from "next/image";
import { Button } from "../ui/button";

interface ImageInputProps {
  imageItems: {
    name: string;
    required?: boolean;
    error?: string;
  };
}

const ImageInput: React.FC<ImageInputProps> = ({ imageItems }) => {
  const { register } = useFormContext();
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newPreviews = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  return (
    <div className="flex flex-col">
      <input
        type="file"
        accept="image/*"
        multiple
        {...register(imageItems.name, { required: imageItems.required })}
        onChange={handleImageChange}
      />
      {imageItems.error && (
        <p className="text-red-500 text-sm mt-1">{imageItems.error}</p>
      )}
      <div className="flex flex-wrap mt-2">
        {imagePreviews.map((preview, index) => (
          <div key={index} className="relative m-2">
            <Image src={preview} alt={`Selected ${index}`} width="100" height="100" />
            <Button
              type="button"
              onClick={() => setImagePreviews((prev) => prev.filter((_, i) => i !== index))}
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
