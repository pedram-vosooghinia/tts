// "use client";
// import master from "@/styles/MasterAdmin.module.css";
// import { useState, useEffect } from "react";
// import { mutate } from "swr";
// import useSWR from "swr";
// import toast from "react-hot-toast";
// import Loading from "@/src/components/loading/loading_page/Loading";
// import { postPropertySettingStoreService } from "@/services/swrServices/setting";
// import styles from "@/styles/settings/smsSettings.module.css";
// import { propertyTabsGeneral, initialValuesPropertyGenaral } from "./utils";

// const normalizeFirstPageSettings = (data) => {
//   return Object.fromEntries(
//     Object.entries(data).map(([key, value]) => [key, Number(value)])
//   );
// };

// export default function FirstPageForm() {
//   const [formValues, setFormValues] = useState(initialValuesPropertyGenaral);
//   const type = "first";
//   const { data, isLoading } = useSWR(`/admin/setting/all/${type}`);

//   useEffect(() => {
//     if (data?.result) {
//       const normalized = normalizeFirstPageSettings(data.result);
//       setFormValues(normalized);
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
//         toast.success("تنظیمات   با موفقیت ذخیره شد");
//         mutate(`/admin/setting/all/${type}`);
//       } else toast.error("خطا در ذخیره تنظیمات ");
//     } catch {
//       toast.error("خطا در ذخیره تنظیمات ");
//     }
//   };

//   if (isLoading) return <Loading />;

//   return (
//     <form onSubmit={handleSubmit} className={master.form_wrapper}>
//       <div className="flex justify-between  flex-wrap gap-8">
//         {propertyTabsGeneral.first.map(({ id, key, label }) => {
//           const isCaption = key.startsWith("first_caption_");

//           return (
//             <div className={`min-w-80 ${master.formController}`} key={id}>
//               <label className={styles.smsSettingsFormControllerLabelText}>
//                 {label}
//               </label>

//               <div className="max-w-40 flex  justify-between items-center mt-2 gap-2">
//                 <label className=" whitespace-nowrap">
//                   {isCaption
//                     ? formValues[key] === 1
//                       ? "استایل ۱"
//                       : "استایل ۲"
//                     : formValues[key] === 1
//                     ? "فعال"
//                     : "غیرفعال"}
//                 </label>

//                 <input
//                   type="checkbox"
//                   checked={formValues[key] === 1}
//                   onChange={(e) =>
//                     setFormValues((prev) => ({
//                       ...prev,
//                       [key]: e.target.checked ? 1 : 0,
//                     }))
//                   }
//                 />
//               </div>
//             </div>
//           );
//         })}
//       </div>
//       <div className={styles.smsSettingsFormButtonWrapper}>
//         <button type="submit" className={styles.smsSettingsFormButton}>
//           ذخیره اطلاعات
//         </button>
//       </div>
//     </form>
//   );
// }
