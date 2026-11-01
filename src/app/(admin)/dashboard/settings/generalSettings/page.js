// "use client";
// import master from "@/styles/MasterAdmin.module.css";
// import WalletForm from "./WalletForm";
// import BinboardForm from "./BinboardForm";
// import { useState } from "react";
// import FirstPageForm from "./FirstPageForm";
// const GeneralSettings = () => {
//   const [tab, setTab] = useState("wallet");
//   return (
//     <div>
//       <div className="container mb-5">
//         <h1 className={master.titlePage}>تنظیمات عمومی</h1>
//       </div>

//       <nav className="customNav_wrapper mb-8">
//         <div className="nav nav-tabs flex gap-2">
//           <button
//             className={`nav-link ${tab === "wallet" ? "active" : ""}`}
//             onClick={() => setTab("wallet")}
//           >
//             کیف پول
//           </button>
//           <button
//             className={`nav-link ${tab === "binboard" ? "active" : ""}`}
//             onClick={() => setTab("binboard")}
//           >
//             بینبرد
//           </button>
//           <button
//             className={`nav-link ${tab === "firstPage" ? "active" : ""}`}
//             onClick={() => setTab("firstPage")}
//           >
//             صفحه اول
//           </button>
//         </div>
//       </nav>

//       {tab === "wallet" && <WalletForm />}
//       {tab === "binboard" && <BinboardForm />}
//       {tab === "firstPage" && <FirstPageForm />}
//     </div>
//   );
// };

// export default GeneralSettings;
