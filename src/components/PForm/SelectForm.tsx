"use client";
import { useForm } from "react-hook-form";
import { Label } from "../ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "../ui/select";

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
  const { register } = useForm();
  const { name, value, option, required, label } = selectItems;

  return (
    <div className="m-2  ">
      <Label className="rtl block text-sm mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <Select
        defaultValue={value}
        {...register(name, { required: required || false })}
      >
        <SelectTrigger className="w-[180px] rtl p-2  rounded-md shadow-lg focus:outline-none focus:ring focus:border-blue-300">
          <SelectValue placeholder="انتخاب کنید" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {option?.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label || "انتخاب کنید"}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectForm;
