"use client";
import { UseFormRegister } from "react-hook-form";

interface NumberInputProps {
  name: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  required?: boolean;
  min?: number; 
}

const NumberInput: React.FC<NumberInputProps> = ({
  name,
  placeholder,
  register,
  required,
  min,
}) => {
  return (
    <input
      type="number"
      placeholder={placeholder}
      min={min}
      className="rtl sm:w-80 w-40 px-3 py-2 border rounded-md shadow-lg focus:outline-none focus:ring focus:border-blue-300"
      {...register(name, {
        required: required,
      })}
    />
  );
};

export default NumberInput;
