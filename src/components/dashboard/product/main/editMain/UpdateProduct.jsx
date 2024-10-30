"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { updateMainProductService } from "@/services/product/mainProduct";
import { useRouter } from "next/navigation";
import { updateItems } from "./updateItems";

const UpdateProduct = ({ product }) => {
  const [formData, setFormData] = useState(product);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateMainProductService(product.id, formData);
      toast.success("محصول با موفقیت آپدیت شد");
      router.push("/dashboard/product/showMain");
    } catch  {
      toast.error("آپدیت  محصول ناموفق بود");
    } finally {
      setLoading(false);
    }
  };

  const renderInputField = (field) => {
    switch (field.type) {
      case "text":
      case "number":
        return (
          <div key={field.id} className="mb-4 rtl mx-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field.name}>
              {field.label}
            </label>
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleInputChange}
              required={field.required}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        );
      case "select":
        return (
          <div key={field.id} className="rtl mb-4 mx-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field.name}>
              {field.label}
            </label>
            <select
              id={field.name}
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleInputChange}
              required={field.required}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              {field.option.map((opt, index) => (
                <option key={index} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg">
      {updateItems.flat().map((field) => renderInputField(field))}
      <div className=" flex items-center justify-center mb-8">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {loading ? "در حال آپدیت..." : "آپدیت محصول"}
        </button>
      </div>
      
    </form>
  );
};

export default UpdateProduct;
