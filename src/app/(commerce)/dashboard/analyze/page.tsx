"use client";
import LoadingModal from "@/components/MainComponents/LoadingModal";
import { PTable } from "@/components/PComponent/table/PTable";
import analyzeProductTable from "@/components/dashboard/analyze/analyzeProductTable";
import useSWR from "swr";

const Analyze = () => {
  const { data, error, isLoading } = useSWR<{ data: ProductData[] }>(
    "/analyze/products"
  );
  const productData = data?.data || [];
  const calculateMonthlyStats = (items: ProductData[]): MonthlyStats[] => {
    const groupedItems: { [key: string]: number[] } = {};
    items.forEach((item) => {
      const [year, month] = item.jalali_date_chanell.split("-");

      const key = `${year}-${month}`;
      if (!groupedItems[key]) {
        groupedItems[key] = [];
      }
      groupedItems[key].push(parseFloat(item.price));
    });

    return Object.keys(groupedItems).map((key) => {
      const prices = groupedItems[key];
      const totalItems = prices.length;
      const avgPrice =
        prices.reduce((sum, price) => sum + price, 0) / totalItems;
      const maxPrice = Math.max(...prices);
      const minPrice = Math.min(...prices);

      return {
        yearMonth: key,
        totalItems,
        avgPrice: avgPrice.toFixed(2),
        maxPrice,
        minPrice,
      };
    });
  };
  const monthlyStatsData: MonthlyStats[] =
    productData.length > 0 ? calculateMonthlyStats(productData) : [];
  if (isLoading) {
    return <LoadingModal />;
  }
  if (error) {
    return <>مشکلی پیش آمده است لطفا رفش نمایید</>;
  }
  return (
    <>
      <div className="flex flex-col justify-center rtl">
        <div>
          <PTable
            tableTitle={"تحلیل قیمت کانال"}
            header={analyzeProductTable}
            data={monthlyStatsData}
          />
        </div>
      </div>
    </>
  );
};
export default Analyze;
