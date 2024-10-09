"use client";
import LoadingModal from "@/components/Main/LoadingModal";
import { PTable } from "@/components/PTable/PTable";
import AcountingOrdersTable from "./acountingOrdersTable";
import useSWR from "swr";

const AccountingOrders = () => {
  const status = 3;
  const { data: accountingOrders, isLoading } = useSWR(
    `/orders/get/getStatus?status=${status}`
  );
  const data = accountingOrders?.data || [];
  if (isLoading) {
    return <LoadingModal />;
  }
  return (
    <PTable
      header={AcountingOrdersTable}
      items={data}
      tableTitle={"حسابداری"}
    />
  );
};

export default AccountingOrders;
