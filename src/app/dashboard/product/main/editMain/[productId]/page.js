// "use client";
// import LoadingModal from "@/components/Main/LoadingModal";
// import AllImage from "@/components/Main/AllImage";
// import UpdateProduct from "@/components/dashboard/product/main/editMain/UpdateProduct";
// import { DeleteMain } from "@/components/dashboard/product/main/editMain/DeleteMain";

// import useSWR from "swr";

// export default function EditMian({ params }) {
//   const barcode = params.productId;

//   const { data: editMian, isLoading } = useSWR(
//     `/product/mainProduct/getOne?barcode=${barcode}`
//   );
//   const product = editMian?.data[0] || [];

//   if (isLoading) {
//     return <LoadingModal />;
//   }

//   return (
//     <div className="flex flex-col justify-center items-center">
//       {product !== null ? (
//         <>
//           <AllImage product={product} sameSize={true} />
//           <UpdateProduct product={product} />
//           <DeleteMain product={product} />
//         </>
//       ) : (
//         <div className="flex justify-center items-center m-auto h-screen">
//           چنین محصولی موجود نیست
//         </div>
//       )}
//     </div>
//   );
// }
