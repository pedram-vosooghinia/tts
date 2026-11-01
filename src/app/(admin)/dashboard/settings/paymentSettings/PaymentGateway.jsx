// "use client";

// import useSWR, { mutate } from "swr";
// import master from "@/styles/MasterAdmin.module.css";
// import Loading from "@/src/components/loading/loading_page/Loading";
// import React, { useState } from "react";
// import ModalDelete from "@/src/components/modal/delete/ModalDelete";
// import toast from "react-hot-toast";
// import ChangeStatus from "@/src/components/modal/changeStatus/ChangeStatus";
// import {
//   deleteGatwayService,
//   editGatwayStatusService,
// } from "@/services/swrServices/setting";
// import Link from "next/link";
// import Image from "next/image";
// export default function PaymentGateway() {
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [showChangeStatus, setShowChangeStatus] = useState(false);
//   const [selectedId, setSelectedId] = useState("");
//   const [status, setStatus] = useState(0);
//   const placeholder = "/images/logo.png";

//   const { data: payment, isLoading: loadingPayment } = useSWR(
//     "/admin/gateway/all?type=payment"
//   );
//   const { data: sms, isLoading: loadingSms } = useSWR(
//     "/admin/gateway/all?type=sms"
//   );
//   if (loadingPayment || loadingSms) {
//     return <Loading />;
//   }

//   const gatewayData = payment?.result || [];
//   const smsData = sms?.result || [];
//   const deleteHandler = async () => {
//     try {
//       const res = await deleteGatwayService(selectedId);
//       if (res.data.status) {
//         mutate(`/admin/gateway/all?type=payment`);
//         mutate(`/admin/gateway/all?type=sms`);
//       }
//       setShowDeleteConfirm(false);
//       toast.success("درگاه پرداخت موفقیت حذف شد");
//     } catch (ee) {
//       setShowDeleteConfirm(false);
//       toast.error(ee.response.data.message);
//     }
//   };
//   const changeStatusHandler = async () => {
//     try {
//       const res = await editGatwayStatusService(selectedId, status);
//       if (res.data.status) {
//         mutate(`/admin/gateway/all?type=payment`);
//         mutate(`/admin/gateway/all?type=sms`);
//       }
//       toast.success("وضعیت با موفقیت تغییر کرد");
//       setShowChangeStatus(false);
//     } catch (err) {
//       toast.error("خطا در تغییر وضعیت");
//       setShowChangeStatus(false);
//     }
//   };

//   return (
//     <div className="w-full">
//       <div className=" flex justify-between items-start w-full">
//         <span></span>
//         <div className="flex flex-col gap-y-4 items-end ">
//           <Link
//             href="/settings/paymentSettings/addPaymentGatway"
//             className={master.addNewButton}
//           >
//             افزودن درگاه
//           </Link>
//         </div>
//       </div>

//       <div className={`${master.tableSection} space-y-8`}>
//         <span className={master.titlePage}>پرداخت</span>
//         <table className={master.customTable}>
//           <thead>
//             <tr>
//               <th>عکس</th>
//               <th>عنوان درگاه</th>
//               <th>وضعیت</th>
//               <th>نام درگاه</th>
//               <th>عملیات</th>
//             </tr>
//           </thead>
//           <tbody>
//             {gatewayData
//               ? gatewayData.map((item) => {
//                   return (
//                     <tr key={item.id}>
//                       <td>
//                         <Image
//                           src={item?.logo || placeholder}
//                           alt={item?.name}
//                           width={50}
//                           height={50}
//                           className=""
//                         />
//                       </td>
//                       <td>{item?.title}</td>
//                       <td>{item?.status == 1 ? "فعال" : "غیرفعال"} </td>
//                       <td>{item?.name} </td>

//                       <td>
//                         <div className={master.btnsOperation_wrapper}>
//                           <span
//                             className={`${master.btnOperation} ${master.btnEdite}`}
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               setSelectedId(item?.id);
//                               setShowChangeStatus(true);
//                               setStatus(item.status === 1 ? 0 : 1);
//                             }}
//                           >
//                             تغییر وضعیت
//                           </span>

//                           <Link
//                             href={`/settings/paymentSettings/editPaymentGatway/${item.id}`}
//                             className={`${master.btnOperation} ${master.btnEdite}`}
//                           >
//                             ویرایش
//                           </Link>

//                           <span
//                             className={`${master.btnOperation} ${master.btnDelete}`}
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               setShowDeleteConfirm(true);
//                               setSelectedId(item?.id);
//                             }}
//                           >
//                             حذف
//                           </span>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })
//               : ""}
//           </tbody>
//         </table>
//         <span className={master.titlePage}>sms</span>

//         <table className={master.customTable}>
//           <thead>
//             <tr>
//               <th>عکس</th>
//               <th>عنوان درگاه</th>
//               <th>وضعیت</th>
//               <th>نام درگاه</th>
//               <th>عملیات</th>
//             </tr>
//           </thead>
//           <tbody>
//             {smsData
//               ? smsData.map((item) => {
//                   return (
//                     <tr key={item.id}>
//                       <td>
//                         <Image
//                           src={item?.logo || placeholder}
//                           alt={item?.name}
//                           width={50}
//                           height={50}
//                           className=""
//                         />
//                       </td>
//                       <td>{item?.title}</td>
//                       <td>{item?.status == 1 ? "فعال" : "غیرفعال"} </td>
//                       <td>{item?.name} </td>

//                       <td>
//                         <div className={master.btnsOperation_wrapper}>
//                           <span
//                             className={`${master.btnOperation} ${master.btnEdite}`}
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               setSelectedId(item?.id);
//                               setShowChangeStatus(true);
//                               setStatus(item.status === 1 ? 0 : 1);
//                             }}
//                           >
//                             تغییر وضعیت
//                           </span>

//                           <Link
//                             href={`/settings/paymentSettings/editPaymentGatway/${item.id}`}
//                             className={`${master.btnOperation} ${master.btnEdite}`}
//                           >
//                             ویرایش
//                           </Link>
//                           <span
//                             className={`${master.btnOperation} ${master.btnDelete}`}
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               setShowDeleteConfirm(true);
//                               setSelectedId(item?.id);
//                             }}
//                           >
//                             حذف
//                           </span>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })
//               : ""}
//           </tbody>
//         </table>

//         {showDeleteConfirm ? (
//           <ModalDelete
//             titleModal="آیا می‌خواهید درگاه پرداخت را حذف کنید؟"
//             showDeleteConfirm={showDeleteConfirm}
//             setShowDeleteConfirm={setShowDeleteConfirm}
//             itemId={selectedId}
//             onClickDeleteConfirm={deleteHandler}
//             isLoadingButton={false}
//             reject={false}
//             rejectMessage={false}
//             setRejectMessage={false}
//           />
//         ) : (
//           ""
//         )}
//         {showChangeStatus && (
//           <ChangeStatus
//             titleModal="آیا می‌خواهید وضعیت را تغییر دهید؟"
//             itemId={selectedId}
//             showActive={showChangeStatus}
//             setShowActive={setShowChangeStatus}
//             onClickActiveButton={changeStatusHandler}
//             isLoadingButton={false}
//           />
//         )}
//       </div>
//     </div>
//   );
// }
