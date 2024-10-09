// "use client"
// import { updateOrderService } from "@/services/orders";
// import { useRouter } from "next/navigation";
// import { useState, useEffect } from "react";
// import toast from "react-hot-toast";
// import { Button } from "@/components/ui/button";
// import { useModalStore } from "@/store/modalStore";

// export const EditCompleteOrder = ({ order, params }) => {
//   const [loading, setLoading] = useState(false);
//   const { closeModal } = useModalStore();
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     discount_amount: "",
//     marketer_discount: "",
//     jalali_date_nopay: "",
//     jalali_date_pay: "",
//   });

//   useEffect(() => {
//     if (order) {
//       setFormData({
//         discount_amount: order.discount_amount || "",
//         marketer_discount: order.marketer_discount || "",
//         jalali_date_nopay: order.jalali_date_nopay || "",
//         jalali_date_pay: order.jalali_date_pay || "",
//       });
//     }
//   }, [order]);

//   const orderFields = [
//     { label: "مقدار تخفیف", key: "discount_amount", type: "number" },
//     { label: "مبلغ بازاریاب", key: "marketer_discount", type: "number" },
//     { label: "تاریخ ثبت فاکتور", key: "jalali_date_nopay", type: "text" },
//     { label: "تاریخ پرداخت فاکتور", key: "jalali_date_pay", type: "text" },
//   ];

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleFormSubmit = async (e) => {
//     setLoading(true);
//     e.preventDefault();

//     try {
//       const discountAmount = parseFloat(formData.discount_amount) || 0;
//       const marketerDiscount = parseFloat(formData.marketer_discount) || 0;

//       const final_pay = order?.total_price - discountAmount - marketerDiscount;
//       const clear_profit = order?.no_clear_profit - discountAmount - marketerDiscount;

//       const orderData = {
//         id: params.id,
//         formValues: formData,
//         final_pay,
//         clear_profit,
//       };

//        await updateOrderService(orderData);
//       toast.success("Order updated successfully");
//       router.push("/dashboard/orders");
//     } catch (error) {
//       toast.error(`Failed to update order: ${error}`);
//     } finally {
//       setLoading(false);
//       closeModal();
//     }
//   };

//   return (
//     <>
//       <form onSubmit={handleFormSubmit} className="space-y-4 mt-8">
//         {orderFields.map((field) => (
//           <div key={field.key} className="rtl flex flex-col">
//             <label className="font-bold">{field.label}</label>
//             <input
//               type={field.type}
//               name={field.key}
//               value={formData[field.key]}
//               onChange={handleInputChange}
//               className="border p-2 rounded"
//             />
//           </div>
//         ))}
//         <Button type="submit">
//           {loading ? "در حال پردازش ..." : "ثبت تغییرات"}
//         </Button>
//       </form>
//     </>
//   );
// };
