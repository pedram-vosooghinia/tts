// "use client";
// import { useState } from "react";
// import LoadingModal from "@/components/Main/LoadingModal";
// import ShowProductPreForma from "@/components/dashboard/preForma/edit/ShowProductPreForma";
// import PreFormaSummary from "@/components/dashboard/preForma/edit/PreFormaSummary";
// import ProfitCounting from "@/components/dashboard/orders/accountingOrders/ProfitCounting";
// import AcountingOrderButton from "@/components/dashboard/orders/accountingOrders/AcountingOrderButton";
// import useSWR from "swr";
// const AccountingInvoice = ({ params }) => {
//   const [buyPrices, setBuyPrices] = useState({});
//   const {
//     data: orderData,
//     error,
//     isLoading,
//   } = useSWR(params.id ? `/orders/get/getOne?id=${params.id}` : null);
//   if (isLoading) {
//     return <LoadingModal />;
//   }
//   if (error) {
//     return <div>Error loading data</div>;
//   }
//   const order = orderData?.data[0] || {};

//   const handleBuyPriceChange = (productId, value) => {
//     setBuyPrices((prevPrices) => ({
//       ...prevPrices,
//       [productId]: value,
//     }));
//   };

//   const totalBuySum = Object.keys(buyPrices).reduce((sum, productId) => {
//     const product = order?.order_items.find(
//       (item) => item.barcode === parseInt(productId)
//     );
//     if (product) {
//       sum +=
//         (buyPrices[productId] || 0) *
//         product.number_in_pack *
//         product.quantity *
//         1000;
//     }
//     return sum;
//   }, 0);

//   const totalNoClearProfitSum = order?.order_items.reduce((sum, product) => {
//     const buyPrice = buyPrices[product.barcode] || 0;
//     sum +=
//       (product.number_in_pack * product.quantity * product.price -
//         buyPrice * product.number_in_pack * product.quantity) *
//       1000;
//     return sum;
//   }, 0);

//   const totalClearProfitSum =
//     totalNoClearProfitSum -
//     order.discount_amount * 1000 -
//     order.marketer_discount * 1000;

//   return (
//     <>
//       <div className="flex flex-col justify-center items-center">
//         <div className="flex rtl">
//           <div className="m-4">
//             نام مشتری : {order?.customer?.gender} {order?.customer?.total_name}{" "}
//             {order?.customer?.mobile}
//           </div>
//           <div className="m-4">تاریخ فاکتور: {order?.jalali_date_nopay}</div>
//         </div>
//         <div className="m-4">
//           {order?.customer?.marketer_name.split("_")[0]}
//         </div>

//         <div className="flex m-4 gap-4 flex-wrap justify-center rtl">
//           {order?.order_items.map((item) => (
//             <div key={item.barcode} className="flex flex-col">
//               <ShowProductPreForma product={item} />
//               <ProfitCounting
//                 item={item}
//                 buyPrice={buyPrices[item.barcode]}
//                 handleBuyPriceChange={handleBuyPriceChange}
//               />
//             </div>
//           ))}
//         </div>
//         <PreFormaSummary order={order} />
//         <div className="rtl flex justify-between items-center w-full mb-8"></div>
//       </div>

//       <div className="m-4 p-4  rounded text-center">
//         <div>جمع کل خرید: {totalBuySum.toLocaleString()}</div>
//         <div>جمع کل سود ناخالص: {totalNoClearProfitSum.toLocaleString()}</div>
//         <div>جمع کل سود خالص: {totalClearProfitSum.toLocaleString()}</div>
//       </div>
//       <AcountingOrderButton
//         order={order}
//         buyPrices={buyPrices}
//         totalNoClearProfitSum={totalNoClearProfitSum}
//         totalClearProfitSum={totalClearProfitSum}
//       />
//     </>
//   );
// };

// export default AccountingInvoice;
