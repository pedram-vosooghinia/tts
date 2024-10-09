// "use client";
// import { useRef } from "react";
// import html2canvas from "html2canvas";
// import ShowProductPreForma from "@/components/dashboard/preForma/edit/ShowProductPreForma";
// import { toast } from "react-hot-toast";
// import LoadingModal from "@/components/Main/LoadingModal";
// import DeleteButton from "@/components/dashboard/preForma/edit/DeleteButton";
// import PaymentMarketerButton from "@/components/dashboard/preForma/edit/PaymentMarketerButton";
// import PreFormaTable from "@/components/dashboard/preForma/edit/PreFormaTable";
// import PreFormaSummary from "@/components/dashboard/preForma/edit/PreFormaSummary";
// import { v4 as uuidv4 } from "uuid";
// import useSWR from "swr";
// import { Button } from "@/components/ui/button";

// const EditPreFormaById = ({ params }) => {
//   const tableRef = useRef(null);
//   const { data: preFormaData, isLoading } = useSWR(
//     params.id ? `/preForma/get/getOne?id=${params.id}` : null
//   );

//   const handleDownloadInvoice = async () => {
//     try {
//       document.documentElement.classList.remove("dark");
//       const elements = tableRef.current.querySelectorAll("*");
//       elements.forEach((el) => {
//         el.style.backgroundColor = "white";
//         el.style.color = "black";
//       });
//       tableRef.current.style.visibility = "visible";
//       const canvas = await html2canvas(tableRef.current);
//       const imgData = canvas.toDataURL("image/jpeg");
//       const link = document.createElement("a");
//       link.href = imgData;
//       link.download = `${uuidv4()}.jpg`;
//       link.click();
//       tableRef.current.style.visibility = "hidden";
//       document.documentElement.classList.add("dark");
//     } catch (error) {
//       toast.error("Failed to generate image");
//     }
//   };
//   const preForma = preFormaData?.data[0] || {};
//   if (isLoading) {
//     return <LoadingModal />;
//   }
//   return (
//     <div className="flex flex-col justify-center items-center">
//       <div className="flex rtl">
//         <div className="m-4">
//           نام مشتری : {preForma?.customer?.gender}{" "}
//           {preForma?.customer?.total_name} {preForma?.customer?.mobile}
//         </div>
//         <div className="m-4">تاریخ فاکتور: {preForma?.jalali_date_nopay}</div>
//       </div>
//       <div className="m-4">
//         {preForma?.customer?.marketer_name.split("_")[0]}
//       </div>
//       <Button onClick={handleDownloadInvoice}>دانلود فاکتور</Button>
//       <div className="flex m-4 gap-4 flex-wrap justify-center rtl">
//         {preForma?.order_items.map((productItem) => (
//           <ShowProductPreForma
//             key={productItem.barcode}
//             product={productItem}
//           />
//         ))}
//       </div>
//       <PreFormaSummary order={preForma} />
//       <div className="rtl flex justify-between items-center w-full p-4">
//         <DeleteButton orderId={params.id} />
//         <PaymentMarketerButton orderId={params.id} order={preForma} />
//       </div>

//       <PreFormaTable params={params} order={preForma} tableRef={tableRef} />
//     </div>
//   );
// };

// export default EditPreFormaById;
