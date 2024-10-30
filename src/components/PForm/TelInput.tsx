"use client";
import { useForm } from "react-hook-form";

interface TelInputProps {
  name: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
}

const TelInput: React.FC<TelInputProps> = ({ name, value, placeholder,  required }) => {
  const { register } = useForm();

  return (
    <input
      type="tel"
      value={value}
      placeholder={placeholder}
      className="w-full px-3 py-2 border rounded-md shadow-lg focus:outline-none focus:ring focus:border-blue-300"
      {...register(name, {
        required: required,
        pattern: {
          value: /^[0-9]{10}$/,
          message: "شماره تماس باید بدون صفر و دقیقا 10 رقم باشد",
        },
      })}
    />
  );
};

export default TelInput;
