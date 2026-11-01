// "use client";
// import master from "@/styles/MasterAdmin.module.css";
// import { useState } from "react";
// import PropertySettingForm from "./propertySettingForm";
// import JobSettingForm from "./jobSettingForm";
// import NiazmandiSettingForm from "./niazmandiSettingForm";
// import EmployeeSettingForm from "./employeeSettingForm";
// import PaymentGateway from "./PaymentGateway";
// const PaymentSettings = () => {
//   const [tab, setTab] = useState("gatway");

//   return (
//     <div>
//       <div className="container mb-5">
//         <h1 className={master.titlePage}>تنظیمات کیف پول و درگاه</h1>
//       </div>

//       <nav className="customNav_wrapper mb-8">
//         <div className="nav nav-tabs flex gap-2">
//           <button
//             className={`nav-link ${tab === "gatway" ? "active" : ""}`}
//             onClick={() => setTab("gatway")}
//           >
//             درگاه 
//           </button>
//           <button
//             className={`nav-link ${tab === "property" ? "active" : ""}`}
//             onClick={() => setTab("property")}
//           >
//             املاک{" "}
//           </button>
//           <button
//             className={`nav-link ${tab === "job" ? "active" : ""}`}
//             onClick={() => setTab("job")}
//           >
//             استخدام
//           </button>
//           <button
//             className={`nav-link ${tab === "niazmandi" ? "active" : ""}`}
//             onClick={() => setTab("niazmandi")}
//           >
//             نیازمندی ها
//           </button>
//           <button
//             className={`nav-link ${tab === "employee" ? "active" : ""}`}
//             onClick={() => setTab("employee")}
//           >
//             کاریابی
//           </button>
//         </div>
//       </nav>

//       {tab === "property" && <PropertySettingForm />}
//       {tab === "job" && <JobSettingForm />}
//       {tab === "niazmandi" && <NiazmandiSettingForm />}
//       {tab === "employee" && <EmployeeSettingForm />}
//       {tab === "gatway" && <PaymentGateway />}
//     </div>
//   );
// };

// export default PaymentSettings;
