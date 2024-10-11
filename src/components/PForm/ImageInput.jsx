"use client";
import Image from "next/image";
const ImageInput = ({
  id,
  register,
  handleFileChange,
  imagePreviews,
  handleDeleteImage,
  required,
}) => {
  return (
    <div className="flex flex-col">
      <input
        type="file"
        id={id}
        name="files"
        accept="image/*"
        multiple
        className="hidden"
        {...register("files", {
          onChange: (e) => {
            handleFileChange(e);
          },
          required: required || false,
        })}
      />
      <label
        htmlFor={id}
        className="cursor-pointer w-full py-2 px-4 border rounded-md bg-green-900 text-gray-100 text-center"
      >
        انتخاب تصاویر
      </label>
      <div className="flex flex-wrap mt-2">
        {imagePreviews.map((preview, index) => (
          <div key={index} className="relative m-2">
            <Image
              src={preview}
              alt={`Selected ${index}`}
              className="max-w-full h-auto"
              width="100"
              height="100"
            />
            <button
              type="button"
              onClick={() => handleDeleteImage(index)}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageInput;
