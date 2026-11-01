// "use client";
// import useSWR, { mutate } from "swr";
// import toast from "react-hot-toast";
// import { useState, useEffect } from "react";
// import { initialValuesPropertyGenaral, propertyTabsGeneral } from "./utils";
// import { postPropertySettingStoreService } from "@/services/swrServices/setting";
// import Loading from "@/src/components/loading/loading_page/Loading";
// import { NumericFormat } from "react-number-format";
// import styles from "@/styles/settings/smsSettings.module.css";
// import master from "@/styles/MasterAdmin.module.css";

// export default function BinboardForm() {
//   const [formValues, setFormValues] = useState(initialValuesPropertyGenaral);
//   const type = "binboard";
//   const { data, isLoading } = useSWR(`/admin/setting/all/${type}`);
//   useEffect(() => {
//     if (data?.result) {
//       setFormValues(data.result);
//     }
//   }, [data]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await postPropertySettingStoreService({
//         type,
//         ...formValues,
//       });
//       if (response.status === 200) {
//         toast.success("تنظیمات  با موفقیت ذخیره شد");
//         mutate(`/admin/setting/all/${type}`);
//       } else toast.error("خطا در ذخیره تنظیمات ");
//     } catch {
//       toast.error("خطا در ذخیره تنظیمات ");
//     }
//   };

//   if (isLoading) return <Loading />;

//   return (
//     <form onSubmit={handleSubmit} className={master.form_wrapper}>
//       <div className="flex flex-wrap gap-8">
//         {propertyTabsGeneral.binboard.map(({ id, key, label, discription }) => (
//           <div className="max-w-60" key={id}>
//             <div className={master.formController}>
//               <label
//                 className={`whitespace-nowrap ${styles.smsSettingsFormControllerLabelText}`}
//               >
//                 {label}
//               </label>
//               <div className="flex items-center gap-2 mt-2">
//                 <NumericFormat
//                   thousandSeparator=","
//                   decimalScale={0}
//                   allowNegative={false}
//                   value={formValues[key] || ""}
//                   onValueChange={(values) =>
//                     setFormValues((prev) => ({ ...prev, [key]: values.value }))
//                   }
//                   className={`max-w-40 ${styles.smsSettingsFormControllerInput}`}
//                   placeholder={` مقدار ${label} را وارد کنید`}
//                   style={{ direction: "ltr" }}
//                 />
//                 {discription && (
//                   <span className=" text-gray-700">{discription}</span>
//                 )}
//               </div>
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
