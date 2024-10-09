"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { searchMainProductService } from "@/services/product/mainProduct";
import LoadingModal from "@/components/Main/LoadingModal";
import { PForm } from "@/components/PForm/PForm";
import { searchItems, searchbutton } from "./searchItemForm";

export default function SearchMain({ onSearch }) {
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (values, event) => {
    try {
      setLoading(true);
      const response = await searchMainProductService({
        barcode: values.barcode,
      });
      if (response.data.success) {
        onSearch(response.data.data[0]);
      } else {
        toast.error("هیج محصولی با این کد یافت نشد");
        onSearch(null);
      }
    } catch (e) {
      toast.error(e.response?.data?.message || "An error occurred");
      onSearch(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingModal />;
  }
  return (
    <>
      <div>
        <PForm
          Items={searchItems}
          button={searchbutton}
          onSubmit={handleFormSubmit}
        />
      </div>
    </>
  );
}
