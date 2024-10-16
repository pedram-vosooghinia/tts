"use client";
import { useForm } from "react-hook-form";

interface TextareaFormProps {
  areaItems: {
    name: string;
    value?: string;
    required?: boolean;
    label: string;
    placeholder?: string;
    maxLength?: number;
  };
}

const TextareaForm: React.FC<TextareaFormProps> = ({ areaItems }) => {
  const { register } = useForm();
  return (
    <>
      <label className="rtl block text-sm font-bold mb-2">
        {areaItems.label}
        {areaItems.required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        className="rtl w-80 h-80 border rounded-md shadow-lg focus:outline-none focus:ring focus:border-blue-300"
        placeholder={areaItems.placeholder}
        maxLength={areaItems.maxLength}
        {...register(areaItems.name, { required: areaItems.required })}
      />
    </>
  );
};

export default TextareaForm;
