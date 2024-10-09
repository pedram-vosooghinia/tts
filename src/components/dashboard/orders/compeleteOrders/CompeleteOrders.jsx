"use client";
import LoadingModal from "@/components/Main/LoadingModal";
import { PTable } from "@/components/PTable/PTable";
import CompleteOrdersTable from "./completeOrdersTable";
import ExcelDownloader from "./ExcelDownloader";
import useSWR from "swr";
const CompeleteOrders = () => {
  const status = 1;
  const { data: compeleteOrders, isLoading } = useSWR(
    `/orders/get/getStatus?status=${status}`
  );

  const data = compeleteOrders?.data || [];

  if (isLoading) {
    return <LoadingModal />;
  }

  return (
    <>
      <PTable
        header={CompleteOrdersTable}
        items={data}
        tableTitle={"فاکتورهای تکمیل شده"}
      />
      <ExcelDownloader data={data} />
    </>
  );
};

export default CompeleteOrders;
