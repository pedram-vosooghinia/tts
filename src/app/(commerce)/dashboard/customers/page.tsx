"use client";
import LoadingModal from "@/components/MainComponents/LoadingModal";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { ChevronDown } from "lucide-react";
import PTable2 from "@/components/PComponent/table/Ptable2";
import { Customer } from "@/types/customer";
import { CustomerColumns } from "@/components/dashboard/customers/CustomerColumns";
import { customerSellerStore } from "@/store/customerSellerStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
const Customers = () => {
  const router = useRouter();
  const { selectedSeller, setSelectedSeller } = customerSellerStore();

  const { data: customersData, isLoading } = useSWR(
    `/customers/get?seller_name=${selectedSeller}`
  );
  const handleSellerChange = (seller: string) => {
    setSelectedSeller(seller);
  };
  const customers = customersData?.data || [];
  console.log("customers", customers);
  const handelAddcustomer = () => {
    router.push("/dashboard/customers/add");
  };
  if (isLoading) {
    return <LoadingModal />;
  }
  return (
    <div className="rtl flex flex-col justify-center items-center">
      <div className="flex flex-col mx-4">
        <div className="flex justify-between items-center">
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  {selectedSeller
                    ? `نوع: ${selectedSeller}`
                    : "تغییر نوع فروشنده"}
                  <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleSellerChange("pedram")}>
                  پدرام
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSellerChange("rasol")}>
                  رسول
                </DropdownMenuItem>

                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Button onClick={handelAddcustomer}>افزودن مشتری جدید</Button>
        </div>
        <PTable2<Customer> data={customers} columns={CustomerColumns} />
      </div>
    </div>
  );
};

export default Customers;
