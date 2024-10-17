"use client";
import { useForm } from "react-hook-form";
import { Label } from "../ui/label";
interface ITextForm {
  textItems: {
    label: string;
    name: string;
    required?: boolean;
  };
}
const TextForm: React.FC<ITextForm> = ({ textItems }) => {
  console.log("first", textItems);
  const { register } = useForm();
  const { label, name, required } = textItems;

  return (
    <div className="m-2 flex flex-col ">
      <Label className="m-2">{label}</Label>
      <input
        type="text"
        className="rtl sm:w-80 w-40 px-3 py-2 border rounded-md shadow-lg focus:outline-none focus:ring focus:border-blue-300"
        {...register(name, { required: required || false })}
      />
    </div>
  );
};

export default TextForm;
