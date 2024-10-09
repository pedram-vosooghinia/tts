// "use client";
// import { useState, useEffect } from "react";
// import EditShoppingValues from "@/components/dashboard/preForma/carts/EditShoppingValues";
// import MoveToShipping from "@/components/dashboard/preForma/carts/MoveToShipping";
// import useShoppingStore from "@/store/shoppingStore";
// import OneImage from "@/components/Main/OneImage";
// import CustomerManagement from "@/components/dashboard/preForma/carts/CustomerManagement";
// import useUserStore from "@/store/userStore";
// import DetailPreForma from "@/components/dashboard/preForma/carts/DetailPreForma";
// import CartSummary from "@/components/dashboard/preForma/carts/CartSummary";
// export default function Carts() {
//   const [show, setShow] = useState(false);
//   const { user } = useUserStore();
//   const { cart } = useShoppingStore();
//   const [exceptionsValue, setExceptionsValue] = useState({});
//   const { details ,cartItems} = cart;
//   useEffect(() => {
//     if (cartItems.length !== 0) {
//       setShow(true);
//     }
//   }, [cartItems]);

//   const handleExceptionsValueChange = (barcode, value) => {
//     setExceptionsValue((prev) => ({
//       ...prev,
//       [barcode]: value,
//     }));
//   };

//   const calculateTotalPrice = (item) => {
//     const exceptionNumberInPack = exceptionsValue[item.barcode];
//     const number_in_pack = exceptionNumberInPack
//       ? Number(exceptionNumberInPack)
//       : item.number_in_pack;
//     return item.price * item.quantity * number_in_pack;
//   };

//   const totalInvoice =
//     cart?.cartItems.reduce((acc, cur) => acc + calculateTotalPrice(cur), 0) *
//     1000;
//   const discountAmount = details ? details?.discount * 1000 : 0;
//   const marketerDiscount =
//     details?.marketer_name === "joyande" ? totalInvoice * 0.07 : 0;
//   const finalPay = totalInvoice - discountAmount - marketerDiscount;
//   const buyType = details?.buy_type;

//   return (
//     <>
//       <div className="m-6 text-xl text-center">سبد خرید</div>
//       {show && cartItems.length !== 0 ? (
//         <div className="rtl flex flex-col justify-center items-center">
//           <div className="flex flex-wrap justify-center items-end mx-4">
//             {cart?.cartItems.map((item) => (
//               <div
//                 key={item.barcode}
//                 className="flex justify-center items-center"
//               >
//                 <div className="flex flex-col">
//                   <div className="flex flex-col mx-2">
//                     <OneImage product={item} size={100} />
//                     <EditShoppingValues key={item?.barcode} product={item} />
//                   </div>
//                   <div className="flex flex-col">
//                     <div className="mx-2 font-bold">{item.product_name}</div>
//                     <div className="mx-2">
//                       قیمت: {(item?.price * 1000).toLocaleString()} تومان
//                     </div>
//                     <div className="mx-2">کد: {item?.barcode}</div>

//                     <div className="mx-2">
//                       تعداد در جین {item?.number_in_pack}
//                     </div>

//                     {user?.role === "manager" && (
//                       <div className="mx-2 mt-2">
//                         <label className="block font-bold">
//                           تعداد استثنا :
//                         </label>
//                         <input
//                           type="number"
//                           className="w-full p-2 border rounded"
//                           min={1}
//                           value={exceptionsValue[item.barcode] || ""}
//                           onChange={(e) =>
//                             handleExceptionsValueChange(
//                               item.barcode,
//                               e.target.value
//                             )
//                           }
//                         />
//                       </div>
//                     )}
//                     <div className="mx-2">
//                       تعداد کل:
//                       {exceptionsValue[item.barcode]
//                         ? exceptionsValue[item.barcode] * item?.quantity
//                         : item?.number_in_pack * item?.quantity}
//                     </div>
//                     <div className="mx-2 font-bold">
//                       قیمت کل:
//                       {(calculateTotalPrice(item) * 1000).toLocaleString()}{" "}
//                       تومان
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <CartSummary
//             totalInvoice={totalInvoice}
//             discountAmount={discountAmount}
//             marketerDiscount={marketerDiscount}
//             finalPay={finalPay}
//           />
//           <CustomerManagement />
//           <DetailPreForma />
//         </div>
//       ) : (
//         <div className="text-center m-20">
//           <div>سبد خرید شما خالی می باشد</div>
//         </div>
//       )}
//       <MoveToShipping
//         exceptionsValue={exceptionsValue}
//         totalInvoice={totalInvoice}
//         discountAmount={discountAmount}
//         marketerDiscount={marketerDiscount}
//         finalPay={finalPay}
//         buyType={buyType}
//       />
//     </>
//   );
// }
