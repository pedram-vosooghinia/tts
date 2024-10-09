// "use client";
// import LoadingModal from "@/components/Main/LoadingModal";
// import { PTable } from "@/components/PTable/PTable";
// import preFormaTableItems from "@/components/dashboard/preForma/showAll/preFormaTableItems";
// import useSWR from "swr";
// const EditPreForma = () => {
//   const status = 6;
//   const { data: editPreForma, isLoading } = useSWR(
//     `/preForma/get/getStatus?status=${status}`
//   );
//   const data = editPreForma?.data || [];

//   if (isLoading) {
//     return <LoadingModal />;
//   }
//   return (
//     <>
//       <PTable
//         header={preFormaTableItems}
//         items={data}
//         tableTitle={"ویرایش و تایید نهایی"}
//       />
//     </>
//   );
// };

// export default EditPreForma;
