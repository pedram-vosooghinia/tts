"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import SelectForm from "./SelectForm";
import ImageInput from "./ImageInput";
import ButtonPForm from "./ButtonPForm";
import NumberInput from "./NumberInput";
import TelInput from "./TelInput";
import TextareaForm from "./TextAreaForm";
export const PForm = ({ Items, button, onSubmit, method }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [files, setFiles] = useState([]);

  const [imagePreviews, setImagePreviews] = useState([]);
  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setFiles((prev) => [...prev, ...newFiles]);
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };
  const handleDeleteImage = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };
  return (
    <form
      method={method}
      onSubmit={handleSubmit((values, event) =>
        onSubmit({ ...values, files }, event)
      )}
      className="flex flex-wrap justify-center items-center"
    >
      {Items.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="rtl flex justify-center  w-full flex-wrap"
        >
          {row.map((Item) => (
            <div
              key={Item.id}
              className={`mx-2  ${
                Item.type === "textarea" ? "mb-8 mt-2" : "my-2"
              }`}
            >
              <label
                className={` rtl block  text-sm font-bold mb-2`}
              >
                {Item.label} {Item.required && <span className="text-red-500">*</span>}
              </label>

              {Item.type === "select" ? (
                <SelectForm
                  name={Item.name}
                  value={Item.value}
                  options={Item.option}
                  register={register}
                  required={Item.required}
                />
              ) : Item.type === "file" ? (
                <ImageInput
                  id={Item.id}
                  register={register}
                  handleFileChange={handleFileChange}
                  imagePreviews={imagePreviews}
                  handleDeleteImage={handleDeleteImage}
                  required={Item.required}
                />
              ) : Item.type === "tel" ? (
                <TelInput
                  name={Item.name}
                  value={Item.value}
                  placeholder={Item.placeholder}
                  register={register}
                  required={Item.required}
                />
              ) : Item.type === "number" ? (
                <NumberInput
                  name={Item.name}
                  placeholder={Item.placeholder}
                  register={register}
                  required={Item.required}
                  min={Item.min}
                />
              ) : Item.type === "textarea" ? (
                <TextareaForm
                  name={Item.name}
                  value={Item.value}
                  placeholder={Item.placeholder}
                  register={register}
                  required={Item.required}
                />
              ) : (
                <input
                  type={Item.type}
                  name={Item.name}
                  value={Item.value}
                  required={Item.required || false}
                  placeholder={Item.placeholder}
                  className={`${
                    Item.mobileSize ? "w-40 md:w-80" : "w-80"
                  } rtl px-3 py-2 border rounded-md shadow-lg focus:outline-none focus:ring focus:border-blue-300`}
                  {...register(Item.name, {
                    required: Item.required,
                    maxLength: Item.maxLength,
                    minLength: Item.minLength,
                    pattern: Item.pattern,
                    value: Item.value,
                  })}
                />
              )}

              <div className="text-red-500 text-sm mt-2 rtl">
                {errors[Item.name] && (
                  <span>
                    {errors[Item.name].type === "required"
                      ? "لطفاً این فیلد را پر کنید"
                      : errors[Item.name].message}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
      <ButtonPForm label={button?.label || "افزودن"} />
    </form>
  );
};
