"use client";
import { useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
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
  const { label, name, required, placeholder, maxLength } = areaItems;

  return (
    <>
      <Label className={` rtl block  text-sm  mb-2`}>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <Input
        type="textarea"
        className="w-[180px] rtl p-2  rounded-md shadow-lg focus:outline-none focus:ring focus:border-blue-300"
        placeholder={placeholder}
        maxLength={maxLength}
        {...register(name, { required: required })}
      />
    </>
  );
};

export default TextareaForm;
