// "use client";
// import LoadingModal from "@/components/Main/LoadingModal";
// import ShowProductPreForma from "@/components/dashboard/preForma/edit/ShowProductPreForma";
// import PreFormaSummary from "@/components/dashboard/preForma/edit/PreFormaSummary";
// import useSWR from "swr";
// import Modal from "@/components/Main/Modal";
// import { EditCompleteOrder } from "@/components/dashboard/orders/compeleteOrders/EditCompleteOrder";
// import useUserStore from "@/store/userStore";

// const CompeleteOrders = ({ params }) => {
//   const { user } = useUserStore();

//   const { data: orderData, isLoading } = useSWR(
//     params.id ? `/orders/get/getOne?id=${params.id}` : null
//   );

//   const order = orderData?.data[0] || {};

//   if (isLoading) {
//     return <LoadingModal />;
//   }

//   const buttonConfig = {
//     modalName: "SendOrder",
//     buttonName: "ادیت فاکتور نهایی",
//     className: "mb-8",
//   };
//   return (
//     <>
//       <div className="flex my-10 gap-4 flex-wrap justify-center rtl">
//         {order?.order_items.map((item) => (
//           <div key={item.barcode} className="flex flex-col">
//             <ShowProductPreForma product={item} />
//           </div>
//         ))}
//       </div>
//       <div className="flex flex-col justify-center items-center">
//         <div className="my-2">
//           نام مشتری : {order?.customer?.gender} {order?.customer?.total_name}{" "}
//           {order?.customer?.mobile}
//         </div>
//         <div className="my-2">{order?.customer?.marketer_name}</div>
//         <PreFormaSummary order={order} />
//         {(user?.role === "cto" ||user?.role === "manager" )&& (
//           <Modal buttonConfig={buttonConfig}>
//             <EditCompleteOrder order={order} params={params} />
//           </Modal>
//         )}
//       </div>
//     </>
//   );
// };

// export default CompeleteOrders;
