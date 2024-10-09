// "use client";
// import LoadingModal from "@/components/Main/LoadingModal";
// import { PTable } from "@/components/PTable/PTable";
// import customerItemTable from "@/components/dashboard/customers/customerItemTable";
// import useSWR from "swr";
// import { AddCustomers } from "@/components/dashboard/customers/AddCustomers";
// const Customers = () => {
//   const { data, error, isLoading } = useSWR("/customers/getAll");

//   if (isLoading) {
//     return <LoadingModal />;
//   }
//   if (error) {
//     return <>مشکلی پیش آمده است لطفا رفش نمایید</>;
//   }
//   const customers = data?.data || [];

//   return (
//     <div className=" flex flex-col items-center">
//       <AddCustomers />
//       <div>
//         <PTable
//           header={customerItemTable}
//           items={customers}
//           tableTitle={"جدول  مشتریان"}
//         />
//       </div>
//     </div>
//   );
// };

// export default Customers;
