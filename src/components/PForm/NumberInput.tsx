"use client";
import { useFormContext } from "react-hook-form";  // Use useFormContext to get the form methods
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface NumberInputProps {
  numberItems: {
    label: string;
    name: string;
    required?: boolean;
  };
}
const NumberInput: React.FC<NumberInputProps> = ({ numberItems }) => {
  console.log("numberItems", numberItems);
  const { register } = useFormContext();  // Get the form context here
  const { label, name, required } = numberItems;

  return (
    <div className="m-2 ">
      <Label className={` rtl block  text-sm  mb-2`}>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <Input
        type="number"
        // placeholder={placeholder}
        // min={min}
        className="w-[180px] rounded-md shadow-lg focus:outline-none focus:ring focus:border-blue-300"
        {...register(name, { required: required || false })}
      />
    </div>
  );
};

export default NumberInput;
