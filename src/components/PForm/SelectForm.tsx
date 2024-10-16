"use client";
import { useForm } from "react-hook-form";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFormProps {
  selectItems: {
    name: string;
    value?: string;
    options?: SelectOption[];
    required?: boolean;
  };
}

const SelectForm: React.FC<SelectFormProps> = ({ selectItems }) => {
  const { register } = useForm();
  const { name, value, options, required } = selectItems;

  return (
    <select
      defaultValue={value}
      className="rtl sm:w-80 w-40 px-3 py-2 border rounded-md shadow-lg focus:outline-none focus:ring focus:border-blue-300"
      {...register(name, { required: required || false })}
    >
      {options?.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default SelectForm;
