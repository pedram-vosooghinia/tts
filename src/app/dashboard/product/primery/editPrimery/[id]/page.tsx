// "use client";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import { deletePrimeryService } from "@/services/product/primeryProduct";
// import { postMainProductService } from "@/services/product/mainProduct";

// import {
//   editPrimeryItems,
//   editPrimerybutton,
// } from "@/components/dashboard/product/primery/editPrimery/inputItem";
// import LoadingModal from "@/components/Main/LoadingModal";
// import AllImage from "@/components/Main/AllImage";
// import CopyNeedText from "@/components/dashboard/product/primery/editPrimery/CopyNeedText";
// import useSWR from "swr";
// import { DeletePrimery } from "@/components/dashboard/product/primery/editPrimery/DeletePrimery";
// import { SubmitHandler } from "react-hook-form";
// interface FormValues {
//   category: string;
//   season: string;
//   product_name: string;
//   detail_color: string;
//   number_in_pack: number;
//   price: number ;
//   size: string;
//   title: string;
//   inventory: number;
//   validation_value: number;
//   sell_code: number;
//   person: string;
// }
// interface Params {
//   id: string;
// }
// export default function EditPrimery({ params }: { params: Params }) {
//   const [loading, setLoading] = useState(false);
//   const { data: primryEditData, isLoading } = useSWR(
//     params.id ? `/product/primeryProduct/getOne?id=${params.id}` : null
//   );
//   const product = primryEditData?.data[0] || {};
//   const router = useRouter();

//   const handleFormSubmit: SubmitHandler<FormValues> = async (values) => {
//     setLoading(true);
    
//   const finalValuePrimery = {
//     product_name: values?.product_name,
//     price: values?.price,
//     inventory: values?.inventory,
//     number_in_pack: values?.number_in_pack,
//     size: values?.size,
//     images: product?.images,
//     category: values?.category,
//     season: values?.season,
//     validation_value: values?.validation_value,
//     sell_code: values?.sell_code,
//     person: values?.person,
//     detail_color: values?.detail_color,
//     title: values?.title,
//   };
//   const item = {
//     id: product.id,
//   };

//   try {
//     await postMainProductService(finalValuePrimery);
//     await deletePrimeryService(item);
//     toast.success("محصول با موفقیت ثبت شد");
//     router.push("/dashboard/product/primery");
//   } catch  {
//     toast.error("An error occurred");
//   }

//     setLoading(false);
//   };

//   if (isLoading || loading) {
//     return <LoadingModal />;
//   }
//   return (
//     <main>
//       <div className="flex flex-col justify-center items-center">
//         <AllImage product={product} sameSize={true} />
//         {/* <PForm
//           Items={editPrimeryItems}
//           button={editPrimerybutton}
//           onSubmit={handleFormSubmit}
//         /> */}
//         <CopyNeedText productNeedText={product?.product_need_text} />
//         <DeletePrimery product={product} />
//       </div>
//     </main>
//   );
// }
