"use client";
import { useForm } from "react-hook-form";
import { Label } from "../ui/label";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFormProps {
  selectItems: {
    name: string;
    value?: string;
    option?: SelectOption[];
    required?: boolean;
    label: string;
  };
}

const SelectForm: React.FC<SelectFormProps> = ({ selectItems }) => {
  console.log("first", selectItems);
  const { register } = useForm();
  const { name, value, option, required, label } = selectItems;

  return (
    <div className="m-2 flex flex-col ">
      <Label className="m-2">{label}</Label>

      <select
        defaultValue={value}
        className="rtl sm:w-80 w-40 p-2   border rounded-md shadow-lg focus:outline-none focus:ring focus:border-blue-300"
        {...register(name, { required: required || false })}
      >
        {option?.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectForm;
