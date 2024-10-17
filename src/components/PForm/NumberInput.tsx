"use client";
import { useForm } from "react-hook-form";
import { Label } from "../ui/label";
interface NumberInputProps {
  numberItems: {
    label: string;
    name: string;
    required?: boolean;
  };
}
const NumberInput: React.FC<NumberInputProps> = ({ numberItems }) => {
  console.log("first", numberItems);
  const { register } = useForm();
  const { label, name, required } = numberItems;

  return (
    <div className="m-2 flex flex-col ">
      <Label className="m-2">{label}</Label>
      <input
        type="number"
        // placeholder={placeholder}
        // min={min}
        className="rtl sm:w-80 w-40 px-3 py-2 border rounded-md shadow-lg focus:outline-none focus:ring focus:border-blue-300"
        {...register(name, { required: required || false })}
      />
    </div>
  );
};

export default NumberInput;
