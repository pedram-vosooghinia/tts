// "use client";
// import { PForm } from "@/components/PForm/PForm";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import {
//   editPrimeryItems,
//   editPrimerybutton,
// } from "@/components/dashboard/product/primery/editPrimery/inputItem";
// import { uploadValuePrimery } from "@/components/dashboard/product/primery/editPrimery/utils";
// import LoadingModal from "@/components/Main/LoadingModal";
// import AllImage from "@/components/Main/AllImage";
// import CopyNeedText from "@/components/dashboard/product/primery/editPrimery/CopyNeedText";
// import useSWR from "swr";
// import { DeletePrimery } from "@/components/dashboard/product/primery/editPrimery/DeletePrimery";
// export default function EditPrimery({ params }) {
//   const [loading, setLoading] = useState(false);
//   const { data: primryEditData, isLoading } = useSWR(
//     params.id ? `/product/primeryProduct/getOne?id=${params.id}` : null
//   );
//   const product = primryEditData?.data[0] || {};
//   const router = useRouter();

//   const handleFormSubmit = async (values) => {
//     setLoading(true);
//     await uploadValuePrimery({ values, product, router });
//     setLoading(false);
//   };

//   if (isLoading || loading) {
//     return <LoadingModal />;
//   }
//   return (
//     <main>
//       <div className="flex flex-col justify-center items-center">
//         <AllImage product={product} sameSize={true} />
//         <PForm
//           Items={editPrimeryItems}
//           button={editPrimerybutton}
//           onSubmit={handleFormSubmit}
//         />
//         <CopyNeedText productNeedText={product?.product_need_text} />
//         <DeletePrimery product={product} />
//       </div>
//     </main>
//   );
// }
