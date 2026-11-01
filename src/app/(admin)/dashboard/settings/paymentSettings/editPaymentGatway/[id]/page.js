// "use client";
// import React from "react";
// import toast from "react-hot-toast";
// import { useState } from "react";
// import styles from "@/styles/settings/smsSettings.module.css";
// import master from "@/styles/MasterAdmin.module.css";
// import { editGatwayService } from "@/services/swrServices/setting";
// import { useRouter } from "next/navigation";
// import useSWR from "swr";
// import { usePathname } from "next/navigation";
// import { useEffect } from "react";

// export default function EditPaymentGatway() {
//   const router = useRouter();
//   const path = usePathname();
//   const section = path.split("/")[4];
//   const { data, isLoading } = useSWR(
//     `/admin/gateway/show?gateway_id=${section}`
//   );
//   const sectionData = data?.result || null;

//   useEffect(() => {
//     if (sectionData) {
//       setFormValues({
//         title: sectionData.title || "",
//         name: sectionData.name || "",
//         type: sectionData.type || "payment",
//         username: sectionData.config?.username || "",
//         password: sectionData.config?.password || "",
//         token: sectionData.config?.token || "",
//         status: sectionData.status ?? 1,
//         logo: null, // فایل جدید رو هنوز نگرفتیم
//         logoPreview: sectionData.logo || null, // اگر لوگو از قبل موجود بود نمایش بده
//       });
//     }
//   }, [sectionData]);

//   const [formValues, setFormValues] = useState({
//     title: "",
//     name: "",
//     type: "payment",
//     username: "",
//     password: "",
//     token: "",
//     status: 1,
//     logo: null,
//     logoPreview: null,
//   });
//   const handleChange = (key, value) => {
//     setFormValues((prev) => ({
//       ...prev,
//       [key]: value,
//     }));
//   };

//   const validateForm = () => {
//     if (!formValues.title.trim()) {
//       toast.error("عنوان درگاه الزامی است");
//       return false;
//     }

//     if (!formValues.name.trim()) {
//       toast.error("نام سرویس الزامی است");
//       return false;
//     }

//     // فقط حروف انگلیسی + حرف اول بزرگ
//     const nameRegex = /^[A-Z][a-zA-Z]*$/;
//     if (!nameRegex.test(formValues.name)) {
//       toast.error("نام سرویس باید انگلیسی و با حرف اول بزرگ باشد");
//       return false;
//     }

//     if (!formValues.type) {
//       toast.error("نوع سرویس را انتخاب کنید");
//       return false;
//     }

//     if (formValues.status !== 0 && formValues.status !== 1) {
//       toast.error("وضعیت نامعتبر است");
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     const formData = new FormData();

//     if (formValues.logo) {
//       formData.append("logo", formValues.logo);
//     }

//     const params = {
//       gateway_id: section,
//       title: formValues.title,
//       name: formValues.name,
//       type: formValues.type,
//       username: formValues.username,
//       password: formValues.password,
//       token: formValues.token,
//       status: formValues.status,
//     };
//     try {
//       const res = await editGatwayService(formData, params);
//       toast.success("درگاه با موفقیت ثبت شد");
//       router.push("/settings/paymentSettings");
//     } catch (error) {
//       toast.error("خطا در ثبت درگاه");
//     }
//   };

//   const handleLogoChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setFormValues((prev) => ({
//       ...prev,
//       logo: file,
//       logoPreview: URL.createObjectURL(file),
//     }));
//   };
//   return (
//     <>
//       <>
//         <div className="container mb-5">
//           <h1 className={master.titlePage}>ادیت درگاه</h1>
//         </div>

//         <form onSubmit={handleSubmit} className={master.form_wrapper}>
//           <div className="flex justify-between flex-wrap gap-8">
//             {/* عنوان درگاه */}
//             <div className={`min-w-80 ${master.formController}`}>
//               <label className={styles.smsSettingsFormControllerLabelText}>
//                 عنوان درگاه
//               </label>
//               <input
//                 type="text"
//                 className={styles.smsSettingsFormControllerInput}
//                 value={formValues.title}
//                 onChange={(e) => handleChange("title", e.target.value)}
//               />
//             </div>

