// "use client";
// import LoadingModal from "@/components/Main/LoadingModal";
// import { PTable } from "@/components/PTable/PTable";
// import productItemTable from "@/components/dashboard/analyze/productItemTable";
// import useSWR from "swr";

// const Analyze = () => {
//   const { data, error, isLoading } = useSWR("/analyze/products");
//   const productData = data?.data || [];
//   const calculateMonthlyStats = (items) => {
//     const groupedItems = {};
//     items.forEach((item) => {
//       const [year, month] = item.jalali_date_chanell.split("-");

//       const key = `${year}-${month}`;
//       if (!groupedItems[key]) {
//         groupedItems[key] = [];
//       }
//       groupedItems[key].push(parseFloat(item.price));
//     });

//     return Object.keys(groupedItems).map((key) => {
//       const prices = groupedItems[key];
//       const totalItems = prices.length;
//       const avgPrice =
//         prices.reduce((sum, price) => sum + price, 0) / totalItems;
//       const maxPrice = Math.max(...prices);
//       const minPrice = Math.min(...prices);

//       return {
//         yearMonth: key,
//         totalItems,
//         avgPrice: avgPrice.toFixed(2),
//         maxPrice,
//         minPrice,
//       };
//     });
//   };
//   const monthlyStatsData =
//     productData.length > 0 ? calculateMonthlyStats(productData) : [];
//   if (isLoading) {
//     return <LoadingModal />;
//   }
//   if (error) {
//     return <>مشکلی پیش آمده است لطفا رفش نمایید</>;
//   }
//   return (
//     <>
//       <div className="flex flex-col justify-center rtl">
//         <div>
//           <PTable
//             header={productItemTable}
//             items={monthlyStatsData}
//             tableTitle={"تحلیل قیمت کانال"}
//           />
//         </div>
//       </div>
//     </>
//   );
// };
// export default Analyze;
