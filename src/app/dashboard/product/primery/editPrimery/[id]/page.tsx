"use client";

import LoadingModal from "@/components/Main/LoadingModal";
import AllImage from "@/components/Main/AllImage";
import CopyNeedText from "@/components/dashboard/product/primery/editPrimery/CopyNeedText";
import useSWR from "swr";
import { DeletePrimery } from "@/components/dashboard/product/primery/editPrimery/DeletePrimery";
import PrimeryForm from "@/components/dashboard/product/primery/editPrimery/primeryForm";

interface Params {
  id: string;
}
export default function EditPrimery({ params }: { params: Params }) {
  const { data: primryEditData, isLoading } = useSWR(
    params.id ? `/product/primeryProduct/getOne?id=${params.id}` : null
  );
  const product = primryEditData?.data[0] || {};

  if (isLoading) {
    return <LoadingModal />;
  }
  return (
    <main>
      <div className="flex flex-col justify-center items-center">
        <AllImage product={product} sameSize={true} />
        <PrimeryForm product={product} />
        <CopyNeedText productNeedText={product?.product_need_text} />
        <DeletePrimery product={product} />
      </div>
    </main>
  );
}
