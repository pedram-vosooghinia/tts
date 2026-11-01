// "use client";

// // import { postSmsManageService } from "@/services/swrServices/setting/smsMangeServices";
// import toast from "react-hot-toast";
// import useSWR, { mutate } from "swr";
// import LoadingModal from "@/components/MainComponents/LoadingModal";
// const SmsSettings = () => {
//   const { data, isLoading } = useSWR("/admin/v3/sms/pattern/all/1");
//   const dataSMS = data?.result || [];
//   // const initialValues = {
//   //   sms_id: dataSMS?.sms_id || "",
//   //   active_code: dataSMS?.active_code || "",
//   //   active_code_for_web: dataSMS?.active_code_for_web || "",
//   //   weater_crm_sms: dataSMS?.weater_crm_sms || "",
//   //   active_property: dataSMS?.active_property || "",
//   //   reject_property: dataSMS?.reject_property || "",
//   //   contact_us: dataSMS?.contact_us || "",
//   //   active_niazmandi: dataSMS?.active_niazmandi || "",
//   //   reject_niazmandi: dataSMS?.reject_niazmandi || "",
//   //   active_job: dataSMS?.active_job || "",
//   //   reject_job: dataSMS?.reject_job || "",
//   //   request_active_business: dataSMS?.request_active_business || "",
//   //   active_business: dataSMS?.active_business || "",
//   //   active_inactive_business: dataSMS?.active_inactive_business || "",
//   //   reject_business: dataSMS?.reject_business || "",
//   //   accept_business_product: dataSMS?.accept_business_product || "",
//   //   reject_business_product: dataSMS?.reject_business_product || "",
//   //   accept_business_product_selected:
//   //     dataSMS?.accept_business_product_selected || "",
//   //   reject_business_product_selected:
//   //     dataSMS?.reject_business_product_selected || "",
//   //   five_day_expired: dataSMS?.five_day_expired || "",
//   //   free_add_expire_business: dataSMS?.free_add_expire_business || "",
//   //   wallet_balance_cell_verification: dataSMS?.wallet_balance_cell_verification||"",
//   // };


//   // const templateLabels = {
//   //   sms_id: "شناسه پیامک",
//   //   active_code: "کد فعال‌سازی",
//   //   active_code_for_web: "کد فعال‌سازی وب",
//   //   weater_crm_sms: "پیامک CRM ",
//   //   active_property: "فعال‌سازی ملک",
//   //   reject_property: "رد ملک",
//   //   contact_us: "تماس با ما",
//   //   active_niazmandi: "فعال‌سازی نیازمندی",
//   //   reject_niazmandi: "رد نیازمندی",
//   //   active_job: "فعال‌سازی شغل",
//   //   reject_job: "رد شغل",
//   //   request_active_business: "درخواست فعال‌سازی کسب و کار",
//   //   active_business: "فعال‌سازی کسب و کار",
//   //   active_inactive_business: "فعال/غیرفعال کسب و کار",
//   //   reject_business: "رد کسب و کار",
//   //   accept_business_product: "پذیرش محصول کسب و کار",
//   //   reject_business_product: "رد محصول کسب و کار",
//   //   accept_business_product_selected: "پذیرش محصول انتخاب شده",
//   //   reject_business_product_selected: "رد محصول انتخاب شده",
//   //   five_day_expired: "انقضای ۵ روزه",
//   //   free_add_expire_business: "انقضای آگهی رایگان کسب و کار",
//   //   wallet_balance_cell_verification: "موجودی کیف پول برای تایید حجره",
//   // };

//   if (isLoading) return <LoadingModal />;

//   return (
//     <div>
//       <div className="container">
//         <div className="row align-items-center mb-5">
//           <div className="col-6">
//             <h1 >تنظیمات الگوهای پیامک</h1>
//           </div>
//         </div>
//       </div>

//       <form >
//         <div className="row">
//           {/* {Object.entries(templateLabels).map(([key, label]) => (
//             <div key={key} className="col-sm-12 col-md-6">
//               <div >
//                 <div
//                   key={key}
//                   style={{ width: "w/12" }}
//                 >
//                   <label htmlFor={key} 
                  
//                   >
//                     {label}
//                   </label>
//                   <input
//                     type="text"
//                     name={key}
//                     id={key}
//                     placeholder={`متن الگوی ${label} را وارد کنید.`}
//                   />
//                 </div>
//               </div>
//             </div>
//           ))} */}
//         </div>

//         <div >          <button
//             type="submit"
//           >
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default SmsSettings;
