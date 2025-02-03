"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import useShoppingStore from "@/store/shoppingStore";
import Modal from "@/components/MainComponents/Modal";
import useSWR from "swr";
import useDebounce from "@/hooks/useDebounce";
import { useModalStore } from "@/store/modalStore";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Customer } from "@/types/customer";

const CustomerManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { setCustomer, removeCustomer, cart } = useShoppingStore();
  const { customer, cartItems } = cart;

  const debouncedSearch = useDebounce((value: string) => {
    setSearchTerm(value);
  }, 500);
  
  const { closeModal } = useModalStore();
  const { data: CustomerManagement, isLoading } = useSWR(
    searchTerm ? `/customers/search?name=${searchTerm}` : null
  );

  const data = CustomerManagement?.data || [];
  const handleSelectCustomer = (customer:Customer) => {
    setCustomer(customer);
    closeModal();
    toast.success("مشتری انتخاب شد");
  };

  const handleRemoveCustomer = () => {
    removeCustomer();
    toast.success("مشتری حذف شد");
  };
  const buttonConfig = {
    disabled: isLoading,
    modalName: "CustomerManagement",
    buttonName: "افزودن مشتری",
    className: "my-8",
  };

  return (
    <>
      {customer && (
        <Card className="mx-2">
          <CardContent className="flex flex-wrap gap-8 justify-between items-center mt-6 ">
            <div className="text-lg ">نام مشتری: {customer.customer_name}</div>
            <Button
              className=" bg-red-500 text-gray-100 "
              onClick={handleRemoveCustomer}
            >
              حذف مشتری
            </Button>
          </CardContent>
        </Card>
      )}
      {!customer && cartItems.length !== 0 && (
        <Modal buttonConfig={buttonConfig}>
          <div className="flex flex-col justify-center items-center mt-8">
            <div className="text-center">
              لطفا مشتری خود را جستجو و انتخاب کنید
            </div>

            <div className="mt-8 flex justify-between items-center">
              <input
                type="text"
                onChange={(e) => debouncedSearch(e.target.value)}
                className="border p-2 mx-2 rounded"
                placeholder="نام مشتری را وارد کنید"
              />
            </div>
            {data.length > 0 && (
              <div className="mt-4 max-h-64 overflow-y-auto w-full border p-2 rounded">
                {data.map((customer:Customer) => (
                  <div
                    key={customer.document_id}
                    className="p-2 cursor-pointer "
                    onClick={() => handleSelectCustomer(customer)}
                  >
                    {customer.customer_name} 
                    {customer.mobile}
                  </div>
                ))}
              </div>
            )}
          </div>
        </Modal>
      )}
    </>
  );
};

export default CustomerManagement;
