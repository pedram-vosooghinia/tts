"use client";
import LoadingModal from "@/components/Main/LoadingModal";
import useSWR from "swr";
import MountOrders from "@/components/dashboard/analyze/MountOrders";
import getCurrentJalaliDate from "@/utils/jalali/jalali";
const AnalyzeOrders = () => {
  const jalaaliDate = getCurrentJalaliDate();
  const status = 1;
  const month = jalaaliDate?.month;
  const { data: analyzeOrders, isLoading } = useSWR(
    `/analyze/orders?status=${status}&month=${month}`
  );
  const data = analyzeOrders?.data || [];
  if (isLoading) {
    return <LoadingModal />;
  }
  return (
    <>
      <MountOrders data={data} month={month} />
    </>
  );
};

export default AnalyzeOrders;