//             {/* نام سرویس */}
//             <div className={`min-w-80 ${master.formController}`}>
//               <label className={styles.smsSettingsFormControllerLabelText}>
//                 اسم سرویس (English)
//               </label>
//               <input
//                 type="text"
//                 className={styles.smsSettingsFormControllerInput}
//                 value={formValues.name}
//                 onChange={(e) => {
//                   const value = e.target.value
//                     .replace(/[^a-zA-Z]/g, "")
//                     .replace(/^./, (c) => c.toUpperCase());

//                   handleChange("name", value);
//                 }}
//               />
//             </div>

//             <div className={`min-w-80 ${master.formController}`}>
//               <label className={styles.smsSettingsFormControllerLabelText}>
//                 نوع سرویس
//               </label>

//               <select
//                 className={styles.smsSettingsFormControllerInput}
//                 value={formValues.type}
//                 onChange={(e) => handleChange("type", e.target.value)}
//               >
//                 <option value="payment">پرداخت</option>
//                 <option value="sms">sms</option>
//               </select>
//             </div>

//             {/* نام کاربری */}
//             <div className={`min-w-80 ${master.formController}`}>
//               <label className={styles.smsSettingsFormControllerLabelText}>
//                 نام کاربری
//               </label>
//               <input
//                 type="text"
//                 className={styles.smsSettingsFormControllerInput}
//                 value={formValues.username}
//                 onChange={(e) => handleChange("username", e.target.value)}
//               />
//             </div>

//             {/* پسورد */}
//             <div className={`min-w-80 ${master.formController}`}>
//               <label className={styles.smsSettingsFormControllerLabelText}>
//                 پسورد
//               </label>
//               <input
//                 type="text"
//                 className={styles.smsSettingsFormControllerInput}
//                 value={formValues.password}
//                 onChange={(e) => handleChange("password", e.target.value)}
//               />
//             </div>

//             {/* توکن */}
//             <div className={`min-w-80 ${master.formController}`}>
//               <label className={styles.smsSettingsFormControllerLabelText}>
//                 توکن
//               </label>
//               <input
//                 type="text"
//                 className={styles.smsSettingsFormControllerInput}
//                 value={formValues.token}
//                 onChange={(e) => handleChange("token", e.target.value)}
//               />
//             </div>

//             {/* لوگو */}
//             <div className={`min-w-80 ${master.formController}`}>
//               <label className={styles.smsSettingsFormControllerLabelText}>
//                 لوگو
//               </label>

//               <input
//                 type="file"
//                 accept="image/*"
//                 className={styles.smsSettingsFormControllerInput}
//                 onChange={handleLogoChange}
//               />

//               {formValues.logoPreview && (
//                 <div className="mt-2">
//                   <img
//                     src={formValues.logoPreview}
//                     alt="logo preview"
//                     className="w-24 h-24 object-contain border rounded"
//                   />
//                 </div>
//               )}
//             </div>

//             {/* وضعیت */}
//             <div className={`min-w-80 ${master.formController}`}>
//               <label className={styles.smsSettingsFormControllerLabelText}>
//                 وضعیت
//               </label>

//               <div className="max-w-40 flex justify-between items-center mt-2 gap-2">
//                 <span>{formValues.status === 1 ? "فعال" : "غیرفعال"}</span>
//                 <input
//                   type="checkbox"
//                   checked={formValues.status === 1}
//                   onChange={(e) =>
//                     handleChange("status", e.target.checked ? 1 : 0)
//                   }
//                 />
//               </div>
//             </div>
//           </div>

//           <div className={styles.smsSettingsFormButtonWrapper}>
//             <button type="submit" className={styles.smsSettingsFormButton}>
//               ذخیره اطلاعات
//             </button>
//           </div>
//         </form>
//       </>
//     </>
//   );
// }
