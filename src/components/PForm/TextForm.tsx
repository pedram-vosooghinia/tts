"use client";
import { useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
interface ITextForm {
  textItems: {
    label: string;
    name: string;
    required?: boolean;
  };
}
const TextForm: React.FC<ITextForm> = ({ textItems }) => {
  const { register } = useForm();
  const { label, name, required } = textItems;

  return (
    <div className="m-2 ">
      <Label className={` rtl block  text-sm  mb-2`}>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <Input
        type="text"
        className="w-[180px] rtl p-2  rounded-md shadow-lg focus:outline-none focus:ring focus:border-blue-300"
        {...register(name, { required: required || false })}
      />
    </div>
  );
};

export default TextForm;
