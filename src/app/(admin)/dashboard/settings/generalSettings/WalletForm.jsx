// "use client";
// import master from "@/styles/MasterAdmin.module.css";
// import { useState, useEffect } from "react";
// import { mutate } from "swr";
// import useSWR from "swr";
// import toast from "react-hot-toast";
// import Loading from "@/src/components/loading/loading_page/Loading";
// import { postPropertySettingStoreService } from "@/services/swrServices/setting";
// import styles from "@/styles/settings/smsSettings.module.css";
// import { NumericFormat } from "react-number-format";
// import { propertyTabsGeneral, initialValuesPropertyGenaral } from "./utils";

// export default function WalletForm() {
//   const [formValues, setFormValues] = useState(initialValuesPropertyGenaral);
//   const type = "wallet";
//   const { data, isLoading } = useSWR(`/admin/setting/all/${type}`);
//   useEffect(() => {
//     if (data?.result) {
//       setFormValues(data.result);
//     }
//   }, [data]);
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const payload = {
//       ...formValues,

//       // 🔹 تبدیل فقط این دو کلید به number
//       wallet_charging_register: Number(formValues.wallet_charging_register),
//       wallet_referral_register: Number(formValues.wallet_referral_register),
//       wallet_active_create_hojre: Number(formValues.wallet_active_create_hojre),
//     };
//     try {
//       const response = await postPropertySettingStoreService({
//         type,
//         ...payload,
//       });
//       if (response.status === 200) {
//         toast.success("تنظیمات   با موفقیت ذخیره شد");
//         mutate(`/admin/setting/all/${type}`);
//       } else toast.error("خطا در ذخیره تنظیمات ");
//     } catch {
//       toast.error("خطا در ذخیره تنظیمات ");
//     }
//   };
//   const TEXT_INPUT_KEYS = [
//     "callback_url_hojreh",
//     "callback_url_wallet",
//     "callback_url_product",
//   ];

//   if (isLoading) return <Loading />;
//   return (
//     <form onSubmit={handleSubmit} className={master.form_wrapper}>
//       <div className="flex justify-between  flex-wrap gap-8">
//         {propertyTabsGeneral.wallet.map(({ id, key, label, discription }) => (
//           <div className="" key={id}>
//             <div className={master.formController}>
//               <label
//                 className={` ${styles.smsSettingsFormControllerLabelText}`}
//               >
//                 {label}
//               </label>

//               {key === "wallet_charging_register" ||
//               key === "wallet_referral_register" ||
//               key === "wallet_active_create_hojre" ? (
//                 <div className="max-w-20 flex justify-center    items-center  mt-2">
//                   <label>{formValues[key] === "1" ? "فعال" : "غیرفعال"}</label>
//                   <input
//                     type="checkbox"
//                     checked={formValues[key] === "1"}
//                     onChange={(e) =>
//                       setFormValues((prev) => ({
//                         ...prev,
//                         [key]: e.target.checked ? "1" : "0",
//                       }))
//                     }
//                   />
//                 </div>
//               ) : TEXT_INPUT_KEYS.includes(key) ? (
//                 // ✅ text input (URL)
//                 <input
//                   type="text"
//                   value={formValues[key] || ""}
//                   onChange={(e) =>
//                     setFormValues((prev) => ({
//                       ...prev,
//                       [key]: e.target.value,
//                     }))
//                   }
//                   className={`max-w-64 ${styles.smsSettingsFormControllerInput}`}
//                   placeholder={label}
//                   style={{ direction: "ltr" }}
//                 />
//               ) : (
//                 <div className="flex items-center gap-2 mt-2">
//                   <NumericFormat
//                     thousandSeparator=","
//                     decimalScale={0}
//                     allowNegative={false}
//                     value={formValues[key] || ""}
//                     onValueChange={(values) =>
//                       setFormValues((prev) => ({
//                         ...prev,
//                         [key]: values.value,
//                       }))
//                     }
//                     className={`max-w-40 ${styles.smsSettingsFormControllerInput}`}
//                     placeholder={` مقدار ${label} را وارد کنید`}
//                     style={{ direction: "ltr" }}
//                   />
//                   {discription && (
//                     <span className=" text-gray-700">{discription}</span>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className={styles.smsSettingsFormButtonWrapper}>
//         <button type="submit" className={styles.smsSettingsFormButton}>
//           ذخیره اطلاعات
//         </button>
//       </div>
//     </form>
//   );
// }
