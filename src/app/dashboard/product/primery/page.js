// "use client";
// import PrimeryCard from "@/components/dashboard/product/primery/showAll/PrimeryCard";
// import LoadingModal from "@/components/Main/LoadingModal";
// import useSWR from "swr";
// import Modal from "@/components/Main/Modal";
// import AddPrimery from "@/components/dashboard/product/primery/showAll/AddPrimery";
// export default function ShowPrimery() {
//   const { data: primryProdctData, isLoading } = useSWR(
//     "/product/primeryProduct/get"
//   );

//   if (isLoading) {
//     return <LoadingModal />;
//   }
//   const products = primryProdctData?.data || [];
//   const buttonConfig = {
//     modalName: "AddPrimery",
//     buttonName: "افزودن محصول",
//     className: "my-8",
//   };
//   return (
//     <>
//       <div className="rtl flex flex-col justify-center items-center">
//         <Modal buttonConfig={buttonConfig}>
//           <AddPrimery />
//         </Modal>
//         <div className="flex justify-center flex-wrap">
//           {products.map((product, index) => (
//             <PrimeryCard
//               key={`${product.id}-${index}`}
//               product={product}
//               counter={products.length - index}
//             />
//           ))}
//         </div>
//         <div className="flex justify-center items-center mt-40">
//           {products.length === 0 && (
//             <div>هیج محصولی برای تکمیل و ادامه وجود ندارد</div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }
