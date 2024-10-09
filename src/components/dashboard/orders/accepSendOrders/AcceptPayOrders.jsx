"use client";
import LoadingModal from "@/components/Main/LoadingModal";
import { PTable } from "@/components/PTable/PTable";
import sendOrdersTable from "./sendOrdersTable";
import useSWR from "swr";

const AcceptPayOrders = () => {
  const status = 5;
  const { data: acceptPayOrders, isLoading } = useSWR(
    `/orders/get/getStatus?status=${status}`
  );
  const data = acceptPayOrders?.data || [];
  if (isLoading) {
    return <LoadingModal />;
  }
  return (
    <div>
      <PTable
        header={sendOrdersTable}
        items={data}
        tableTitle={"فاکتورهای در انتظار تایید ارسال"}
      />
    </div>
  );
};

export default AcceptPayOrders;
